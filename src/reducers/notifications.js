export const notifications = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'GET_NOTIFICATION':
      return state;
    default:
      return state;
  }
};
export default notifications;