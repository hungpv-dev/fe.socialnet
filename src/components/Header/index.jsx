import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import styles from "./main.scss";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("header")}>
      <nav className={cx("nav-container")}>
        <div className={cx("nav-column", "left-align")}>
          {/* <Link to="/"><img src="/logo.png" alt="logo" /></Link> */}
          <Link to="/"><img src="/logo2.png" alt="logo" /></Link>
          <div id='btn-search' className={cx("d-inline", "ms-2")}>
            <i className={cx('bi bi-search')}></i>
            <span className={cx("ms-2")}>Tìm kiếm</span>
          </div>
        </div>
        <div className={cx("nav-column", "center-align")}>
          <div className={cx("active")} data-tooltip="Trang chủ">
            <Link className={cx("link-header")} to="/"><i className={cx('bi bi-house-door-fill')}></i></Link>
          </div>
          <div data-tooltip="Bạn bè">
            <Link className={cx("link-header")} to="/"><i className={cx('bi bi-people-fill')}></i></Link>
          </div>
          <div data-tooltip="Nhóm">
            <Link className={cx("link-header")} to="/"><i className={cx('bi bi-person-circle')}></i></Link>
          </div>
        </div>
        <div className={cx("nav-column", "right-align")}>
          <div data-tooltip="Menu">
            <i className={cx('bi bi-grid-3x3-gap-fill')}></i>
          </div>
          <div data-tooltip="SocialChat">
            <i className={cx('bi bi-chat-dots-fill')}></i>
          </div>
          <div data-tooltip="Thông báo">
            <i className={cx('bi bi-bell-fill')}></i>
          </div>
          <div className={cx("account")} data-tooltip="Tài khoản">
            <img src="/user_default.png" alt="anh" />
            <div>
              <i className={cx('bi bi-chevron-down')}></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
