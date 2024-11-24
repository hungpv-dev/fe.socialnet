import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles"; 

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
}));

const NotificationCard = ({ avatar, badge, name, message, time }) => {
  return (
    <div className="d-flex mb-3 rounded-[10px]">
      <div className="action-indicators p-2">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<SmallAvatar alt="Badge" src={badge} />}
        >
          <Avatar
            alt={name}
            src={avatar}
            style={{ width: "70px", height: "70px" }}
          />
        </Badge>
      </div>
      <div className="p-2">
        <div className="anh-th-container1">
          <span className="nhc-n-bn">
            <a
              href="#" // Đường dẫn vẫn có thể thay đổi
              style={{ pointerEvents: "none" }} // Vô hiệu hóa thẻ a
              className="text-blue-600 hover:text-blue-800"
              dangerouslySetInnerHTML={{ __html: message }} // Cho phép HTML trong message
            />
          </span>
        </div>

        <div className="gi2 mt-2">{time}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
