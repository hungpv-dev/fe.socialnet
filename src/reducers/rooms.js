export const rooms = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return action.payload;
    case 'GET_ROOM':
      return state;
    default:
      return state;
  }
};
export default rooms;