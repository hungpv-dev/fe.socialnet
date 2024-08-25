import classNames from "classnames/bind";
import styles from "./main.scss";
import Header from "../../components/Header";

const cx = classNames.bind(styles);

function LayoutClient({children}) {
    return (
        <section className={cx("page")}>
            <Header />
            {children}
        </section>  
    );
}

export default LayoutClient
