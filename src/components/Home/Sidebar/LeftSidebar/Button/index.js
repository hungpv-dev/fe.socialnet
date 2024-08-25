import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ icon, name }) {
    return (
        <div className={cx('button')}>
            <div className={cx('icon')}>{icon}</div>
            <div className={cx('name')}>{name}</div>
        </div>
    );
}

export default Button;
