import classNames from "classnames/bind";
import styles from "./RightSidebar.module.scss";
import Chat from "./Chat"
import Banner from "./Banner"
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
        <Banner
            image="https://scontent.fhan14-1.fna.fbcdn.net/v/t45.1600-4/455023410_120210911267640561_7071954057481782306_n.png?stp=cp0_dst-jpg_fr_q90_spS444&_nc_cat=1&ccb=1-7&_nc_sid=c02adf&_nc_eui2=AeHOgDAfj1y8tUT2C2EGWg7R1TxVZiuWBbvVPFVmK5YFu0URXpVxKWGphfIHTOUGzyBem6VDmxFwvW7S3Q3PYh5f&_nc_ohc=OPYxsZGkDE0Q7kNvgEHmPMd&_nc_ht=scontent.fhan14-1.fna&_nc_gid=A5AnA65_iCNwEYylrH0UqLQ&oh=00_AYAEXr3kovHuJVOMB-jbwyHFO9ZuKYIDieVY3nqxUCXzpg&oe=66E0A0EF"
            name="Facebook"
            link="https://www.facebook.com/"
        />
        <Banner
            image="https://scontent.fhan14-1.fna.fbcdn.net/v/t45.1600-4/455023410_120210911267640561_7071954057481782306_n.png?stp=cp0_dst-jpg_fr_q90_spS444&_nc_cat=1&ccb=1-7&_nc_sid=c02adf&_nc_eui2=AeHOgDAfj1y8tUT2C2EGWg7R1TxVZiuWBbvVPFVmK5YFu0URXpVxKWGphfIHTOUGzyBem6VDmxFwvW7S3Q3PYh5f&_nc_ohc=OPYxsZGkDE0Q7kNvgEHmPMd&_nc_ht=scontent.fhan14-1.fna&_nc_gid=A5AnA65_iCNwEYylrH0UqLQ&oh=00_AYAEXr3kovHuJVOMB-jbwyHFO9ZuKYIDieVY3nqxUCXzpg&oe=66E0A0EF"
            name="Facebook"
            link="https://www.facebook.com/"
        />
        <hr></hr>
        <div className={cx('request-friend')}>
            <div className={cx('header-section')}>
                Lời mời kết bạn
                <Link to={'/'} className={cx('btn_friend')}>Xem tất cả</Link>
            </div>
            <Link to="/" className={cx('link')}>
                <div className={cx('body-section')}>
                    <div className={cx('left')}>
                        <img src="/user_default.png" alt="Avatar" />
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('top')}>
                            <section>
                                <span>Đinh Quang Hiến</span>
                                <span>2 giờ</span>
                            </section>
                            <section>
                                6 bạn chung
                            </section>
                        </div>
                        <div className={cx('bottom')}>
                            <div className={cx('btn btn-primary')}>Xác nhận</div>
                            <div className={cx('btn btn-secondary')}>Xóa</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <hr></hr>
        Người liên hệ
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <hr></hr>
        Nhóm chat
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />
        <Chat avatar={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg?stp=cp6_dst-jpg_s80x80&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Cnlin-hWJG8Q7kNvgE14cYF&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAuzbHKd8ccjb8oOrQ7k8e2wC6KOybkVXtZ-KgE8dGvJg&oe=66DFC42A" alt="Home Icon" style={{ width: '100%', height: '100%' }} />} name="Home" />

    </aside>;
}

export default RightSidebar;