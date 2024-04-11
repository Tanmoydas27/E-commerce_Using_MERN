import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProductById, GetProducts, PlaceNewCart } from "../../apis/products";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import AdditionalForm from "./AdditionalForm";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [products, setProducts] = useState([]);
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts({ status: "approved" });
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const buyNow = async (id) => {
    dispatch(SetLoader(true));
    try {
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const data = {
          product: response.data._id,
          seller: response.data.seller._id,
          buyer: user._id,
          quantity: 1,
          paymentAmount: response.data.price,

          status: "pending",
        };
        const Item = await PlaceNewCart(data);
        if (Item.success) {
          setCartItem(Item.data);
        }
        setShowAdditionalForm(true);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-10">
        {products.map((product) => {
          return (
            <>
              <div
                className=" border border-gray-300 hover:border-sky-500 rounded border-solid flex flex-col
                 gap-5 pb-2 cursor-pointer transition duration-300 ease-in-out hover:scale-110 product-item "
              >
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    className="w-full h-40 object-contain"
                  />

                  <div className="px-2 flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                    <p className="text-sm">{product.description}</p>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between -mt-3 cursor-default">
                  <span className="text-xl font-semibold text-green-700 -mt-1 ml-6 ">
                    RS {product.price}
                  </span>
                  <span>
                    <button
                      className="buynowhome text-xs mr-6 -mt-2 my-1"
                      onClick={() => buyNow(product._id)}
                      disabled={
                        user._id === product.seller._id || user.role === "admin"
                      }
                    >
                      <i className="ri-shopping-bag-4-line"> </i>Buy Now
                    </button>
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {showAdditionalForm && (
        <AdditionalForm
          setShowAdditionalForm={setShowAdditionalForm}
          showAdditionalForm={showAdditionalForm}
          cartItem={cartItem}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Home;
