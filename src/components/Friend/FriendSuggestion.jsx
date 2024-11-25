import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { addFriendRequest } from "@/services/friendRequestService";
import styles from "./Friend.module.scss";

const cx = classNames.bind(styles);

const FriendSuggestion = ({
  suggestion,
  suggestionStates,
  setSuggestionStates,
}) => {
  // const [unfriendingStates, setUnfriendingStates] = useState({});

  const handleAddfriend = async (id) => {
    setSuggestionStates((prevStates) => ({
      ...prevStates,
      [id]: { adding: true },
    }));

    try {
      const res = await addFriendRequest(id);

      if (res && res.status === 200) {
        setSuggestionStates((prevStates) => ({
          ...prevStates,
          [id]: { added: true, adding: false },
        }));
      } else {
        setSuggestionStates((prevStates) => ({
          ...prevStates,
          [id]: { adding: false, added: false },
        }));
      }
    } catch (error) {
      console.error("Error adding:", error);
      setSuggestionStates((prevStates) => ({
        ...prevStates,
        [id]: { adding: false, added: false },
      }));
    }
  };

  const uniqueSuggestion = suggestion.reduce((acc, sugg) => {
    if (!acc.some((existingSuggestion) => existingSuggestion.id === sugg.id)) {
      acc.push(sugg);
    }
    return acc;
  }, []);

  return (
    <div className={cx("friend-requests")}>
      <div className={cx("header")}>
        <h2>Danh sách gợi ý bạn bè</h2>
      </div>
      <div className={cx("request-list")}>
        {uniqueSuggestion.map((friend) => {
          const { id } = friend;
          const { adding, added } = suggestionStates[id] || {};

          return (
            <div key={id} className={cx("request-card")}>
              <Link to={`/profile/${id}`} className={cx("avatar-link")}>
                <img
                  src={friend.avatar || "/user_default.png"}
                  alt={friend.name || "Người dùng"}
                  className={cx("avatar")}
                />
              </Link>
              <div className={cx("info")}>
                <Link to={`/profile/${id}`} className={cx("name-link")}>
                  <h3>{friend.name || "Người dùng"}</h3>
                </Link>
                {friend.mutualFriends > 0 ? (
                  <p>{friend.mutualFriends} bạn chung</p>
                ) : (
                  <p style={{ opacity: 0 }}>.</p>
                )}
              </div>
              <div className={cx("actions")}>
                <button
                  onClick={() => handleAddfriend(id)}
                  className={cx("accept", { added, adding })}
                  disabled={adding || added}
                >
                  {adding ? "Đang thêm..." : added ? "Đã thêm" : "Thêm bạn bè"}
                </button>
                <button
                  onClick={() => console.log(`Nhắn tin với ${friend.name}`)}
                  className={cx("decline")}
                >
                  Nhắn tin
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendSuggestion;
