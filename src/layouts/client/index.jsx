import classNames from "classnames/bind";
import styles from "./main.scss";
import Header from "../../components/Header";
import Home from "../../pages/Client/Home";

const cx = classNames.bind(styles);

function LayoutClient({ children }) {
    return (
        <section className={cx("page")}>
            <Header className={cx("header")} />
            <div className={cx("content")}>
                {children}
            </div>
        </section>
    );
}

export default LayoutClient
