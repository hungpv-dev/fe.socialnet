import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

// Đăng nhập
export const login = async (username, password) => {
  let data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'password',
    username: username,
    password: password
  }
  return await axios.post(`${API_URL}/oauth/token`, data);
};

// Đăng kí
export const register = async (email, name, password, c_password) => {
  let data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    email: email,
    name: name,
    password: password,
    c_password: c_password
  }
  return await axios.post(`${API_URL}/api/register`, data);
};

// Cập lại access
export const refresh = async (refreshToken) => {
  let data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }
  return await axios.post(`${API_URL}/oauth/token`, data);
};

// Đăng xuất
export const logout = async (access_token) => {
  return await axios.post(`${API_URL}/api/logout`,{
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
  });
};

// Đăng xuất khỏi các thiết bị khác
export const logout_from_other_driver = async (access_token, password) => {
  let data = {password};
  const response = await axios.post(`${API_URL}/api/logout-all-driver`,{
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      data: data
  });
  return response;
};


export const me = async (access_token) => {
  const response = await axios.get(`${API_URL}/api/user`,{
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
  });
  return response;
};
