import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchResults.scss";
import {
  addFriendRequest,
  deleteFriendRequest,
} from "@/services/friendRequestService";
import CircularProgress from "@mui/material/CircularProgress";
import useChatRoom from "@/hooks/useChatRoom";

const SearchResults = ({ users }) => {
  const [addStates, setAddStates] = useState({});
  const [removeStates, setRemoveStates] = useState({});
  const [messageStates, setMessageStates] = useState({});
  const chatRoom = useChatRoom();
  const navigate = useNavigate();

  // Lọc danh sách người dùng không bị trùng lặp dựa trên id
  const uniqueUsers = [
    ...new Map(users.map((user) => [user.id, user])).values(),
  ];

  const handleAddfriend = async (id) => {
    setAddStates((prevStates) => ({
      ...prevStates,
      [id]: { adding: true },
    }));

    try {
      const res = await addFriendRequest(id);

      if (res && res.status === 200) {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { added: true, adding: false },
        }));
      } else {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { adding: false, added: false },
        }));
      }
    } catch (error) {
      console.error("Error adding:", error);
      setAddStates((prevStates) => ({
        ...prevStates,
        [id]: { adding: false, added: false },
      }));
    }
  };

  const handleStartChat = async (userId) => {
    setMessageStates((prevStates) => ({
      ...prevStates,
      [userId]: { messaging: true },
    }));

    try {
      const response = await chatRoom.createPrivateRoom(userId);
      if (response?.data) {
        const room = response.data.data;
        setMessageStates((prevStates) => ({
          ...prevStates,
          [userId]: { messaging: false },
        }));
        navigate(`/messages/${room.chat_room_id}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
      setMessageStates((prevStates) => ({
        ...prevStates,
        [userId]: { messaging: false },
      }));
    }
  };

  const handleRemoveFriend = async (id) => {
    setRemoveStates((prevStates) => ({
      ...prevStates,
      [id]: { removing: true },
    }));

    try {
      const res = await deleteFriendRequest(id);

      if (res && res.status === 200) {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { added: false, adding: false },
        }));
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removed: true, removing: false },
        }));
      } else {
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removing: false, removed: false },
        }));
      }
    } catch (error) {
      console.error("Error removing:", error);
      setRemoveStates((prevStates) => ({
        ...prevStates,
        [id]: { removing: false, removed: false },
      }));
    }
  };

  return (
    <div className="search-results">
      {uniqueUsers.map((user, index) => {
        const { adding, added } = addStates[user.id] || {};
        const { removing, removed } = removeStates[user.id] || {};
        const { messaging } = messageStates[user.id] || {};

        return (
          <div key={index} className="result-item">
            <div className="avatar">
              <img src={user.avatar || "/user_default.png"} alt={user.name} />
            </div>
            <div className="info">
              <h4>
                <Link className="link" to={`/profile/${user.id}`}>
                  {user.name}
                </Link>
              </h4>
              <p>
                {user.button.includes("friend") && "Bạn bè"}

                {user.friend_commons.length > 0 && (
                  <>
                    {user.button.includes("friend") && " ● "}
                    <small>{user.friend_commons.length} bạn chung</small>
                  </>
                )}

                {user.address && (
                  <>
                    {user.friend_commons.length > 0 && " ● "}
                    {`Sống tại ${user.address}`}
                  </>
                )}

                {user.hometown && (
                  <>
                    {(user.address || user.friend_commons.length > 0) && " ● "}
                    {`Đến từ ${user.hometown}`}
                  </>
                )}

                {user.friend_counts > 0 && (
                  <>
                    {(user.button.includes("friend") ||
                      user.address ||
                      user.friend_commons.length > 0 ||
                      user.hometown) &&
                      " ● "}
                    {`${user.friend_counts} bạn bè`}
                  </>
                )}
              </p>
            </div>
            {user.button.includes("add") ? (
              <>
                {!adding && !added && (
                  <button onClick={() => handleAddfriend(user.id)}>
                    Thêm bạn bè
                  </button>
                )}
                {adding && !added && <button style={{ cursor: 'not-allowed' }}>Đang thêm...</button>}
                {!adding && added && !removing && (
                  <button onClick={() => handleRemoveFriend(user.id)}>
                    Gỡ lời mời
                  </button>
                )}
                {removing && <button style={{ cursor: 'not-allowed' }}>Đang gỡ...</button>}
              </>
            ) : (
              <button
                onClick={() => handleStartChat(user.id)}
                disabled={messaging}
                className="chat-button"
              >
                <div className="button-content">
                  {messaging ? <CircularProgress size={15} /> : "Nhắn tin"}
                </div>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
