import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import { useSelector } from "react-redux";
// import Divider from "./Divider";
// import { GetAllCartsByUserID } from "../apis/products";

const ProtectedPage = ({ children }) => {
  // const [cartItems, setCartItems] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
      navigate("/login");
    }
  };

  // const getData = async () => {
  //   try {
  //     console.log(user)
  //     dispatch(SetLoader(true));
  //     const data = {
  //       buyer: user._id,
  //       status: "pending",
  //     };
  //     const response = await GetAllCartsByUserID(data);
  //     dispatch(SetLoader(false));
  //     if (response.success) {
  //       setCartItems(response.data);
  //     }
  //   } catch (error) {
  //     dispatch(SetLoader(false));
  //     message.error(error.message);
  //   }
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("Please Sign in to Continue..");
      navigate("/login");
    }
    // getData();
  }, []);
  return (
    user && (
      <div>
        {/* //Header */}
        <div className="flex justify-between items-center bg-primary p-5 ">
          <h1
            className="text-xl text-white cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Product Market
          </h1>

          <div className="bg-white py-2 px-5 rounded felx gap-2 items-center">
            <div className="inline-flex mr-14 bg-gray-50">
              <i  className="ri-shopping-cart-2-line cursor-pointer"  onClick={() => {navigate("/add-to-cart");}}></i>
              <span class="absolute  rounded-full bg-red-600 w-4 h-4 ml-4  text-white font-mono text-sm  leading-tight text-center cursor-pointer" onClick={() => {navigate("/add-to-cart");}}>0</span>
            </div>

            {user.role === "admin" && (
              <b>
                <span className="mr-8">A</span>
              </b>
            )}
            <i className="ri-shield-user-line"></i>
            <span
              className=" underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <i
              className="ri-logout-box-r-line ml-8 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* Body */}
        <div className="p-5"> {children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
