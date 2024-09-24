import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';
import styles from "./main.scss";
import SlideBar from "../../components/Messages/SlideBar";
import useChatRoom from "@/hooks/useChatRoom";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);


function LayoutMessages({children}) {
    const chatRoom = useChatRoom();
    const [rooms,setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await chatRoom.list();
                setRooms(response.data); 
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchRooms();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div id="messages" className={cx("messages",{'content-messages':!id})}>
            <SlideBar rooms={rooms} />
            {children}
        </div>
    );
}

export default LayoutMessages
