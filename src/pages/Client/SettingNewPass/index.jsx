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
          <input type="text" placeholder="Tìm kiếm cài đặt" className="sidebar-search-bar" />
          <nav>
            <ul>
              <li>
                <i className="bi bi-clock-history"></i> Nhật ký hoạt động
              </li>
              <li>
                <i className="bi bi-shield-lock"></i> Bảo mật & Mật khẩu
              </li>
              <li>
                <i className="bi bi-person-x"></i> Chặn
              </li>
            </ul>
          </nav>
        </div>
            </div>
            
        </div>
        
      );
    
  };
  
//   const Navbar = () => {
//     return (
//       <div className="navbar">
//         <div className="navbar-icons">
//           <i className="bi bi-house"></i>
//           <i className="bi bi-person-circle"></i>
//           <i className="bi bi-gear"></i>
//         </div>
//         <div className="user-profile">
//           <i className="bi bi-person"></i>
//           <i className="bi bi-bell"></i>
//           <i className="bi bi-three-dots"></i>
//         </div>
//       </div>
//     );
//   };
  
  const MainContent = () => {
    return (
      <div className="main-content">
        <h3>Đăng Xuất khỏi các thiết bị</h3>
        <div className="select-all">
          <span>Chọn Tất Cả</span>
          <input type="checkbox" />
        </div>
        <div className="device-list">
          {['IPhone 15', 'Máy tính window', 'IPhone', 'IPhone', 'IPhone', 'IPhone', 'IPhone'].map((device, index) => (
            <div key={index} className="device-item">
              <div className="device-info">
                <span>{device}</span>
                <span>13 tháng 6 lúc 11:08</span>
              </div>
              <input type="checkbox" />
            </div>
          ))}
        </div>
        <div className="password-input">
          <input type="password" placeholder="Vui Lòng Nhập Mật Khẩu" />
        </div>
        <button className="logout-button">Đăng Xuất</button>
      </div>
    );
  };
  
  function App() {
    return (
      <div className="app">
        <Sidebar />
        <div className="content-wrapper">
          {/* <Navbar /> */}
          <MainContent />
        </div>
      </div>
    );
  }
  
  export default App;