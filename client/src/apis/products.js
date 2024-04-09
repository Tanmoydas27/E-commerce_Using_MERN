import { axiosinstance } from "./axiosinstance";

export const AddProduct = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/products/add-product`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetProducts = async (filters) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/products/get-products`,
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosinstance.put(
      `${process.env.REACT_APP_SERVER_URL}/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosinstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/products/upload-image-to-product`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosinstance.put(
      `${process.env.REACT_APP_SERVER_URL}/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetProductById = async (id) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const PlaceNewCart = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/place-new-cart`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCartItem = async (payload) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/get-cart-item`,
      { params: payload }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllCartsByUserID = async (payload) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/get-all-carts-by-id`,
      { params: payload }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteCartItemById = async (id) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/delete-cart-item-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCartitemById = async (id) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/get-cart-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateCartItemById = async (id, payload) => {
  try {
    const response = await axiosinstance.patch(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/update-cart-item-by-id/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AddToTempCart = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/add-temp-cart`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetTempCartById = async (id) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/get-temp-cart-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteTempCartById = async (id) => {
  try {
    const response = await axiosinstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/delete-temp-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
