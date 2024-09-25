import axios from '@/axios';

// Danh sách tin nhắn
export const index = async (params = {}) => {
  return await axios.get(`/messages`,{params});
};

export const create = async (room_id, data) => {
  return await axios.post(`/messages?chat_room_id=${room_id}`, data);
};

