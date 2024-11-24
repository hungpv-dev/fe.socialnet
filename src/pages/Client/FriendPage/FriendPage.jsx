import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import FriendRequests from "../../../components/Friend/FriendRequest";
import FriendAll from "../../../components/Friend/FriendAll";
import FriendRequestSent from "../../../components/Friend/FriendRequestSent";
import { Link } from "react-router-dom";
import styles from "./FriendPage.module.scss";
import { People, PersonAdd, SupervisedUserCircle, Send } from "@mui/icons-material";
import { getListFriend } from "@/services/friendService"; // Giả sử có hàm getFriendRequests để lấy dữ liệu lời mời
import {
  getFriendRequests,
  getSentFriendRequests,
} from "@/services/friendRequestService";

const cx = classNames.bind(styles);

const FriendPage = () => {
  const location = useLocation();
  const contentRef = useRef(null); // Tham chiếu đến container `content`
  const [friends, setFriends] = useState([]); // useState để lưu danh sách bạn bè
  const [requests, setRequests] = useState([]); // useState để lưu danh sách lời mời kết bạn
  const [sents, setSents] = useState([]); // useState để lưu danh sách lời mời kết bạn
  const [hasMore, setHasMore] = useState(true); // Quản lý dữ liệu còn hay không
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải

  const [requestStates, setRequestStates] = useState({});
  const [unfriendingStates, setUnfriendingStates] = useState({});
  const [removeStates, setRemoveStates] = useState({});

  const user = useSelector((state) => state.user);
  // Fetch danh sách bạn bè
  const fetchFriends = async (index) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getListFriend(user.id, index); // Sử dụng index thay vì page

      if (data?.data?.length > 0) {
        setFriends((prev) => [...prev, ...data.data]); // Cập nhật state friends
      } else {
        setHasMore(false); // Không còn dữ liệu
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch danh sách lời mời kết bạn
  const fetchFriendRequests = async (index) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getFriendRequests(index); // Sử dụng index thay vì page

      if (data?.data?.length > 0) {
        setRequests((prev) => [...prev, ...data.data]); // Cập nhật state requests
      } else {
        setHasMore(false); // Không còn dữ liệu
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu lời mời:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendRequestsSent = async (index) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getSentFriendRequests(index);
      console.log(data.data);

      if (data?.data?.length > 0) {
        setSents((prev) => [...prev, ...data.data]); // Cập nhật state requests
      } else {
        setHasMore(false); // Không còn dữ liệu
      }
    } catch (error) {
      console.error("Không thể tải dữ liệu lời mời:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  // Gọi fetchFriends khi trang bạn bè được load
  useEffect(() => {
    if (user?.id) {
      fetchFriends(0);
    }
  }, [user]);

  // Gọi fetchFriendRequests khi trang lời mời được load
  useEffect(() => {
    fetchFriendRequests(0); // Bắt đầu tải dữ liệu lời mời ở trang 1
  }, []); // [] để chỉ gọi 1 lần khi component mount

  useEffect(() => {
    fetchFriendRequestsSent(0); // Bắt đầu tải dữ liệu lời mời ở trang 1
  }, []); // [] để chỉ gọi 1 lần khi component mount

  // Xử lý sự kiện cuộn cho cả bạn bè và lời mời
  const handleScroll = () => {
    const container = contentRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
      if (location.pathname === "/friends") {
        fetchFriends(friends.length); // Dùng length của friends làm index
      } else if (location.pathname === "/friends/request") {
        fetchFriendRequests(requests.length); // Dùng length của requests làm index
      } else if (location.pathname === "/friends/request/sent") {
        fetchFriendRequestsSent(sents.length); // Dùng length của requests làm index
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
  }, [friends, hasMore, loading]);

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
        ); // Truyền props `friends` cho FriendsList
      case "/friends/request":
        return (
          <FriendRequests
            requests={requests}
            requestStates={requestStates}
            setRequestStates={setRequestStates}
          />
        ); // Truyền props `requests` cho FriendRequests
      case "/friends/suggestions":
        return <div>Gợi ý bạn bè sẽ hiển thị ở đây</div>;
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
        ref={contentRef} // Gắn ref vào khu vực content
        className={cx("content")}
        style={{ overflowY: "auto", height: "100vh" }} // Bật scroll
      >
        {renderContent()}
        {loading && <div>Đang tải...</div>}
        {!hasMore && <div>Không còn dữ liệu.</div>}
      </div>
    </div>
  );
};

export default FriendPage;
