import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  DeleteCartItemById,
  GetAllCartsByUserID,
} from "../../apis/products";

import { useNavigate } from "react-router-dom";
import AdditionalForm from "./AdditionalForm";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const data = {
        buyer: user._id,
        status: "pending",
      };
      const response = await GetAllCartsByUserID(data);
      dispatch(SetLoader(false));
      if (response.success) {
        setCartItems(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await DeleteCartItemById(id);
      if (response.success) {
        message.success(response.message);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: "Price (RS)",
      dataIndex: "price",
      render: (text, record) => {
        return record.product.price;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => {
        return record.product.category;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <div className="flex justify-end">
              <i
                className="ri-delete-bin-5-line cursor-pointer"
                onClick={() => deleteCartItem(record._id)}
              ></i>
            </div>
            <div className="flex justify-end ml-14">
              <Button
                className="bg-blue-500 text-white"
                onClick={(e) => {
                  setShowAdditionalForm(true);
                  setSelectItem(record);
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="text-center">
      <div className="mt-2 mb-5">
        <h1 className="text-3xl bg-slate-200">Add To Cart</h1>
      </div>

      <Table columns={columns} dataSource={cartItems} />
      {showAdditionalForm && (
        <AdditionalForm
          showAdditionalForm={showAdditionalForm}
          setShowAdditionalForm={setShowAdditionalForm}
          selectItem={selectItem}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Payment;
