import {
    list as listService,
} from '@/services/chatRoomService.js';

const useChatRoom = () => {
    const list = async () => {
        try {
            const response = await listService();
            if(response.status === 200){
                return response.data;
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return { list };
};

export default useChatRoom;
