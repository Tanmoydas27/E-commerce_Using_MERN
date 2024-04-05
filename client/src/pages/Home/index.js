import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts } from "../../apis/products";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => {
          return (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
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
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  RS {product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
