import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/services/friendRequestService";
import styles from "./Friend.module.scss";

const cx = classNames.bind(styles);

const FriendRequests = ({ requests, requestStates, setRequestStates }) => {
  // const [requestStates, setRequestStates] = useState({});

  const acceptRequest = async (id) => {
    setRequestStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], accepting: true },
    }));

    try {
      const res = await acceptFriendRequest(id);

      if (res && res.status === 200) {
        setRequestStates((prevStates) => ({
          ...prevStates,
          [id]: { accepted: true, accepting: false },
        }));
      } else {
        setRequestStates((prevStates) => ({
          ...prevStates,
          [id]: { accepted: false, accepting: false },
        }));
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      setRequestStates((prevStates) => ({
        ...prevStates,
        [id]: { accepted: false, accepting: false },
      }));
    }
  };

  const rejectRequest = async (id) => {
    setRequestStates((prevStates) => ({
      ...prevStates,
      [id]: { ...prevStates[id], rejecting: true },
    }));

    try {
      const res = await rejectFriendRequest(id);

      if (res && res.status === 200) {
        setRequestStates((prevStates) => ({
          ...prevStates,
          [id]: { rejected: true, rejecting: false },
        }));
      } else {
        setRequestStates((prevStates) => ({
          ...prevStates,
          [id]: { rejected: false, rejecting: false },
        }));
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      setRequestStates((prevStates) => ({
        ...prevStates,
        [id]: { rejected: false, rejecting: false },
      }));
    }
  };

  // Lọc các requests để tránh trùng lặp id
  const uniqueRequests = requests.reduce((acc, request) => {
    if (!acc.some(existingRequest => existingRequest.sender.id === request.sender.id)) {
      acc.push(request);
    }
    return acc;
  }, []);

  return (
    <div className={cx("friend-requests")}>
      <div className={cx("header")}>
        <h2>Lời mời kết bạn</h2>
      </div>
      <div className={cx("request-list")}>
        {uniqueRequests.map((request) => {
          const { id } = request.sender;
          const { accepted, accepting, rejected, rejecting } =
            requestStates[id] || {};

          return (
            <div key={id} className={cx("request-card")}>
              <img
                src={request.sender?.avatar || "/user_default.png"}
                alt={request.sender?.name || "Người dùng"}
                className={cx("avatar")}
              />
              <div className={cx("info")}>
                <h3>
                  {request.sender?.name || "Người dùng"} {id} {id} {id}
                </h3>
                {request.mutualFriends > 0 ? (
                  <p>{request.mutualFriends} bạn chung</p>
                ) : (
                  <p style={{ opacity: 0 }}>.</p>
                )}
              </div>
              <div className={cx("actions")}>
                {!rejected && (
                  <button
                    onClick={() => acceptRequest(id)}
                    className={cx("accept", { accepting, accepted })}
                    disabled={accepting || accepted || rejected || rejecting}
                  >
                    {accepting
                      ? "Đang xác nhận..."
                      : accepted
                      ? "Đã xác nhận"
                      : "Xác nhận"}
                  </button>
                )}
                {!accepted && (
                  <button
                    onClick={() => rejectRequest(id)}
                    className={cx("decline", { "decline-rejected": rejected })}
                    disabled={accepted || accepting || rejected || rejecting}
                    style={{ marginTop: rejected ? "45px" : "0" }}
                  >
                    {rejecting ? "Đang xóa..." : rejected ? "Đã xóa" : "Xóa"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequests;
