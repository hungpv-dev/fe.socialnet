import axiosInstance from "@/axios";

export const getFriendRequests = async (index) => {
  return await axiosInstance.get('/friend/request/all', {params: {index: index}});
}

export const getSentFriendRequests = async (index) => {
  return await axiosInstance.get('/friend/request/sent', {params: {index: index}});
}

export const acceptFriendRequest = async (id) => {
  return await axiosInstance.post('/friend/request/accept', { id_account: id });
}

export const addFriendRequest = async (id) => {
  return await axiosInstance.post('/friend/request/add', { id_account: id });
}

export const rejectFriendRequest = async (id) => {
  return await axiosInstance.post('/friend/request/reject', { id_account: id, _method: "DELETE" });
}

export const deleteFriendRequest = async (id) => {
  return await axiosInstance.post('/friend/request/delete', { id_account: id, _method: "DELETE" });
}