import classNames from "classnames/bind";
import styles from "./main.scss";
import SlideBar from "../../components/Settings/SlideBar";
const cx = classNames.bind(styles);

function LayoutSettings({ children }) {
    return (
        <div className={cx('app')}>
            <SlideBar></SlideBar>
            {children}
        </div>
    );
}

export default LayoutSettings
