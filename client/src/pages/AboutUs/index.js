import React from 'react';
import { Form,Input, Item, Button } from 'antd';

const AboutUs = () => {
  return (
    <div>
      <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Contact Us</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col-lg-7 mb-5">
            <div className="contact-form bg-light p-30">
              <div id="success" />
              <Form name="sentMessage" id="contactForm" noValidate="novalidate">
                <Form.Item>
                  <Input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required="required"
                    data-validation-required-message="Please enter your name"
                  />
                  <p className="help-block text-danger" />
                </Form.Item>
                <Form.Item className="control-group">
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    required="required"
                    data-validation-required-message="Please enter your email"
                  />
                  <p className="help-block text-danger" />
                </Form.Item>
                <Form.Item className="control-group">
                  <Input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    required="required"
                    data-validation-required-message="Please enter a subject"
                  />
                  <p className="help-block text-danger" />
                </Form.Item>
                <Form.Item className="control-group">
                  <textarea
                    className="form-control"
                    rows={10}
                    id="message"
                    placeholder="Message"
                    required="required"
                    data-validation-required-message="Please enter your message"
                    defaultValue={""}
                  />
                  <p className="help-block text-danger" />
                </Form.Item>
                <Form.Item>
                  <button
                    className="btn btn-primary py-2 px-4 bg-blue-500 text-white cursor-pointer"
                    type="submit"
                    id="sendMessageButton"
                  >
                    Send Message
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <div className="bg-dark p-30 mb-30 border-solid border-black ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.3047969558958!2d88.39257664213874!3d22.657139385326506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d2180ec1e1b%3A0xa53c72706cd27c4b!2sPriyajan%20Apartment!5e0!3m2!1sen!2sin!4v1713007432541!5m2!1sen!2sin"
                style={{ border: 0, width:'100%', height:'400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="bg-light p-30 mb-3">
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary mr-3" />
                3/116, Jatindasnagar, Belghoria, Kolkata
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope text-primary mr-3" />
                info@example.com
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-primary mr-3" />
                +012 345 67890
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs