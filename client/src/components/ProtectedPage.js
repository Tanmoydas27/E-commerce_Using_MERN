import React, { useEffect } from "react";
import { GetCurrentUser } from "../apis/users";
import { message, Space, Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Divider from "./Divider";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => {
    return pathname === path ? "active" : "";
  };

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp > currentTime) {
        validateToken();
      } else {
        message.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      message.error("Please Sign in to Continue..");
      navigate("/login");
    }
  }, []);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  const items = [
    {
      label: <h1 style={{ width: "200px", cursor: "default" }}>My Account</h1>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          onClick={() => {
            if (user.role === "user") {
              navigate("/profile");
            } else if (user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/login");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Profile
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a
          onClick={() => {
            navigate("/orders");
          }}
        >
          <i className="ri-shopping-bag-4-line text-gray-500 mr-4"></i>
          Orders
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a
          onClick={() => {
            navigate("/products");
          }}
        >
          <i className="ri-product-hunt-line text-gray-500 mr-4"></i>
          Your products
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(51, 51, 51)"
            width="16px"
            height="16px"
            className="mr-4"
          >
            <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
          </svg>
          Logout
        </a>
      ),
      key: "4",
      danger: true,
    },
  ];

  return (
    <div>
      {user && (
        <>
          <header className="bg-white fixed top-0 w-full p-2 h-20 left-0 z-50">
            <nav className="container mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <h1
                  className="text-xl text-black cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Product Market
                </h1>
                <div>
                  <div className="flex justify-between gap-16 font-semibold">
                    <span
                      className={`home-link ${isActive("/")}  `}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Home
                    </span>
                    <span
                      className={`shop-link ${isActive("/shop")}`}
                      onClick={() => {
                        navigate("/shop");
                      }}
                    >
                      Shop
                    </span>
                    <span className={`category-link ${isActive("/category")}`}>
                      {/* <Dropdown menu={{items_category}} className={`category-link ${isActive("/category")}`} > */}
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          Category
                          {/* <DownOutlined /> */}
                        </Space>
                      </a>
                      {/* </Dropdown> */}
                    </span>
                    <span
                      className={`category-link ${isActive("/about-us")}`}
                      onClick={() => {
                        navigate("/about-us");
                      }}
                    >
                      About us
                    </span>
                  </div>
                </div>
                <div className="bg-white py-0 pl-5 pr-0 rounded flex gap-2 items-center space-x-2">
                  <div className="inline-flex justify-between">
                    {user.role === "admin" ? (
                      <h1 className="text-md mr-6 font-light border border-dashed rounded-3xl p-1">
                        A
                      </h1>
                    ) : null}
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                          </svg>
                        </Space>
                      </a>
                    </Dropdown>
                    <div className="ml-4 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div
                      className="ml-4 text-gray-500 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        navigate("/add-to-cart");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <Divider />
          </header>
          <div className="p-5 mt-20">{children}</div>
          <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left mt-4">
            <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
              {new Date().getFullYear()} © Copyright:
              <a
                href="https://tw-elements.com/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Product Market
                <a
                  href="https://www.github.com/Tanmoydas27"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" (Tanmoy Das)"}
                </a>
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default ProtectedPage;
