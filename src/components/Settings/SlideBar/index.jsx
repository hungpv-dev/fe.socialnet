import './main.scss';

const SlideBar = () => {
    return (
        <div className='row'>
            <div className="col-4">
                <div className="sidebar">
                    <input type="text" placeholder="Tìm kiếm cài đặt" className="sidebar-search-bar" />
                    <nav>
                        <ul>
                            <li>
                                <i className="bi bi-clock-history"></i> Nhật ký hoạt động
                            </li>
                            <li>
                                <i className="bi bi-shield-lock"></i> Bảo mật & Mật khẩu
                            </li>
                            <li>
                                <i className="bi bi-person-x"></i> Chặn
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SlideBar;