import className from "classnames/bind";
import styles from "./main.scss";
import LeftSidebar from "../../../components/Home/Sidebar/LeftSidebar";
import Content from "../../../components/Home/Content";
import RightSidebar from "../../../components/Home/Sidebar/RightSidebar";

const cx = className.bind(styles);

const Home = () => {
  return (
    <div className={cx("home")}>
      <LeftSidebar />
      <Content />
      <RightSidebar />
    </div>
  );
};

export default Home;
