import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Orders from "./Orders";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { tab } = useParams();
  return (
    <>
      <div classname="container flex justify-center ">
        <div classname=" row">
          <form className>
            <div className="row">
              <div className="mb-3 col-md-6">
                <div id="firstName">
                  <label className="form-label">First Name</label>
                  <input
                    required
                    placeholder="Enter your first name"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 col-md-6">
                <div id="lastName">
                  <label className="form-label">Last Name</label>
                  <input
                    required
                    placeholder="Also your last name"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="align-items-center row">
              <div className="mb-3 col-md-6">
                <div id="birthday">
                  <label className="form-label">Birthday</label>
                  <input
                    required
                    placeholder="mm/dd/yyyy"
                    type="text"
                    className="form-control"
                    
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 col-md-6">
                <div id="gender">
                  <label className="form-label">Gender</label>
                  <select className="form-select">
                    <option value={0} selected>
                      Gender
                    </option>
                    <option value={1}>Female</option>
                    <option value={2}>Male</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <div id="emal">
                  <label className="form-label">Email</label>
                  <input
                    required
                    placeholder="name@company.com"
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 col-md-6">
                <div id="phone">
                  <label className="form-label">Phone</label>
                  <input
                    required
                    placeholder="+12-345 678 910"
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <h5 className="my-4">Address</h5>
            <div className="row">
              <div className="mb-3 col-sm-9">
                <div id="address">
                  <label className="form-label">Address</label>
                  <input
                    required
                    placeholder="Enter your home address"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 col-sm-3">
                <div id="addressNumber">
                  <label className="form-label">Number</label>
                  <input
                    required
                    placeholder="No."
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-sm-4">
                <div id="city">
                  <label className="form-label">City</label>
                  <input
                    required
                    placeholder="City"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 col-sm-4">
                <div className="mb-2">
                  <label className="form-label">Select state</label>
                  <select id="state" className="form-select">
                    <option value={0} selected>
                      State
                    </option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div id="zip">
                  <label className="form-label">ZIP</label>
                  <input
                    required
                    placeholder="ZIP"
                    type="tel"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Save All
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

};

export default Profile;
