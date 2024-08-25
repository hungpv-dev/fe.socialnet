
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './main.scss';

import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// const cx = classNames.bind(styles);

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
    
    const MainContent = () => {
      return (
        <div className="row">
            <div className='col-12 '>
            <div className="main-content">
          <div className="main-search-bar-container">
            <input type="text" placeholder="Tìm kiếm cài đặt" className="main-search-bar" />
          </div>
          <div className="most-accessed">
            <h3>Cài đặt được truy cập nhiều nhất</h3>
            <div className="cards">
              <div className="card">
                <i className="bi bi-person-x"></i>
                <h4>Chặn</h4>
                <p>Xem lại những người bạn đã chặn hoặc thêm ai đó vào danh sách chặn</p>
              </div>
              <div className="card">
                <i className="bi bi-clock-history"></i>
                <h4>Nhật ký hoạt động</h4>
                <p>Xem và quản lý hoạt động của bạn</p>
              </div>
              <div className="card">
                <i className="bi bi-shield-lock"></i>
                <h4>Mật khẩu & Bảo Mật</h4>
                <p>Xem và quản lý quyền riêng tư của bạn</p>
              </div>
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