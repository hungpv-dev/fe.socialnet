export const getUser = () => {
  return {
    type: 'GET',
  };
};
export const setUser = (user) => {
  return {
    type: 'SET',
    payload: user,
  };
};