import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Orders from "./Orders";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { tab } = useParams();
  return (
    <div>
      <Tabs defaultActiveKey={tab || "1"}>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Orders" key="2">
          <Orders />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
