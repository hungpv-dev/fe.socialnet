export const getUser = () => {
  return {
    type: 'GET_USER',
  };
};
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const getUserOnline = () => {
  return {
    type: 'GET_USER_ONLINE',
  };
};
export const setUserOnline = (users) => {
  return {
    type: 'SET_USER_ONLINE',
    payload: users,
  };
};