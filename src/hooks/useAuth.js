import {
  login as loginService,
  register as registerService,
  logout_from_other_driver as logout_from_other_driverService,
  logout as logoutService,
  me as meService,
} from '../services/authService';

const useAuth = () => {

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      if(response.status === 200) {
        const {
          access_token,
          refresh_token,
          expires_in
        } = response.data;
        const now = Date.now();
        const expirationTime = now + expires_in * 1000;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expirationTime);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const me = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await meService(access_token);
    return response;
  };

  const checkLogin = () => {
    const access_token = localStorage.getItem('access_token');
    const expires_in = localStorage.getItem('expires_in');
    if(expires_in && access_token){
      const now = Date.now();
      if(now > expires_in){
        return false;
      }
      return true;
    }
  };

  const logout = () => {
    logoutService();
  };

  const register = () => {
    registerService();
  };

  const logout_from_other_driver = () => {
    logout_from_other_driverService();
  };

  return { login, me, logout, logout_from_other_driver, register, checkLogin};
};

export default useAuth;
