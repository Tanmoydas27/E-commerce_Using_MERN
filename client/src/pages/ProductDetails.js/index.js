import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Button } from "antd";
import { SetLoader } from "../../redux/loadersSlice";
import { GetCartItem, GetProductById, PlaceNewCart } from "../../apis/products";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = useSelector((state) => state.users);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    dispatch(SetLoader(true));
    try {
      const foundItem = await GetCartItem({
        buyer: user._id,
        product: product._id,
      });
      if (foundItem.status === 200) {
        dispatch(SetLoader(false));
        Swal.fire({
          title: "Already Added",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const addedProduct = {
          product: product._id,
          seller: product.seller._id,
          buyer: user._id,
          quantity: "1",
          paymentAmount: product.price,
          status: "pending",
        };
        const response = await PlaceNewCart(addedProduct);
        dispatch(SetLoader(false));
        if (response.success) {
          Swal.fire({
            title: "Product Added To Cart",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          getData();
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
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
    product && (
      <div>
        <div className="grid grid-cols-2 gap-6 mt-3">
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-contain rounded-md"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer p-1" +
                      (selectedImageIndex === index
                        ? "border-2 border-red-700 border-dashed p-2"
                        : "")
                    }
                    src={image}
                    alt=""
                    onClick={() => setSelectedImageIndex(index)}
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h1 className="text-gray-600">Added On</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-primary">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>{product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailible ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailible ? "yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailible ? "yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailible ? "yes" : "No"}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-orange-900">
                  Payment
                </h1>
                <Button
                  onClick={() => {
                    handleAddToCart();
                  }}
                  disabled={user._id === product.seller._id || user.role === 'admin'}
                  className="bg-yellow-500 text-white"
                >
                  {user._id === product.seller._id 
                    ? "Its your Product"
                    : "Add To Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
