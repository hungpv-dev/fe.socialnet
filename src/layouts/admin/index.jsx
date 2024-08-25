import classNames from "classnames/bind";

import styles from "./main.scss";
import SlideBar from "../../components/Admin/SlideBar";

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
  return (
    <div className="container">
      <div className="row">
        <SlideBar></SlideBar>
        {children}
      </div>
    </div>
  );
}

export default LayoutAdmin;
