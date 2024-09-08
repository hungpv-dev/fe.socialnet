import React from "react";
import "./main.scss"; // Import the SCSS file

const activities = [
  { icon: "🎥", text: "Video bạn đã tìm kiếm" },
  { icon: "🎥", text: "Video bạn đã xem" },
  { icon: "🔍", text: "Lịch sử tìm kiếm của bạn" },
  { icon: "👥", text: "Nhóm bạn đã tìm kiếm" },
  { icon: "💬", text: "Bình luận" },
  { icon: "📝", text: "Bài viết và bình luận trong nhóm" },
  { icon: "📺", text: "Hoạt động trên Tin" },
  { icon: "📄", text: "Trang, lượt thích trang và sở thích" },
  { icon: "👤", text: "Bạn bè" },
  { icon: "📍", text: "Nơi bạn đăng nhập" },
  { icon: "🔗", text: "Mối quan hệ" },
];

const ActivityLog = () => {
  return (
    <div className="activity-log-container">
      {activities.map((activity, index) => (
        <div className="activity-log-item" key={index}>
          <div className="activity-log-item__icon">{activity.icon}</div>
          <div className="activity-log-item__text">{activity.text}</div>
          <div className="activity-log-item__arrow">›</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;