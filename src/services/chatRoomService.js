import axios from '@/axios';

// Đăng nhập
export const list = async (username, password) => {
  try {
    return await axios.get(`/chat-room`);
  } catch (error) {
    throw error;
  }
};

