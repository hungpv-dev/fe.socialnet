import React from "react";
import classNames from "classnames/bind";
import FriendRequests from "../../../components/FriendRequest/FriendRequest";
import styles from "./FriendRequestsPage.module.scss";

const cx = classNames.bind(styles);

const FriendRequestsPage = () => {
  return (
    <div className={cx("friend-requests-page")}>
      <div className={cx("sidebar")}>
        <ul>
          <li className={cx("active")}>Trang chủ</li>
          <li>Lời mời kết bạn</li>
          <li>Gợi ý</li>
          <li>Tất cả bạn bè</li>
        </ul>
      </div>
      <div className={cx("content")}>
        <FriendRequests />
      </div>
    </div>
  );
};

export default FriendRequestsPage;
