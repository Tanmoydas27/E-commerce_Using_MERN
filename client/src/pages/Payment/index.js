import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  DeleteCartItemById,
  GetAllCartsByUserID,
  UpdateCartItemById,
} from "../../apis/products";
import Divider from "../../components/Divider";

import { useNavigate } from "react-router-dom";
import AdditionalForm from "./AdditionalForm";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [total, SetTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      const data = {
        buyer: user._id,
        status: "pending",
      };
      const response = await GetAllCartsByUserID(data);
      if (response.success) {
        setCartItems(response.data);
        const total = response.data.reduce(
          (acc, item) => acc + item.paymentAmount,
          0
        );
        SetTotal(total);
      }
    } catch (error) {
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

  const increaseQuantity = async (id, quantity, amount, price) => {
    if (quantity >= 1 && quantity <= 4) {
      const incresedQuantity = quantity + 1;
      const Amount = amount + Number(price);
      const response = await UpdateCartItemById(id, {
        quantity: incresedQuantity,
        paymentAmount: Amount,
      });
      console.log(response);
      getData();
    }
  };
  const decreaseQuantity = async (id, quantity, amount, price) => {
    if (quantity > 1) {
      const decresedQuantity = quantity - 1;
      const Amount = amount - price;
      const response = await UpdateCartItemById(id, {
        quantity: decresedQuantity,
        paymentAmount: Amount,
      });
      console.log(response);
      getData();
    } else {
      console.log("Minimum Item reached");
    }
  };
  const Checkout = () => {
    setShowAdditionalForm(true);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-between mr-20 ">
        <h1 className="text-2xl font-bold my-4">
          Your Shopping Cart{`(${cartItems.length})`}
        </h1>
        <button
          className="bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          disabled={cartItems.length < 1}
          onClick={Checkout}
        >
          Checkout
        </button>
      </div>
      <table className="flex w-full  items-center p-3">
        <thead>
          <tr className=" flex w-full justify-between gap-x-96">
            <th className="text-left">Item name</th>
            <th className="text-left">Price</th>
            <th className="text-left">Quantity</th>
            <th className="text-left">Total</th>
          </tr>
        </thead>
      </table>
      <Divider />
      {cartItems.map((data, index) => (
        <>
          <div className="mt-2">
            <div className="flex flex-row  border-b border-gray-400 py-2">
              <div className="flex-shrink-0">
                <img
                  src={data.product.images[0]}
                  alt="Product image"
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div className="mt-0 ml-6 w-72">
                <h2 className="text-lg font-bold">{data.product.name}</h2>
                <p className="mt-2 text-gray-600">{data.product.description}</p>
              </div>
              <div className="ml-28 flex justify-between items-center">
                <h4 className="text-gray-600">{data.product.price}</h4>
              </div>
              <div className="ml-auto flex justify-between items-center">
                {/* <span className="mr-2 text-gray-600">Quantity:</span> */}
                <div className="items-center ">
                  <button
                    className="bg-gray-200 rounded-l-lg px-3 py-2 cursor-pointer border-none"
                    onClick={() =>
                      decreaseQuantity(
                        data._id,
                        data.quantity,
                        data.paymentAmount,
                        data.product.price
                      )
                    }
                  >
                    -
                  </button>
                  <span className="mx-4 text-black">{data.quantity}</span>
                  <button
                    className="bg-gray-200 rounded-r-lg px-3 py-1 cursor-pointer border-none"
                    onClick={() =>
                      increaseQuantity(
                        data._id,
                        data.quantity,
                        data.paymentAmount,
                        data.product.price
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="ml-auto font-semibold flex justify-end mr-14 text-xl mt-6">
                <span style={{ marginTop: "0.13rem" }}>
                  <svg
                    fill="#000000"
                    width="18px"
                    height="18px"
                    viewBox="-96 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
                  </svg>
                </span>
                {data.paymentAmount}
              </div>
              <div className="mt-6 cursor-pointer ">
                <i
                  class="ri-delete-bin-2-line"
                  onClick={() => deleteCartItem(data._id)}
                ></i>
              </div>
            </div>
          </div>
          <Divider />
        </>
      ))}
      {cartItems.length > 0 ? (
        <>
          <div className="flex justify-end items-center mt-8 font-bold text-2xl mr-20 ">
            <span className="text-black mr-4">Total Amount:</span>
            <span className="text-xl font-bold">
              <svg
                fill="#000000"
                width="18px"
                height="18px"
                viewBox="-96 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
              </svg>
            </span>
            {total}
          </div>
          <div className="flex flex-row justify-end mr-20 mt-6  ">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={Checkout}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className=" justify-center flex">
            <div>
              <img src="empty-cart.png" width={300} />
              <h1 className="text-2xl ml-3 ">Your cart is empty!</h1>
              <Button
                className="ml-16 mt-4 bg-blue-600 hover:bg-blue-200 text-white"
                onClick={() => navigate("/")}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </>
      )}
      {showAdditionalForm && (
        <AdditionalForm
          setShowAdditionalForm={setShowAdditionalForm}
          showAdditionalForm={showAdditionalForm}
          cartItems={cartItems}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Payment;
