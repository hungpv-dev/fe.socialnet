import axiosInstance from '@/axios';

const useFriend = () => {
    const accept = async (userId) => {
        try {
            const response = await axiosInstance.post(`/friend/request/accept`,{
                id_account: userId
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const reject = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/friend/request/reject`, {
                data: { id_account: userId }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteFriend = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/friend/request/delete`, {
                data: { id_account: userId }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteFriendSuccess = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/friend/remove`, {
                data: { id_account: userId }
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const add = async (userId) => {
        try {
            const response = await axiosInstance.post(`/friend/request/add`,{
                id_account: userId
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return { accept, reject, deleteFriend, deleteFriendSuccess, add };
};

export default useFriend;
