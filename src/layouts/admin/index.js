import classNames from "classnames/bind";

import styles from "./main.scss";

const cx = classNames.bind(styles);

function LayoutAdmin({children}) {
    return (
        <section className={cx("main")}>
            <h1>Đây là layout admin</h1>
            {children}
        </section>  
    );
}

export default LayoutAdmin;
