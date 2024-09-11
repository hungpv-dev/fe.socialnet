import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

const cx = classNames.bind(styles);

function Chat({ avatar, name }) {
    return (
        <div className={cx('chat')}>
            <div className={cx('avatar')}>
                {avatar}
                <div className={cx('status')}>
                    <div></div>
                </div>
            </div>
            <div className={cx('name')}>{name}</div>
        </div>
    );
}

export default Chat;
