import React from "react";
import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications }) => {
  return (
    <div className="row">
      {notifications.map((item, index) => (
        <div className="col-md-12" key={index}>
          <NotificationCard
            avatar={item.avatar}
            badge={item.badge}
            name={item.name}
            message={item.message}
            time={item.time}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
