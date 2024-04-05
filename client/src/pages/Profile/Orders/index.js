import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllOrders } from "../../../apis/paymentRazorpay";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
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
      dataIndex:'',
      render:(text, record)=>{
        return 1
      }
    },
    {
      title: "OrderID",
      dataIndex: "razorpay_orderID",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) =>{
        return record.product.name
      }
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

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-center align-middle">
          <h1 className="text-2xl text-center">Order Items</h1>
      </div>
      <Table columns={columns} dataSource={orders} className="mt-5" />
    </div>
  );
};

export default Orders;
