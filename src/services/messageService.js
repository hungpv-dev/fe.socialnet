import axios from '@/axios';

// Danh sách tin nhắn
export const index = async (params = {}) => {
  return await axios.get(`/messages`,{params});
};

