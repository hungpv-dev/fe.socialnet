// // src/axiosInstance.js
// import axios from 'axios';

// // Tạo một instance của axios
// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
// });

// // Interceptor để thêm Bearer Token vào headers
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Lấy token từ localStorage
//         const token = localStorage.getItem('token'); // Hoặc bất cứ nơi nào bạn lưu token

//         if (token) {
//             // Thêm token vào header
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Hàm để làm mới token
// async function refreshToken() {
//     // Lấy refresh token từ localStorage
//     const refreshToken = localStorage.getItem('refreshToken');

//     try {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/refresh-token`, {
//             token: refreshToken,
//         });

//         const { accessToken, newRefreshToken } = response.data;

//         // Lưu trữ lại các token mới
//         localStorage.setItem('token', accessToken);
//         localStorage.setItem('refreshToken', newRefreshToken);

//         return accessToken;
//     } catch (error) {
//         console.error('Error refreshing token', error);
//         throw error;
//     }
// }

// // Interceptor để xử lý response
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const newAccessToken = await refreshToken();
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 // Xử lý lỗi khi làm mới token thất bại
//                 console.error('Token refresh failed', refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
