import className from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from "./main.scss";
import React, { useState } from 'react';
import axios from 'axios';  // Thêm Axios để gửi yêu cầu HTTP
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = className.bind(styles);

const Register = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
 
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form inputs
    const validationErrors = {};
    if (!formData.firstName) validationErrors.firstName = 'Họ là bắt buộc';
    if (!formData.lastName) validationErrors.lastName = 'Tên là bắt buộc';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    else if (formData.phoneNumber.length < 10) validationErrors.phoneNumber = 'Số điện thoại phải có ít nhất 10 chữ số';
    if (!formData.password) validationErrors.password = 'Mật khẩu là bắt buộc';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Mật khẩu không khớp';
  
  
    setErrors(validationErrors);
  
    // If no errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      // Gửi yêu cầu POST tới db.json bằng Axios
      axios.post('http://localhost:2004/user', formData)
        .then(response => {
          console.log('Form submitted successfully', response.data);
          setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          
          });
          alert('Đăng ký thành công!');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          alert('Đã xảy ra lỗi khi gửi dữ liệu.');
        });
    }
  };
  

  return (
    <div className="containerF d-flex justify-content-center ">
      <div className="row">
        <div className="card p-4">
          <div className="row mb-2">
            <h5 className="fw-bold fs-4">Đăng Ký</h5>
          </div>
          <div className="row mb-3">
            <hr />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Họ và Tên */}
            <div className="flex space-x-4 mb-2">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Họ"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md form-control"
                />
                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Tên"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md form-control"
                />
                {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-2">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md form-control"
              />
              {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
            </div>

            {/* Mật khẩu */}
            <div className="mb-2">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md form-control"
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="mb-2">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập Lại Mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md form-control"
              />
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </div>

      

            <div className="row justify-content-center m-4">
              <button type="submit" className="btn btn-primary p-3">Đăng Ký Ngay</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
