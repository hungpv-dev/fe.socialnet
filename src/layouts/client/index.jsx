import classNames from "classnames/bind";
import styles from "./main.scss";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import echo from "@/components/EchoComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "@/actions/notification";
import axiosInstance from "@/axios";

const cx = classNames.bind(styles);

function LayoutClient({ children }) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.id);
    const [notis, setNotis] = useState([]);
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get("/notifications");
                setNotis(response.data)
            } catch (error) {
                console.error("Lỗi khi tải thông báo:", error);
            }
        };
        const fetchUnseenCount = async () => {
            try {
                const response = await axiosInstance.get("/notifications/unseen-count");
                setUnseenCount(response.data.count);
            } catch (error) {
                console.error("Lỗi khi lấy số thông báo chưa đọc:", error);
            }
        };
        if (userId) {
            fetchUnseenCount();
            fetchNotifications();
        }
    }, [userId]);

    useEffect(() => {
        dispatch(setNotifications(notis));
    }, [notis]);
    
    useEffect(() => {
        if (userId) {
            const channel = echo.private(`App.Models.User.${userId}`);
            channel.notification((notification) => {
                let neNoti = {
                    id: notification.id,
                    type: notification.type, 
                    notifiable_type: "App\\Models\\User",
                    notifiable_id: 1,
                    data: {
                        post_id: notification.post_id,
                        comment_id: notification.comment_id,
                        avatar: notification.avatar,
                        message: notification.message
                    },
                    is_seen: 0,
                    is_read: 0, 
                    read_at: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
                setNotis(pre => [neNoti,...pre])
                setUnseenCount(c => c + 1)
            });
            return () => {
                channel.stopListening('notification');
            };
        }
    }, [userId]);

    return (
        <section className={cx("page")}>
            <Header
                unseenCount={unseenCount}
                setUnseenCount={setUnseenCount}
            className={cx("header")} />
            <div className={cx("content")}>
                {children}
            </div>
            <ToastContainer />
        </section>
    );
}

export default LayoutClient
