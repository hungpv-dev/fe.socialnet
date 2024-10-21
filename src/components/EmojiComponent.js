import { useSelector } from "react-redux";
import { sendMessageIcons } from "./MessageComponent";

export const ShowEmojiMessage = ({ emos,messageId, setMessage, setShowEmoji }) => {
    const user = useSelector((state) => state.user);
    const handleEmojiClick = (emoji) => () => {
        setMessage(prevMessages => prevMessages.map(message => 
            message.message_id === messageId
                ? {
                    ...message,
                    emotions: message.emotions.some(e => e.user_id === user.id && e.emoji === emoji)
                        ? message.emotions.filter(e => e.user_id !== user.id)
                        : [...message.emotions.filter(e => e.user_id !== user.id), { emoji, id: Date.now(), user_id: user.id }]
                }
                : message
        ));
        setShowEmoji(false);
        sendEmojisToServer(emoji);
    };

    const sendEmojisToServer = async (emoji) => {
        try{
            await sendMessageIcons(messageId,emoji);
        }catch(error){
            console.log(error);
        }
    };

    const reactionIcons = [
        { name: "Thích", emoji: "👍" },
        { name: "Yêu thích", emoji: "❤️" },
        { name: "Haha", emoji: "😆" },
        { name: "Wow", emoji: "😮" },
        { name: "Buồn", emoji: "😢" },
        { name: "Phẫn nộ", emoji: "😠" },
    ];

    const emoSelect = emos.find(item => item.user_id === user.id);
    return (
        <div className="emoji-list">
            {reactionIcons.map((reaction, index) => {
                return <button 
                        key={index}
                        className={`emoji-button ${emoSelect?.emoji === reaction.emoji ? 'currentEmoji' : ''}`}
                        title={reaction.name}
                        onClick={handleEmojiClick(reaction.emoji)}
                    >{reaction.emoji}</button>
            })}
        </div>
    );
}