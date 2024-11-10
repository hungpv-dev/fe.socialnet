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