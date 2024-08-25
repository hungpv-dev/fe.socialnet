import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';
import styles from "./main.scss";
import SlideBar from "../../components/Messages/SlideBar";
import axios from "axios";
const cx = classNames.bind(styles);


console.log(process.env.REACT_APP_API_URL);

async function fetchUsers(){
    let response = axios.get('http://localhost:2004/message_users');
    let users = await response.then(res => res.data );
    return users;
}; 

const users = await fetchUsers();

function LayoutMessages({children}) {
    const { id } = useParams();
    return (
        <div id="messages" className={cx("messages",{'content-messages':!id})}>
            <SlideBar users={users} />
            {children}
        </div>
    );
}

export default LayoutMessages
