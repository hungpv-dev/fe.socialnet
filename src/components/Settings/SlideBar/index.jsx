import { Link } from 'react-router-dom';
import './main.scss';

const SlideBar = () => {
    return (
        <div className='row'>
            <div className="sidebar">
                <input type="text" placeholder="Tìm kiếm cài đặt" className="sidebar-search-bar" />
                <nav>
                    <ul>
                        <li>
                            <Link to="/setting/activity_log">
                                <i className="bi bi-clock-history"></i> Nhật ký hoạt động
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/password_and_security">
                                <i className="bi bi-shield-lock"></i> Bảo mật & Mật khẩu
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/block">
                                <i className="bi bi-person-x"></i> Chặn
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SlideBar;