import React, { useEffect, useState } from "react";
import { Button, Carousel,message } from "antd";
import { GetProducts } from "../../apis/products";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";



const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);


    const getData=async ()=>{
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
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
      <Carousel autoplay autoplaySpeed={4000} dotPosition="top">
        {products.slice(6,10).map((data,i)=>{
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
                        Starts From {data.price}
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
                        onClick={()=>navigate(`/product/${data._id}`)}
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
        })
            
        }
      </Carousel>
    </div>
  );
};

export default LandingPage;
