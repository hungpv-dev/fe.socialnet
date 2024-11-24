export const userOnline = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ONLINE':
        return action.payload;
      case 'GET_USER_ONLINE':
        return state;
      default:
        return state;
    }
  };
export default userOnline;