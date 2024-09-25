import {
    index as indexService,
} from '@/services/chatRoomService.js';

const useChatRoom = () => {
    const index = async () => {
        try {
            const response = await indexService();
            if(response.status === 200){
                return response.data;
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return { index };
};

export default useChatRoom;
