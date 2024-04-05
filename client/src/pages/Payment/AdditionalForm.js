import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, message, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  DeleteCartItemById,
  GetCartitemById,
  UpdateCartItemById,
} from "../../apis/products";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CreateOrder,
  GetKey,
  PayNow,
} from "../../apis/paymentRazorpay";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const AdditionalForm = ({
  showAdditionalForm,
  setShowAdditionalForm,
  selectItem,
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
      const response = await UpdateCartItemById(selectItem._id, values);
      console.log(response);
      setShowAdditionalForm(false);
      getData();
      dispatch(SetLoader(false));
      PaymentHandel(selectItem._id);
    } catch (error) {
      message.error(error.message);
    }
  };

  const paymentSuccessfull = async (response, id, item) => {
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
        const data = {
          razorpay_orderID: razorpay_order_id,
          razorpay_paymentID: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
          status: "order_completed",
          product: item.data.product._id,
          buyer: item.data.buyer._id,
          seller: item.data.seller._id,
          quantity: item.data.quantity,
          paymentAmount: item.data.paymentAmount,
          mobile: item.data.mobile,
          address: item.data.address,
        };
        const orderCreated = await CreateOrder(data);
        if (orderCreated.data.success) {
          const deleteCartItem = await DeleteCartItemById(id);
          if (deleteCartItem.success) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Order Placed Successfully",
              text: "Redircting to Orders.......",
              showConfirmButton: false,
              timer: 3000,
            }).then(function (req, res) {
              navigate("/profile/2");
            });
          } else {
            message.error(deleteCartItem.message);
          }
        } else {
          message.error(orderCreated.data.message);
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
      const item = await GetCartitemById(id);
      const itemPrice = item.data.product.price;
      const order = await PayNow({ price: itemPrice });
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
          paymentSuccessfull(response, id, item);
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
    if (selectItem) {
      formRef.current.setFieldsValue({
        id: selectItem._id,
        name: selectItem.product.name,
        price: selectItem.paymentAmount,
        quantity: selectItem.quantity,
        address: selectItem.address,
        mobile: selectItem.mobile,
      });
    }
  }, [selectItem]);

  return (
    <Modal
      open={showAdditionalForm}
      onCancel={() => {
        setShowAdditionalForm(false);
      }}
      centered
      width={800}
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
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Product Id" name="id" rules={rules} hidden>
            <Input type="text" disabled style={{ color: "black" }} />
          </Form.Item>
          <Form.Item label="Product Name" name="name" rules={rules}>
            <Input type="text" disabled style={{ color: "black" }} />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Price" name="price" rules={rules}>
                <Input type="number" disabled style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Quantity" name="quantity" rules={rules}>
                <select>
                  <option value="">Select-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Full Address ( With PIN )"
            name="address"
            rules={rules}
          >
            <textarea type="text" rows={20} />
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
                  value={selectItem.mobile}
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
    </Modal>
  );
};

export default AdditionalForm;
