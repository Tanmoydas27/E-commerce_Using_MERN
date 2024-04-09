import { axiosinstance } from "./axiosinstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosinstance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosinstance.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/get-current-user`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosinstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/get-users`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosinstance.put(
      `${process.env.REACT_APP_SERVER_URL}/api/users/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
