import { axiosinstance } from "./axiosinstance";


export const PayNow = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/paynow/order`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetKey = async (payload) => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/getkey`
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const CreateOrder = async (payload) => {
  try {
    const response = await axiosinstance.patch(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/create-order`,
      payload
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const GetAllOrders = async (id) =>{
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/get-all-orders-by-user-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}