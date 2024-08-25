import classNames from "classnames/bind";
import styles from "./main.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
const cx = classNames.bind(styles);

function User({ user }) {
  const [modalVisible, setModalVisible] = useState(false);
  const modalPopup = useRef(null);
  const buttonToggle = useRef(null);
  const [popupDirection, setPopupDirection] = useState("down");

  const toggleModal = (event) => {
    event.stopPropagation();
    adjustPopupDirection();
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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  const adjustPopupDirection = () => {
    const buttonRect = buttonToggle.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const popupHeight = 250;

    if (buttonRect.bottom + popupHeight > viewportHeight) {
      setPopupDirection("up");
    } else {
      setPopupDirection("down");
    }
  };

  return (
    <div className={cx("user")}>
      <Link to={`/messages/${user.id}`} className="user-avatar">
        <img src={user.avatar} className="avatar" alt="" />
        <div className={user.status ? "status" : ""}></div>
      </Link>
      <Link to={`/messages/${user.id}`} className="content">
        <h5 className="m-0">{user.name}</h5>
        <p className={!user.send ? "m-0 mt-1 text-dark fw-bold" : "m-0"}>
          {user.last_message} . {user.last_time}
        </p>
      </Link>
      <button
        ref={buttonToggle}
        onClick={toggleModal}
        className={`popup ${
          modalVisible ? "d-flex" : "d-none"
        } justify-content-center align-items-center`}
      >
        <i className="bi bi-three-dots fs-3 d-flex justify-content-center align-items-center"></i>
      </button>
      {modalVisible && (
        <div
          className={`popup-modal border p-2 ${
            popupDirection === "up" ? "popup-up" : "popup-down"
          }`}
          ref={modalPopup}
        >
          <ul className="list-unstyled mb-0">
            <li className="d-flex align-items-center fs-8">
              <div className="modal-icon fw-bold m-1 me-3 fs-5">
                <i className="bi bi-bell"></i>
              </div>
              <div className="modal-text">
                <p className="m-0 fw-bold">Tắt thông báo</p>
              </div>
            </li>
            <li className="d-flex align-items-center fs-8">
              <div className="modal-icon fw-bold m-1 me-3 fs-5">
                <i className="bi bi-trash3"></i>
              </div>
              <div className="modal-text">
                <p className="m-0 fw-bold">Xóa đoạn chat</p>
              </div>
            </li>
            <li className="d-flex align-items-center fs-8">
              <div className="modal-icon fw-bold m-1 me-3 fs-5">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="modal-text">
                <p className="m-0 fw-bold">Xem trang cá nhân</p>
              </div>
            </li>
            <li className="d-flex align-items-center fs-8">
              <div className="modal-icon fw-bold m-1 me-3 fs-5">
                <i className="bi bi-archive"></i>
              </div>
              <div className="modal-text">
                <p className="m-0 fw-bold">Lưu trữ đoạn chat</p>
              </div>
            </li>
            <li className="d-flex align-items-center fs-8">
              <div className="modal-icon fw-bold m-1 me-3 fs-5">
                <i className="bi bi-person-fill-slash"></i>
              </div>
              <div className="modal-text">
                <p className="m-0 fw-bold">Chặn</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default User;
