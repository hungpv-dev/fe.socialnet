import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./FriendRequest.module.scss";

const cx = classNames.bind(styles);

const FriendRequests = () => {
  const friendRequests = [
    {
      id: 1,
      name: "Nguyễn Tùng Dương",
      mutualFriends: 3,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 2,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 3,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 4,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 5,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 6,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 7,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 8,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 9,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
    {
      id: 10,
      name: "Lily",
      mutualFriends: 0,
      avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/465146075_496612803345271_3816051701351507714_n.jpg?stp=dst-jpg_s240x240&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGj-tAQ-EnrjKChrNhRZ59_TQHjvEMiqRdNAeO8QyKpF3g9_pyPOdjAQh1Mexy7r6rFdOhCL7GtTd4Ccbn1XZi1&_nc_ohc=G8-EA7LQbC8Q7kNvgHFeGQl&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=ARWJ_rXIWgCI5BdGOO8cf9f&oh=00_AYCMe5JtUuMWqa8jz_WfUXnIhUWmXWkQKccQ9LeuBkZxLw&oe=673DF640",
    },
  ];

  return (
    <div className={cx("friend-requests")}>
      <div className={cx("header")}>
        <h2>Lời mời kết bạn</h2>
        <Link to="/friend/request" className={cx("view-all-button")}>
          Xem tất cả
        </Link>
      </div>
      <div className={cx("request-list")}>
        {friendRequests.map((request) => (
          <div key={request.id} className={cx("request-card")}>
            <img
              src={request.avatar}
              alt={request.name}
              className={cx("avatar")}
            />
            <div className={cx("info")}>
              <h3>{request.name}</h3>
              {request.mutualFriends > 0 ? (
                <p>{request.mutualFriends} bạn chung</p>
              ):(
                <p style={{ opacity: 0 }}>.</p>
              )}
            </div>
            <div className={cx("actions")}>
              <button className={cx("accept")}>Xác nhận</button>
              <button className={cx("decline")}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
