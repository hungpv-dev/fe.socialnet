import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL + '/api';
// import useAuth from "./services/authService";
// const auth = useAuth();
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem('refresh_token');
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/token`, { refresh_token });
        const { access_token, expires_in } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Xử lý lỗi refresh token (ví dụ: đăng xuất người dùng)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        // Chuyển hướng đến trang đăng nhập
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;