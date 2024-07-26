import classNames from 'classnames/bind';
import {Link} from "react-router-dom";

import styles from "./main.scss";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("header")}>
      <h1>Đây là header nè</h1>
      <nav>
        <Link to="/">Trang chủ</Link>
        <span> --- </span>
        <Link to="/login">Đăng xuất</Link>
      </nav>
    </header>
  );
}

export default Header;
