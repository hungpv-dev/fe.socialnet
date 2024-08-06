import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import styles from "./main.scss";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("header")}>
      <nav className={cx("nav-container")}>
        <div className={cx("nav-column", "left-align")}>
          <Link to="/"><img src="/logo.png" alt="logo" /></Link>
          <div id='btn-search' className={cx("d-inline", "ms-2")}>
            <i class="bi bi-search"></i>
            <span className={cx("ms-2")}>Tìm kiếm</span>
          </div>
        </div>
        <div className={cx("nav-column", "center-align")}>
          <div className={cx("active")} data-tooltip="Trang chủ">
            <Link className={cx("link-header")} to="/"><i class="bi bi-house-door-fill"></i></Link>
          </div>
          <div data-tooltip="Bạn bè">
            <Link className={cx("link-header")} to="/"><i class="bi bi-people-fill"></i></Link>
          </div>
          <div data-tooltip="Nhóm">
            <Link className={cx("link-header")} to="/"><i class="bi bi-person-circle"></i></Link>
          </div>
        </div>
        <div className={cx("nav-column", "right-align")}>
          <div data-tooltip="Menu">
            <i class="bi bi-grid-3x3-gap-fill"></i>
          </div>
          <div data-tooltip="SocialChat">
            <i class="bi bi-chat-dots-fill"></i>
          </div>
          <div data-tooltip="Thông báo">
            <i class="bi bi-bell-fill"></i>
          </div>
          <div className={cx("account")} data-tooltip="Tài khoản">
            <img src='https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_p40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHYubnWDBkT4oU2ojKB_xWukiLmuwlCs0GSIua7CUKzQZp60osvH7nh-QYW_4ObHumjUbVN3GuAgfVx2H86E1pd&_nc_ohc=338WlLTQ_lgQ7kNvgGCXnTk&_nc_ht=scontent.fhan15-1.fna&oh=00_AYA_aE3chYxNjhkzt4sM9sfbSjKSEsUscpAYaN6ooz4vmw&oe=66A97E6A' alt='anh' />
            <div>
              <i class="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
