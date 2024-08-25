import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './main.scss';

import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
      <div className='row'>
        <div className="col-4">
        <div className="sidebar">
        <ul>
          <li>
            <i className="bi bi-person"></i> Trang Cá Nhân
          </li>
          <li className="active">
            <i className="bi bi-shield-lock"></i> Bảo mật & Mật khẩu
          </li>
          <li>
            <i className="bi bi-person-x"></i> Chặn
          </li>
        </ul>
      </div>
        </div>
      </div>
    );
  };
  
  const MainContent = () => {
    return (
      <div className="row">
        <div className="col-12">
        <div className="main-content">
        <h3>Mật Khẩu và Bảo Mật</h3>
        <p>Đăng nhập & khôi phục</p>
        <div className="security-options">
          <div className="option">
            <i className="bi bi-lock"></i> Đổi Mật Khẩu
          </div>
          <div className="option">
            <i className="bi bi-shield"></i> Xác thực 2 yếu tố
          </div>
          <div className="option">
            <i className="bi bi-box-arrow-right"></i> Đăng xuất khỏi các thiết bị khác
          </div>
        </div>
      </div>    
        </div>
      </div>
    );
  };
  
  function App() {
    return (
      <div className="app">
        <Sidebar />
        <MainContent />
      </div>
    );
  }
  
  export default App;