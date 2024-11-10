import classNames from "classnames/bind";
import styles from "./main.scss";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import echo from "@/components/EchoComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/axios";
import { getNotifications, setNotifications } from "@/actions/notification";

const cx = classNames.bind(styles);

function LayoutClient({ children }) {
    const dispatch = useDispatch();
    var notifications = useSelector(state => state.notifications);
    
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/notifications');
                const notifis = Array.isArray(response.data) ? response.data : [];
                notifications = notifis;
                dispatch(setNotifications(notifis));
            } catch (error) {
                console.error("Lỗi khi lấy thông báo:", error);
            }
        };
        fetchNotifications();
    }, []);

    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        if (userId) {
            const channel = echo.private(`App.Models.User.${userId}`);
            channel.notification((notification) => {
                notification.created_at = new Date().toISOString();
                const currentNotifications = Array.isArray(notifications) ? notifications : [];
                const filteredNotifications = currentNotifications.filter(n => n.id !== notification.id);
                const newNotifications = [notification, ...filteredNotifications];
                dispatch(setNotifications(newNotifications));
            });
            return () => {
                channel.stopListening('notification');
            };
        }
    }, [userId, notifications]);

    return (
        <section className={cx("page")}>
            <Header className={cx("header")} />
            <div className={cx("content")}>
                {children}
            </div>
            <ToastContainer />
        </section>
    );
}

export default LayoutClient
