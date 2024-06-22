import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Orders from "./Orders";
import { useParams } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const Profile = () => {
  const { tab } = useParams();
  return (
    <>
      <div className=" flex justify-center">
        <div className="w-full max-w-screen-sm">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className=" text-gray-700 text-sm font-bold flex justify-center">  
                Profile Picture          
              </label>
              <div className="flex justify-center">
                <img src="profile.png" width={200} height={200}></img>
              </div>
              <div className="ml-52">
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              
             
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                required
                placeholder="Enter your first name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Birthday
              </label>
              <input
                required
                placeholder="mm/dd/yyyy"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={0} selected>
                  Gender
                </option>
                <option value={1}>Female</option>
                <option value={2}>Male</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                required
                placeholder="name@company.com"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                required
                placeholder="+12-345 678 910"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                required
                placeholder="Enter your home address"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Save
              </button>
            </div> */}
          </form>
          <p className="text-center text-gray-500 text-xs">
            ©2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );

};

export default Profile;
