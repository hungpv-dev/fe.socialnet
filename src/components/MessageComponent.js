import axios from "@/axios";
export async function sendMessage(room_id){
    const response = await axios.put(`/chat-room/send/${room_id}`);
    return response;
}
