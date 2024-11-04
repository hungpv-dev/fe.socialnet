import axiosInstance from '@/axios';
import {
    index as indexService,
} from '@/services/chatRoomService.js';

const useChatRoom = () => {
    const index = async (i = 0) => {
        try {
            const response = await indexService(i);
            if(response.status === 200){
                return response.data;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const search = async (value) => {
        try {
            const response = await axiosInstance.post('/friend/find',{name:value});
            // const rooms = await axiosInstance.get('/chat-room/search',{name:value});
            return {
                friends: response.data.data,
                rooms: []
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createPrivateRoom = async (id) => {
        try {
            let data = {
                chat_type_id: 1,
                friend_id: id,
            }
            const response = await axiosInstance.post('/chat-room',data);
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    return { index, search, createPrivateRoom };
};

export default useChatRoom;
