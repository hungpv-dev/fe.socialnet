import axios from '@/axios';

// Đăng nhập
export const index = async (i) => {
  return await axios.get(`/chat-room`,{params: {index:i}});
};

export const show = async (id) => {
  return await axios.get(`/chat-room/${id}`);
};

