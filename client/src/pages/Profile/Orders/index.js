import React, { useEffect, useState } from "react";
import { Button, Divider, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { SetLoader } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllOrders } from "../../../apis/paymentRazorpay";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const userId = user._id;
      const response = await GetAllOrders(userId);
      dispatch(SetLoader(false));
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     dispatch(SetLoader(true));
  //     const response = await DeleteProduct(id);
  //     dispatch(SetLoader(false));
  //     if (response.success) {
  //       message.success(response.message);
  //       getData();
  //     }
  //   } catch (error) {
  //     dispatch(SetLoader(false));
  //     message.error(error.message);
  //   }
  // };

  const columns = [
    {
      title: "#",
      dataIndex: "",
      render: (text, record) => {
        return 1;
      },
    },
    {
      title: "OrderID",
      dataIndex: "razorpay_orderID",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: "Price",
      dataIndex: "paymentAmount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Order On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
  ];
  console.log(orders);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mx-auto w-2/3 min-h-screen">
      <div className="flex justify-start ">
        <h1 className="text-2xl text-center">Your Orders</h1>
      </div>
      <p className="text-md mt-3">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>
      <Divider />
      <div>
        {orders.map((order, index) => {
          return (
            <>
              <div className="flex justify-between mb-4 mt-12">
                <div>#{order.razorpay_orderID}</div>
                <div>{moment(order.createdAt).format("MMM D, YYYY hh:mm A")}</div>
              </div>
              <Divider />

              <div className="flex justify-between">
                <div className="flex justify-between gap-6">
                  <div>
                    <img
                      src={order.product.images[0]}
                      alt="Item Image"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div>
                    <p className="mt-2">{order.product.name}</p>
                    <p className="mt-2">Qty: {order.quantity}</p>
                    <p className="mt-4 font-semibold">
                      <svg
                        fill="#000000"
                        width="15px"
                        height="15px"
                        viewBox="-96 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
                      </svg>
                      {order.paymentAmount}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <button
                      style={{
                        width: "160px",
                        height: "38px",
                        font: "14px",
                        padding: "8px 10px",
                        color: "#ffffff",
                        backgroundColor: "#4f46e5",
                        borderColor: "transparent",
                        borderWidth: "1px",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                      }}
                    >
                      Buy again
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      style={{
                        width: "160px",
                        height: "38px",
                        font: "14px",
                        padding: "8px 10px",
                        color: "#000000",
                        backgroundColor: "#ffffff",
                        borderColor: "gray",
                        borderWidth: "1px",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                      }}
                    >
                      Shop similar
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {orders.length > 0 ? (
        <></>
        ):(
          <>
          <div className=" justify-center flex">
            <div>
              <img src="bag.png" width={300} />
              <h1 className="text-2xl ml-3 ">Your Order is empty!</h1>
              <Button
                className="ml-16 mt-4 bg-blue-600 hover:bg-blue-200 text-white"
                onClick={() => navigate("/")}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </>
        )
      }
    </div>
  );
};

export default Orders;
