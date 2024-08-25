import classNames from "classnames/bind";
import styles from "./RightSidebar.module.scss";
import Chat from "./Chat"
import { Link } from 'react-router-dom';

// Trong component của bạn
function YourComponent() {
    return (
        <Link to="/all" style={{ textDecoration: 'none', color: 'blue' }}>
            Xem tất cả
        </Link>
    );
}


const cx = classNames.bind(styles);

function RightSidebar() {
    return <aside className={cx('right-sidebar')}>
        Được tài trợ
        <hr></hr>
        <div className={cx('request-friend')}>
            <div className={cx('header-section')}>
                Lời mời kết bạn
                <Link to={'/'} className={cx('btn_friend')}>Xem tất cả</Link>
                {/* <span>Xem tất cả</span> */}
            </div>
            <Link to="/" className={cx('link')}>
                <div className={cx('body-section')}>
                    <div>
                        <img src="/user_default.png" alt="Avatar" />
                    </div>
                    <div>
                        <div className={cx('top')}>
                            <section>
                                <span>Đinh Quang Hiến</span>
                                <span>2 giờ</span>
                            </section>
                            <section>
                                6 bạn chung
                            </section>
                        </div>
                        {/* <div className={cx('bottom')}>
                            <div className={cx('btn btn-primary')}>Xác nhận</div>
                            <div className={cx('btn btn-secondary')}>Xóa</div>
                        </div> */}
                    </div>
                </div>
            </Link>
        </div>
        <hr></hr>
        Người liên hệ
        <Chat avatar={<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yAx7GqcuuqUQ7kNvgFe2_fS&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDp6tPWH9pQe5gGNlRY2O6iX4pkKq0LNIFKI4der17R8A&oe=66CDBFAA" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yAx7GqcuuqUQ7kNvgFe2_fS&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDp6tPWH9pQe5gGNlRY2O6iX4pkKq0LNIFKI4der17R8A&oe=66CDBFAA" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yAx7GqcuuqUQ7kNvgFe2_fS&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDp6tPWH9pQe5gGNlRY2O6iX4pkKq0LNIFKI4der17R8A&oe=66CDBFAA" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yAx7GqcuuqUQ7kNvgFe2_fS&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDp6tPWH9pQe5gGNlRY2O6iX4pkKq0LNIFKI4der17R8A&oe=66CDBFAA" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yAx7GqcuuqUQ7kNvgFe2_fS&_nc_ht=scontent.fhan15-1.fna&oh=00_AYDp6tPWH9pQe5gGNlRY2O6iX4pkKq0LNIFKI4der17R8A&oe=66CDBFAA" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
    </aside>;
}

export default RightSidebar;