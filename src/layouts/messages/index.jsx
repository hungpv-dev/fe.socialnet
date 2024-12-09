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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box as LoadingContainer } from "@mui/material";

const cx = classNames.bind(styles);

function LayoutMessages({ children }) {
    const chatRoom = useChatRoom();
    const auth = useAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const { id } = useParams();
    const currentRooms = useSelector(state => state.rooms);

    useEffect(() => {
        const channel = echo.private(`room.refresh-users.${user.id}`);
        channel.listen('ChatRoom\\RefreshUsers', async (data) => {
            let room_id = data.room.id;
            const response = await showChatRoom(room_id);
            const room = response.data.data;
            const outs = room.outs ?? [];
            const isOut = outs?.includes('user_' + user.id);
            if (!isOut) {
                let updatedRooms = [...currentRooms.filter(r => r.chat_room_id !== room.chat_room_id)];
                if (room.last_message) {
                    updatedRooms = [room, ...updatedRooms];
                }
                updatedRooms.forEach(r => {
                    if (r.chat_room_id === parseInt(currentId)) {
                        if (r.last_message) {
                            r.last_message.is_seen = true;
                        }
                        r.selected = true;
                    } else {
                        r.selected = false;
                    }
                });
                dispatch(setRooms(updatedRooms));
            } else {
                let newRoom = currentRooms.map(item => {
                    if(item.chat_room_id === room_id){
                        item.outs = outs;
                    }
                    return item;
                });
                dispatch(setRooms(newRoom));
            }
        });
        return () => {
            channel.stopListening('ChatRoom\\RefreshUsers');
        };
    }, [user, currentId]);

    useEffect(() => {
        setCurrentId(id);
    }, [id]);

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
        return (
            <LoadingContainer
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                bgcolor: 'background.default'
              }}
            >
              <CircularProgress size={40} />
            </LoadingContainer>
          );
    }


    return (
        <>
            <div id="messages" className={cx("messages", { 'content-messages': !id })}>
                <SlideBar />
                {children}
                <ToastContainer />
            </div>
        </>
    );
}

export default LayoutMessages
