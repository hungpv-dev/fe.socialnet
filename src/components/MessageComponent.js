import axios from "@/axios";
import 'react-toastify/dist/ReactToastify.css';

export const showRoomAvatar = (room) => {
    return <>
        <div className="user-avatars">
            {room.users.slice(0, 4).map((user) => (
                <div className='image-user' key={user.id}>
                    <img src={user.avatar} className="avatar" alt="" />
                </div>
            ))}
        </div>
        <div className={room.online ? 'status' : ''}></div>
    </>;
}   

// Xem tin nhắn
export async function sendMessage(room_id) {
    try {
        await axios.put(`/chat-room/send/${room_id}`);
    } catch (error) {
        console.log('Lỗi khi gửi tin nhắn:', error.message);
    }
}

// Gửi icon đi
export async function sendMessageIcons(message_id,emojis) {
    return await axios.post(`/messages/send-icon/${message_id}`,{emojis});
}

// Hiển thị nội dung tin nhắn trả lời
export function showContentReply(message) {
    if (message.flagged) {
        return 'Tin nhắn đã bị thu hồi';
    }
    if (message.content !== '') {
        return message.content;
    }

    let content = '<div class="d-flex flex-wrap gap-2">';

    message.files.forEach(file => {
        content += `<img src="${file}" alt="Image" />`;
    });
    content += '</div>';
    return content;
}

// Hiển thị nôi dung tin nhắn
export function showMessageContent(message) {
    if (message.flagged) {
        return '<div class="message-content-show">Tin nhắn đã bị thu hồi</div>';
    }
    if (message.content !== '') {
        return `<div class="message-content-show">${message.content}</div>`;
    }

    const files = message.files;

    let content = '<div class="list-images">';

    files.forEach(file => {
        content += `<img src="${file}" alt="Image" />`;
    });
    content += '</div>';
    return content;
}

// Xóa tin nhắn ( chỉ mình tôi );
export async function deleteMessage(message_id,all=false) {
    return axios.delete(`/messages/${message_id}`,{
        data:{
            all:all
        }
    });
}