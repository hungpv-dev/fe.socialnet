import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { deleteFriendRequest } from "@/services/friendRequestService";
import useChatRoom from "@/hooks/useChatRoom";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

const FriendRequestSent = ({ sents, removeStates, setRemoveStates }) => {
  const chatRoom = useChatRoom();
  const navigate = useNavigate();

  // Trạng thái loading riêng cho nút nhắn tin
  const [loadingStates, setLoadingStates] = useState({});

  const handleStartChat = async (userId) => {
    // Đặt trạng thái loading cho nút nhắn tin của user này
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    try {
      const response = await chatRoom.createPrivateRoom(userId);
      if (response?.data) {
        const room = response.data.data;
        // Loại bỏ trạng thái loading và chuyển trang
        setLoadingStates((prev) => ({ ...prev, [userId]: false }));
        navigate(`/messages/${room.chat_room_id}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
      // Loại bỏ trạng thái loading khi có lỗi
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const unfriend = async (id) => {
    setRemoveStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], removing: true },
    }));

    try {
      const res = await deleteFriendRequest(id);

      if (res && res.status === 200) {
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removed: true, removing: false },
        }));
      } else {
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removed: false, removing: false },
        }));
      }
    } catch (error) {
      console.error("Error unfriending user:", error);
      setRemoveStates((prevStates) => ({
        ...prevStates,
        [id]: { removed: false, removing: false },
      }));
    }
  };

  const uniqueSents = sents.reduce((acc, sent) => {
    if (
      !acc.some((existingSent) => existingSent.receiver.id === sent.receiver.id)
    ) {
      acc.push(sent);
    }
    return acc;
  }, []);

  return (
    <div className={cx("friend-requests")}>
      <div className={cx("header")}>
        <h2>Lời mời kết bạn đã gửi</h2>
      </div>
      <div className={cx("request-list")}>
        {uniqueSents.map((request) => {
          const { id } = request.receiver;
          const { removed, removing } = removeStates[id] || {};
          const isLoading = loadingStates[id]; // Lấy trạng thái loading của nút nhắn tin

          return (
            <div key={id} className={cx("request-card")}>
              <Link to={`/profile/${id}`} className={cx("avatar-link")}>
                <img
                  src={request.receiver?.avatar || "/user_default.png"}
                  alt={request.receiver?.name || "Người dùng"}
                  className={cx("avatar")}
                />
              </Link>
              <div className={cx("info")}>
                <Link to={`/profile/${id}`} className={cx("name-link")}>
                  <h3>{request.receiver?.name || "Người dùng"}</h3>
                </Link>
                {request.mutualFriends > 0 ? (
                  <p>{request.mutualFriends} bạn chung</p>
                ) : (
                  <p style={{ opacity: 0 }}>.</p>
                )}
              </div>
              <div className={cx("actions")}>
                <button
                  onClick={() => handleStartChat(id)}
                  className={cx("accept")}
                  disabled={isLoading} // Vô hiệu hóa nút trong khi đang loading
                >
                  {isLoading ? <CircularProgress size={15} /> : "Nhắn tin"}{" "}
                  {/* Hiệu ứng loading */}
                </button>
                <button
                  onClick={() => unfriend(id)}
                  className={cx("decline", { removing, removed })}
                  disabled={removing || removed}
                >
                  {removing ? "Đang gỡ..." : removed ? "Đã gỡ" : "Gỡ lời mời"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequestSent;
