import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";
import LeftSidebar from "../../../components/Home/Sidebar/LeftSidebar";
import Content from "../../../components/Home/Content";
import RightSidebar from "../../../components/Home/Sidebar/RightSidebar";

const cx = className.bind(styles);

type Props = {}

const Home = (props: Props) => {


  return (
    <div  className = {cx("home")}>
        <LeftSidebar />
        <Content />
        <RightSidebar />
    </div>
  )
}

export default Home