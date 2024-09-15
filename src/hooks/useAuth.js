import {
  login as loginService,
  register as registerService,
  logout_from_other_driver as logout_from_other_driverService,
  logout as logoutService,
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

  const logout = () => {
    logoutService();
  };

  const register = () => {
    registerService();
  };

  const logout_from_other_driver = () => {
    logout_from_other_driverService();
  };

  return { login, logout, logout_from_other_driver, register };
};

export default useAuth;
