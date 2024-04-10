import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, message, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  AddToTempCart,
  DeleteCartItemById,
  DeleteTempCartById,
  GetTempCartById,
  UpdateCartItemById,
} from "../../apis/products";
import axios from "axios";
import Swal from "sweetalert2";
import { CreateOrder, GetKey, PayNow } from "../../apis/paymentRazorpay";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const AdditionalForm = ({
  showAdditionalForm,
  setShowAdditionalForm,
  cartItems,
  getData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const updatedItem = { ...item, ...values };
          await UpdateCartItemById(item._id, updatedItem);
          return updatedItem;
        })
      );
      const tempCart = await AddToTempCart({ items: updatedCartItems });
      setShowAdditionalForm(false);
      getData();
      dispatch(SetLoader(false));
      PaymentHandel(tempCart.data._id);
    } catch (error) {
      message.error(error.message);
    }
  };

  const paymentSuccessfull = async (response, id, tempCartArray) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/orders/verify`,
        {
          razorpay_orderID: razorpay_order_id,
          razorpay_paymentID: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
        }
      );
      if (response.data.success) {
        for (let i = 0; i < tempCartArray.data.items.length; i++) {
          const item = tempCartArray.data.items[i];
          const data = {
            razorpay_orderID: razorpay_order_id,
            razorpay_paymentID: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            status: "order_completed",
            product: item.product,
            buyer: item.buyer,
            seller: item.seller,
            quantity: item.quantity,
            paymentAmount: item.paymentAmount,
            mobile: item.mobile,
            address: item.address,
          };
          const orderCreated = await CreateOrder(data);
          if (orderCreated.data.success) {
            await DeleteCartItemById(item._id);
          } else {
            message.error(orderCreated.data.message);
          }
        }
        const result = await DeleteTempCartById(id);
        if (result.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Placed Successfully",
            text: "Redirecting to Orders.......",
            showConfirmButton: false,
            timer: 3000,
          }).then(function (req, res) {
            navigate("/orders");
          });
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending payment data to backend:", error);
    }
  };

  const PaymentHandel = async (id) => {
    try {
      dispatch(SetLoader(true));
      const tempCartArray = await GetTempCartById(id);
      let totalAmount = 0;
      tempCartArray.data.items.forEach((item) => {
        totalAmount += item.paymentAmount;
      });
      const order = await PayNow({ price: totalAmount });
      const {
        data: { key },
      } = await GetKey();
      dispatch(SetLoader(false));
      var options = {
        key: key,
        amount: order.data.amount,
        currency: "INR",
        name: "Tanmoy Das",
        description: "Test Transaction",
        order_id: order.data.id,
        image: "",
        handler: function (response) {
          paymentSuccessfull(response, id, tempCartArray);
        },
        prefill: {
          name: "Product Market",
          email: "productmarket@gmail.com",
          contact: "9000000000",
        },
        notes: {
          address: "Rozarpay Corporate Office",
          id: id,
        },
        theme: {
          color: "default",
        },
      };

      var razor = new Razorpay(options);

      razor.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      razor.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    if (cartItems) {
      formRef.current.setFieldsValue({
        address: cartItems[0].address,
        mobile: cartItems[0].mobile,
      });
    }
  }, [cartItems]);

  return (
    <Modal
      open={showAdditionalForm}
      onCancel={() => {
        setShowAdditionalForm(false);
      }}
      width={1000}
      okText="Save & Pay Now"
      okButtonProps={{
        style: {
          backgroundColor: "orange",
          color: "black",
          fontWeight: "bold",
        },
      }}
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase mb-4">
          Additional Details
        </h1>

        <div className="border-gray-300 border-solid rounded ">
          <div className="flex items-center justify-center p-1 ">
            <h1 className="text-xl">
              Total Carts Items : {"  "}
              {cartItems.length}
            </h1>
          </div>
          <div className="p-4 ">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item
                label="Full Address ( With PIN )"
                name="address"
                rules={rules}
              >
                <textarea
                  type="text"
                  rows={20}
                  cols={10}
                  placeholder="Enter Your Address"
                  style={{ borderRadius: "5px", borderColor: "blue" }}
                />
              </Form.Item>
              <Form.Item label="Phone Number" name="mobile" rules={rules}>
                <div className="flex items-center">
                  <button
                    id="dropdown-phone-button"
                    data-dropdown-toggle="dropdown-phone"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center"
                    type="button"
                  >
                    <img src="india.svg" width={25} height={25} />
                    +91
                  </button>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="mobile"
                      value={cartItems[0].mobile}
                      className="block p-2.5 w-full z-20 text-sm"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="9000000000"
                      maxLength={10}
                    />
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdditionalForm;
