import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import FriendRequests from "../../../components/Friend/FriendRequest";
import FriendAll from "../../../components/Friend/FriendAll";
import FriendRequestSent from "../../../components/Friend/FriendRequestSent";
import FriendSuggestion from "../../../components/Friend/FriendSuggestion";
import { Link } from "react-router-dom";
import styles from "./FriendPage.module.scss";
import {
  People,
  PersonAdd,
  SupervisedUserCircle,
  Send,
} from "@mui/icons-material";
import { getListFriend, getSuggestFriend } from "@/services/friendService";
import {
  getFriendRequests,
  getSentFriendRequests,
} from "@/services/friendRequestService";

const cx = classNames.bind(styles);

const FriendPage = () => {
  const location = useLocation();
  const contentRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sents, setSents] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  const [hasMoreRequest, setHasMoreRequest] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [hasMoreFriend, setHasMoreFriend] = useState(true);
  const [loadingFriend, setLoadingFriend] = useState(false);

  const [hasMoreSent, setHasMoreSent] = useState(true);
  const [loadingSent, setLoadingSent] = useState(false);

  const [hasMoreSuggestion, setHasMoreSuggestion] = useState(true);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [pageSuggestion, setPageSuggestion] = useState(1);

  const [requestStates, setRequestStates] = useState({});
  const [unfriendingStates, setUnfriendingStates] = useState({});
  const [removeStates, setRemoveStates] = useState({});
  const [suggestionStates, setSuggestionStates] = useState({});

  const user = useSelector((state) => state.user);

  // Fetch danh sách bạn bè
  const fetchFriends = async (index) => {
    if (loadingFriend || !hasMoreFriend) return;

    setLoadingFriend(true);
    try {
      const data = await getListFriend(user.id, index);;
      
      if (data?.data?.length > 0) {
        setFriends((prev) => [...prev, ...data.data]);
      } else {
        setHasMoreFriend(false);
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu:", error);
      setHasMoreFriend(false);
    } finally {
      setLoadingFriend(false);
    }
  };

  // Fetch danh sách lời mời kết bạn
  const fetchFriendRequests = async (index) => {
    if (loadingRequest || !hasMoreRequest) return;

    setLoadingRequest(true);
    try {
      const data = await getFriendRequests(index);

      if (data?.data?.length > 0) {
        setRequests((prev) => [...prev, ...data.data]);
      } else {
        setHasMoreRequest(false);
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu lời mời:", error);
      setHasMoreRequest(false);
    } finally {
      setLoadingRequest(false);
    }
  };

  // Fetch danh sách lời mời đã gửi
  const fetchFriendRequestsSent = async (index) => {
    if (loadingSent || !hasMoreSent) return;

    setLoadingSent(true);
    try {
      const data = await getSentFriendRequests(index);

      if (data?.data?.length > 0) {
        setSents((prev) => [...prev, ...data.data]);
      } else {
        setHasMoreSent(false);
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu lời mời:", error);
      setHasMoreSent(false);
    } finally {
      setLoadingSent(false);
    }
  };

  //Lấy danh sách gợi ý kết bạn
  const fetchFriendSuggestion = async (page) => {
    if (loadingSuggestion || !hasMoreSuggestion) return;

    setLoadingSuggestion(true);
    try {
      const data = await getSuggestFriend(page);

      if (data?.data?.data?.length > 0) {
        setSuggestion((prev) => [...prev, ...data.data.data]);
        setPageSuggestion(page + 1);
      } else {
        setHasMoreSuggestion(false);
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu lời mời:", error);
      setHasMoreSuggestion(false);
    } finally {
      setLoadingSuggestion(false);
    }
  };

  // Gọi fetchFriends khi trang bạn bè được load
  useEffect(() => {
    switch (location.pathname) {
      case "/friends":
        if (user?.id) fetchFriends(0);
        break;
      case "/friends/request":
        fetchFriendRequests(0);
        break;
      case "/friends/request/sent":
        fetchFriendRequestsSent(0);
        break;
      case "/friends/suggestions":
        fetchFriendSuggestion(1);
        break;
      default:
        break;
    }
  }, [location.pathname, user]);

  // Xử lý sự kiện cuộn cho cả bạn bè và lời mời
  const handleScroll = () => {
    const container = contentRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (location.pathname === "/friends" && hasMoreFriend && !loadingFriend) {
        fetchFriends(friends.length);
      } else if (
        location.pathname === "/friends/request" &&
        hasMoreRequest &&
        !loadingRequest
      ) {
        fetchFriendRequests(requests.length);
      } else if (
        location.pathname === "/friends/request/sent" &&
        hasMoreSent &&
        !loadingSent
      ) {
        fetchFriendRequestsSent(sents.length);
      } else if (
        location.pathname === "/friends/suggestions" &&
        hasMoreSuggestion &&
        !loadingSuggestion
      ) {
        fetchFriendSuggestion(pageSuggestion);
      }
    }
  };

  // Thêm sự kiện cuộn khi component được render
  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    friends,
    requests,
    sents,
    suggestion,
    hasMoreFriend,
    hasMoreRequest,
    hasMoreSent,
    hasMoreSuggestion,
    loadingFriend,
    loadingRequest,
    loadingSent,
    loadingSuggestion,
  ]);

  const navItems = [
    {
      path: "/friends",
      label: "Tất cả bạn bè",
      icon: <People sx={{ mr: 1 }} />,
    },
    {
      path: "/friends/request",
      label: "Lời mời kết bạn",
      icon: <PersonAdd sx={{ mr: 1 }} />,
    },
    {
      path: "/friends/suggestions",
      label: "Gợi ý",
      icon: <SupervisedUserCircle sx={{ mr: 1 }} />,
    },
    {
      path: "/friends/request/sent",
      label: "Lời mời kết bạn đã gửi",
      icon: <Send sx={{ mr: 1 }} />,
    },
  ];

  const renderContent = () => {
    switch (location.pathname) {
      case "/friends":
        return (
          <FriendAll
            friends={friends}
            unfriendingStates={unfriendingStates}
            setUnfriendingStates={setUnfriendingStates}
          />
        );
      case "/friends/request":
        return (
          <FriendRequests
            requests={requests}
            requestStates={requestStates}
            setRequestStates={setRequestStates}
          />
        );
      case "/friends/suggestions":
        return (
          <FriendSuggestion
            suggestion={suggestion}
            suggestionStates={suggestionStates}
            setSuggestionStates={setSuggestionStates}
          />
        );
      case "/friends/request/sent":
        return (
          <FriendRequestSent
            sents={sents}
            removeStates={removeStates}
            setRemoveStates={setRemoveStates}
          />
        );
      default:
        return <div>Không tìm thấy nội dung</div>;
    }
  };

  return (
    <div className={cx("friend-requests-page")}>
      <div className={cx("sidebar")}>
        <ul>
          {navItems.map((item) => (
            <li
              key={item.path}
              className={cx({ active: location.pathname === item.path })}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={contentRef}
        className={cx("content")}
        style={{ overflowY: "auto", height: "100vh" }}
      >
        {renderContent()}
        {location.pathname === "/friends" && (
          <>
            {loadingFriend && (
              <div className={cx("centered")}>
                <CircularProgress color="inherit" size={24} />
              </div>
            )}
            {!hasMoreFriend && (
              <div className={cx("centered")}>
                Không còn bạn bè để hiển thị.
              </div>
            )}
          </>
        )}

        {location.pathname === "/friends/request" && (
          <>
            {loadingRequest && (
              <div className={cx("centered")}>
                <CircularProgress color="inherit" size={24} />
              </div>
            )}
            {!hasMoreRequest && (
              <div className={cx("centered")}>Không còn lời mời kết bạn.</div>
            )}
          </>
        )}

        {location.pathname === "/friends/request/sent" && (
          <>
            {loadingSent && (
              <div className={cx("centered")}>
                <CircularProgress color="inherit" size={24} />
              </div>
            )}
            {!hasMoreSent && (
              <div className={cx("centered")}>Không còn lời mời đã gửi.</div>
            )}
          </>
        )}

        {location.pathname === "/friends/suggestions" && (
          <>
            {loadingSuggestion && (
              <div className={cx("centered")}>
                <CircularProgress color="inherit" size={24} />
              </div>
            )}
            {!hasMoreSuggestion && (
              <div className={cx("centered")}>Không còn gợi ý kết bạn.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendPage;
