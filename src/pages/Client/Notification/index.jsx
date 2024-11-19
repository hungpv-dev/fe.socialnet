import React from "react";
import NotificationList from "../../../components/Notifications/NotificationList";

const notifications = [
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU",
    badge:
      "https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg",
    name: "Anh Thư",
    message: "đã nhắc đến bạn trong một bình luận.",
    time: "6 giờ",
  },
];

const Notification = () => {
  return (
    <div id="content">
      <div className="alert mt-5">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="thong-bao-vanh">
              <p className="fs-4 fw-bold">Thông báo</p>
              {/* <div className="hstack gap-3 mt-2">
                <div className="tt">
                  <a href="#">Tất cả</a>
                </div>
                <div className="cha ms-2">
                  <a href="/new">Chưa đọc</a>
                </div>
              </div> */}

              {/* Render danh sách thông báo */}
              <NotificationList notifications={notifications} />

              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <button className="show-all-button">Xem tất cả</button>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
