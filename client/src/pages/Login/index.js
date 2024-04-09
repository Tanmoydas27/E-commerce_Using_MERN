import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      console.log(response);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        // <Navigate to='/'/>
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          PD- <span className="text-gray-400">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Enter Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
