import axiosInstance from "@/axios";

export const getListFriend = async (id, index) => {
    return await axiosInstance.get(`/friend/list/${id}`, { params: { index: index } });
}

export const deleteFriend = async (id) => {
    return await axiosInstance.post('/friend/remove', { id_account: id, _method: "DELETE" } );
}

export const getSuggestFriend = async () => {
    return await axiosInstance.get('/friend/suggest');
}