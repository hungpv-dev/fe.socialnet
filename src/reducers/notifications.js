// reducer
export const notifications = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...action.payload];
    case 'GET_NOTIFICATION':
      return state;
    case 'UPDATE_NOTIFICATION_STATUS':
      return state.map((notification) =>
          notification.id === action.payload
              ? { ...notification, is_read: 1, is_seen: 1 }
              : notification
      );
    default:
      return state;
  }
};

export default notifications;
