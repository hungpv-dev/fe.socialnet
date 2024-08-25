import classNames from "classnames/bind";
import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content(){
    return <div className={cx('home-content')}>Noi dung</div>;
}

export default Content;
