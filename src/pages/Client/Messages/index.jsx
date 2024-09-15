import className from "classnames/bind";
import styles from "./main.scss";
import Content from "@/components/Messages/Content";
import { useParams } from 'react-router-dom';

const cx = className.bind(styles);


const Messages = () => {
  const { id } = useParams();
  if(!id){
    return (
      <div id="content">
        <h1 className="alert alert-success">Bắt đầu cuộc hội thoại ngay bây giơ</h1>
      </div>
    )
  }
  return (
    <Content />
  )
}

export default Messages