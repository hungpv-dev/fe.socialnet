import axios from '@/axios';

// Đăng nhập
export const index = async () => {
  return await axios.get(`/chat-room`);
};

export const show = async (id) => {
  return await axios.get(`/chat-room/${id}`);
};

