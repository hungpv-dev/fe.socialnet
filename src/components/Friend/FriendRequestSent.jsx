import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Friend.module.scss";
import { deleteFriendRequest } from "@/services/friendRequestService";
const cx = classNames.bind(styles);

const FriendRequestSent = ({ sents, removeStates, setRemoveStates }) => {
  const sendMessage = (id) => {
    console.log(`Redirecting to chat with user ${id}`);
    // Thêm logic chuyển hướng đến trang nhắn tin
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

  // Lọc các requests để tránh trùng lặp id
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
                {
                  <button
                    onClick={() => sendMessage(id)}
                    className={cx("accept")}
                  >
                    Nhắn tin
                  </button>
                }
                <button
                  onClick={() => unfriend(id)}
                  className={cx("decline", { removing, removed })}
                  disabled={removing || removed}
                >
                  {removing ? "Đang gỡ..." : removed ? "Đã gỡ" : "Gỡ"}
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
