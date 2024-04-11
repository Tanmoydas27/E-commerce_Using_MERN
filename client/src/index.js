import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#40513B",
            colorPrimaryHover: "#40513B",
            borderRadius: "2px",
          },
          Carousel:{
            dotActiveWidth: '24px',
            dotHeight: '3px',
            dotWidth: '16px'
          },
        },
        token: {
          borderRadius: "2px",
          colorPrimary: "#40513B",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);

