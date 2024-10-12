import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';
import styles from "./main.scss";
import SlideBar from "../../components/Messages/SlideBar";
import useChatRoom from "@/hooks/useChatRoom";
import echo from '@/components/EchoComponent';
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
    show as showChatRoom,
} from '@/services/chatRoomService.js';
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "@/actions/rooms";
const cx = classNames.bind(styles);

function LayoutMessages({ children }) {
    const chatRoom = useChatRoom();
    const auth = useAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const currentRooms = useSelector(state => state.rooms); 

    useEffect(() => {
        const channel = echo.private(`room.refresh-users.${user.id}`);
        channel.listen('ChatRoom\\RefreshUsers', async (data) => {
            let room_id = data.room.id;
            const response = await showChatRoom(room_id);
            const room = response.data.data;
            const updatedRooms = [room, ...currentRooms.filter(r => r.chat_room_id !== room.chat_room_id)];
            dispatch(setRooms(updatedRooms));
        });
        return () => {
            channel.stopListening('ChatRoom\\RefreshUsers');
        };
    }, [user]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRooms = await chatRoom.index();
                dispatch(setRooms(responseRooms.data)); 
                const responseUser = await auth.me();
                setUser(responseUser.data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="messages" className={cx("messages", { 'content-messages': !id })}>
            <SlideBar />
            {children}
        </div>
    );
}

export default LayoutMessages
