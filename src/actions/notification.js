export const getNotifications = () => {
    return {
        type: 'GET_NOTIFICATION',
    };
};
export const setNotifications = (notifications) => {
    return {
        type: 'SET_NOTIFICATION',
        payload: notifications,
    };
};

export const updateNotificationStatus = (id) => ({
    type: 'UPDATE_NOTIFICATION_STATUS',
    payload: id,
});