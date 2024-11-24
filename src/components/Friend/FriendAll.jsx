import React, { useState } from "react";
import classNames from "classnames/bind";
import { deleteFriend } from "@/services/friendService";
import styles from "./Friend.module.scss";

const cx = classNames.bind(styles);

const FriendAll = ({ friends, unfriendingStates, setUnfriendingStates }) => {
  // const [unfriendingStates, setUnfriendingStates] = useState({});

  const handleUnfriend = async (id) => {
    setUnfriendingStates((prevStates) => ({
      ...prevStates,
      [id]: { unfriending: true },
    }));

    try {
      const res = await deleteFriend(id);
      console.log(res);

      if (res && res.status === 200) {
        setUnfriendingStates((prevStates) => ({
          ...prevStates,
          [id]: { unfriended: true, unfriending: false },
        }));
      } else {
        setUnfriendingStates((prevStates) => ({
          ...prevStates,
          [id]: { unfriending: false, unfriended: false },
        }));
      }
    } catch (error) {
      console.error("Error unfriending:", error);
      setUnfriendingStates((prevStates) => ({
        ...prevStates,
        [id]: { unfriending: false, unfriended: false },
      }));
    }
  };

  const uniqueFriends = friends.reduce((acc, friend) => {
    if (!acc.some((existingFriends) => existingFriends.id === friend.id)) {
      acc.push(friend);
    }
    return acc;
  }, []);

  return (
    <div className={cx("friend-requests")}>
      <div className={cx("header")}>
        <h2>Danh sách bạn bè</h2>
      </div>
      <div className={cx("request-list")}>
        {uniqueFriends.map((friend) => {
          const { id } = friend;
          const { unfriending, unfriended } = unfriendingStates[id] || {};

          return (
            <div key={id} className={cx("request-card")}>
              <img
                src={friend.avatar || "/user_default.png"}
                alt={friend.name || "Người dùng"}
                className={cx("avatar")}
              />
              <div className={cx("info")}>
                <h3>{friend.name || "Người dùng"}</h3>
                {friend.mutualFriends > 0 ? (
                  <p>{friend.mutualFriends} bạn chung</p>
                ) : (
                  <p style={{ opacity: 0 }}>.</p>
                )}
              </div>
              <div className={cx("actions")}>
                <button
                  onClick={() => console.log(`Nhắn tin với ${friend.name}`)}
                  className={cx("accept")}
                >
                  Nhắn tin
                </button>
                <button
                  onClick={() => handleUnfriend(id)}
                  className={cx("decline", { unfriending })}
                  disabled={unfriending || unfriended}
                >
                  {unfriending
                    ? "Đang hủy..."
                    : unfriended
                    ? "Đã hủy"
                    : "Hủy kết bạn"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendAll;
