import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import { useSelector } from "react-redux";
import Divider from "./Divider";
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
        {/* <div className="flex justify-between items-center bg-white p-5 ">
          <h1
            className="text-xl text-black cursor-pointer"
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
        </div> */}
        <header className="bg-white fixed top-0 w-full shadow-md p-3">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <h1
                className="text-xl text-black cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                {" "}
                Product Market
              </h1>
              <div className="bg-slate-300 py-2 px-5 rounded felx gap-2 items-center space-x-2">
                <div className="inline-flex mr-14 bg-slate-300">
                  <i
                    className="ri-shopping-cart-2-line cursor-pointer"
                    onClick={() => {
                      navigate("/add-to-cart");
                    }}
                  ></i>
                  <span
                    class="absolute  rounded-full bg-red-600 w-4 h-4 ml-4  text-white font-mono text-sm  leading-tight text-center cursor-pointer"
                    onClick={() => {
                      navigate("/add-to-cart");
                    }}
                  >
                    0
                  </span>
                </div>

                {user.role === "admin" && (
                  <b>
                    <span className="mr-2">A</span>
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
              {/* <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  Home
                </a>
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  About
                </a>
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  Services
                </a>
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  Contact
                </a>
                <a
                  href="#"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </a>
              </div> */}
              {/* <div className="md:hidden flex items-center">
                <button className="text-gray-800 focus:outline-none">
                  {" "}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div> */}
            </div>
            {/* <div className="mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="search"
                  placeholder="Search"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-600 w-full"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Search
                </button>
              </div>
            </div> */}
          </nav>
        </header>

        <Divider />
        {/* Body */}
        <div className="p-5 mt-20"> {children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
