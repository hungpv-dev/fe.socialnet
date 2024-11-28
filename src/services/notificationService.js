import axiosInstance from '@/axios';

const getNotifications = async (index) => {
    return await axiosInstance.get('/notifications', { params: { index } });
};

const markAllAsRead = async () => {
    return await axiosInstance.post('/notifications/read/all');
};

const markAllAsSeen = async () => {
    return await axiosInstance.post("/notifications/seen");
};

export default {
    getNotifications,
    markAllAsRead,
    markAllAsSeen,
};
