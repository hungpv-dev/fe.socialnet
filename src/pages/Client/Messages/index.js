import className from "classnames/bind";
import styles from "./main.scss";
import SlideBar from "../../../components/Messages/SlideBar";
import Content from "../../../components/Messages/Content";

const cx = className.bind(styles);

type Props = {}

const Messages = (props: Props) => {

  return (
    <div id="messages" className={cx("#messages")}>
      <SlideBar />
      <Content />
    </div>
  )
}

export default Messages