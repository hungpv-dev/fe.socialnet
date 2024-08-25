import classNames from 'classnames/bind';

import styles from "./main.scss";
import User from '../User';
import React, { useState, useEffect, useRef } from 'react';
const cx = classNames.bind(styles);

function SlideBar({ users }) {
  const [modalVisible, setModalVisible] = useState(false);
  const modalPopup = useRef(null);
  const buttonToggle = useRef(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleClickOutside = (event) => {
    if (
      modalPopup.current &&
      !modalPopup.current.contains(event.target) &&
      !buttonToggle.current.contains(event.target)
    ) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);



  return (
    <aside id='sliderbar' className={cx("slidebar")}>
      <div className='nav-top'>
        <header className='d-flex justify-content-between align-items-center'>
          <div className='title'>
            <h3 className='fw-bold'>Đoạn chat</h3>
          </div>
          <button
            ref={buttonToggle}
            onClick={toggleModal}
            className='icon d-flex justify-content-center align-items-center'
          >
            <i className="bi bi-three-dots fs-3 d-flex justify-content-center align-items-center"></i>
          </button>
          {modalVisible && (
            <div className='popup-modal border p-2' ref={modalPopup}>
              <ul className='list-unstyled mb-0'>
                <li className='d-flex align-items-center fs-8'>
                  <div className='modal-icon fw-bold m-1 me-3 fs-5'>
                    <i className="bi bi-circle-square"></i>
                  </div>
                  <div className='modal-text'>
                    <p className='m-0 fw-bold'>Trạng thái hoạt động</p>
                  </div>
                </li>
                <li className='d-flex align-items-center fs-8'>
                  <div className='modal-icon fw-bold m-1 me-3 fs-5'>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className='modal-text'>
                    <p className='m-0 fw-bold'>Tạo nhóm chat</p>
                  </div>
                </li>
                <li className='d-flex align-items-center fs-8'>
                  <div className='modal-icon fw-bold m-1 me-3 fs-5'>
                    <i className="bi bi-archive"></i>
                  </div>
                  <div className='modal-text'>
                    <p className='m-0 fw-bold'>Kho lưu trữ</p>
                  </div>
                </li>
                <li className='d-flex align-items-center fs-8'>
                  <div className='modal-icon fw-bold m-1 me-3 fs-5'>
                    <i className="bi bi-person-fill-slash"></i>
                  </div>
                  <div className='modal-text'>
                    <p className='m-0 fw-bold'>Đã chặn</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </header>
        <div className='search'>
          <div className='icon me-2'>
            <i className="bi bi-search"></i>
          </div>
          <input type="search" className='input-search' placeholder='Tìm kiếm trên social chat' />
        </div>
      </div>
      <div className='list-user mb-2 p-2 d-flex flex-column gap-2'>
        {
          users.map((user) =>
            (<User key={user.id} user={user} />)
          )
        }
      </div>
    </aside>
  );
}

export default SlideBar;
