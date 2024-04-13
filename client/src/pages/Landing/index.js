import React, { useEffect, useState } from "react";
import { Button, Carousel, message } from "antd";
import { GetProducts } from "../../apis/products";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

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
  console.log(products);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Carousel autoplay autoplaySpeed={4000} dotPosition="top">
        {products.slice(6, 10).map((data, i) => {
          return (
            <div>
              <div
                style={{
                  height: "500px",
                  color: "#fff",
                  textAlign: "center",
                  marginLeft: "20px",
                  marginRight: "20px",
                  backgroundColor: "lightblue",
                  borderRadius: "6px",
                  // backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23050505\' fill-opacity=\'0.4\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")'
                }}
                className="flex "
              >
                <div className="text-black flex  flex-col  items-start  w-1/2 ">
                  <div className="mt-24 pl-20 flex flex-col ">
                    <h1 className="text-3xl text-green-600 font-semibold">
                      Starts From{" "}
                      <span className="text-3xl text-green-600 font-semibold">
                        <svg
                          fill="#0f7012"
                          width="26px"
                          height="26px"
                          viewBox="-96 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
                        </svg>
                      </span>
                      {data.price}
                    </h1>
                  </div>
                  <div className="flex pl-20">
                    <h1 className="text-6xl mt-4">{data.name}</h1>
                  </div>
                  <div className="pl-20 mt-3">
                    <span className="text-xl">{data.description}</span>
                  </div>
                  <div className="pl-20 mt-10 flex items-end">
                    <button
                      style={{
                        width: "160px",
                        height: "38px",
                        font: "20px",
                        padding: "12px 14px",
                        color: "#ffffff",
                        backgroundColor: "#4f46e5",
                        borderColor: "transparent",
                        borderWidth: "1px",
                        borderRadius: "3rem",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/product/${data._id}`)}
                    >
                      Shop now
                    </button>
                  </div>
                </div>
                <div className="text-black flex justify-center items-center w-1/2">
                  <div>
                    <img
                      src={data.images[0]}
                      width={400}
                      height={400}
                      style={{ borderRadius: "15px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      {/* <div className="container mt-16">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-[70px]">
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-black sm:text-4xl md:text-[40px]">
                Shop By Category
              </h2>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col flex-wrap justify-center items-center">
          
        </div>
      </div> */}
      <section className="bg-white py-20 dark:bg-dark lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-[70px]">
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-black sm:text-4xl md:text-[40px]">
                  Trending Products
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of available but the
                  majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap w-3/4 ml-48">
              {products.slice(0, 6).map((data, i) => {
                return (
                  <div className=" border border-solid border-gray-400 rounded-md w-1/3 px-3">
                    <div className="my-6 ">
                      <div className="mb-5 px-6">
                        <img
                          src={data.images[0]}
                          alt="product"
                          width={300}
                          height={300}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="px-6">
                        <span className="font-semibold text-xl">
                          <span className="text-xl font-bold">
                            <svg
                              fill="#000000"
                              width="15px"
                              height="15px"
                              viewBox="-96 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z" />
                            </svg>
                          </span>
                          {data.price}
                        </span>
                        <h3>
                          <a
                            onClick={() => navigate(`/product/${data._id}`)}
                            className="text-2xl text-black hover:text-blue-500 cursor-pointer"
                          >
                            {data.name}
                          </a>
                        </h3>
                        <p className="flex items-center text-base text-body-color ">
                          <span className="pr-1">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1833_519)">
                                <path
                                  d="M14.925 5.975L10.4 5.275L8.34996 0.975C8.19996 0.675 7.79996 0.675 7.64996 0.975L5.59996 5.3L1.09996 5.975C0.77496 6.025 0.64996 6.45 0.89996 6.675L4.17496 10.05L3.39996 14.775C3.34996 15.1 3.67496 15.375 3.97496 15.175L8.04996 12.95L12.1 15.175C12.375 15.325 12.725 15.075 12.65 14.775L11.875 10.05L15.15 6.675C15.35 6.45 15.25 6.025 14.925 5.975Z"
                                  fill="#FFA645"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1833_519">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span className="pr-1">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1833_519)">
                                <path
                                  d="M14.925 5.975L10.4 5.275L8.34996 0.975C8.19996 0.675 7.79996 0.675 7.64996 0.975L5.59996 5.3L1.09996 5.975C0.77496 6.025 0.64996 6.45 0.89996 6.675L4.17496 10.05L3.39996 14.775C3.34996 15.1 3.67496 15.375 3.97496 15.175L8.04996 12.95L12.1 15.175C12.375 15.325 12.725 15.075 12.65 14.775L11.875 10.05L15.15 6.675C15.35 6.45 15.25 6.025 14.925 5.975Z"
                                  fill="#FFA645"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1833_519">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span className="pr-1">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1833_519)">
                                <path
                                  d="M14.925 5.975L10.4 5.275L8.34996 0.975C8.19996 0.675 7.79996 0.675 7.64996 0.975L5.59996 5.3L1.09996 5.975C0.77496 6.025 0.64996 6.45 0.89996 6.675L4.17496 10.05L3.39996 14.775C3.34996 15.1 3.67496 15.375 3.97496 15.175L8.04996 12.95L12.1 15.175C12.375 15.325 12.725 15.075 12.65 14.775L11.875 10.05L15.15 6.675C15.35 6.45 15.25 6.025 14.925 5.975Z"
                                  fill="#FFA645"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1833_519">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span className="pr-1">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1833_519)">
                                <path
                                  d="M14.925 5.975L10.4 5.275L8.34996 0.975C8.19996 0.675 7.79996 0.675 7.64996 0.975L5.59996 5.3L1.09996 5.975C0.77496 6.025 0.64996 6.45 0.89996 6.675L4.17496 10.05L3.39996 14.775C3.34996 15.1 3.67496 15.375 3.97496 15.175L8.04996 12.95L12.1 15.175C12.375 15.325 12.725 15.075 12.65 14.775L11.875 10.05L15.15 6.675C15.35 6.45 15.25 6.025 14.925 5.975Z"
                                  fill="#FFA645"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1833_519">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span className="pr-[10px]">
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1833_525)">
                                <path
                                  d="M4.02502 15.55C3.80002 15.55 3.57502 15.475 3.40002 15.35C3.05002 15.1 2.85002 14.65 2.92502 14.225L3.57502 10.2L0.77502 7.32501C0.47502 7.02501 0.37502 6.57501 0.50002 6.15001C0.62502 5.75001 0.97502 5.45001 1.37502 5.40001L5.25002 4.77501L7.00002 1.10001C7.20002 0.700012 7.57502 0.450012 8.00002 0.450012C8.42502 0.450012 8.82502 0.700012 9.00002 1.10001L10.75 4.75001L14.6 5.35001C15 5.42501 15.35 5.70001 15.475 6.10001C15.625 6.52501 15.5 6.97501 15.2 7.27501L12.425 10.175L13.075 14.225C13.15 14.675 12.975 15.1 12.6 15.35C12.25 15.6 11.825 15.625 11.45 15.425L8.00002 13.55L4.55002 15.425C4.40002 15.525 4.20002 15.55 4.02502 15.55ZM1.57502 6.50001C1.57502 6.50001 1.57502 6.52501 1.57502 6.55001L4.50002 9.55001C4.67502 9.72501 4.75002 10 4.72502 10.25L4.05002 14.425C4.05002 14.425 4.05002 14.425 4.05002 14.45L7.65002 12.5C7.87502 12.375 8.15002 12.375 8.40002 12.5L12 14.45C12 14.45 12 14.45 12 14.425L11.325 10.225C11.275 9.97501 11.375 9.72501 11.55 9.52501L14.475 6.52501C14.5 6.50001 14.475 6.47501 14.475 6.47501L10.45 5.85001C10.2 5.80001 9.97502 5.65001 9.87502 5.40001L8.00002 1.60001L6.20002 5.42501C6.10002 5.65001 5.87502 5.82501 5.62502 5.87501L1.57502 6.50001Z"
                                  fill="#FFA645"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1833_525">
                                  <rect width={16} height={16} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span> 0 Reviews</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
