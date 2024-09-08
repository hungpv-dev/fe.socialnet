
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// const cx = classNames.bind(styles);

const Settings = () => {
  return (
    <div className="row">
      <div className='col-12 '>
        <div className="main-content-setting">
          <div className="main-search-bar-container">
            <input type="text" placeholder="Tìm kiếm cài đặt" className="main-search-bar" />
          </div>
          <div className="most-accessed">
            <h3>Cài đặt được truy cập nhiều nhất</h3>
            <div className="cards">
              <Link to="/setting/change_password">
                <div className="card">
                  <i className="bi bi-person-x "></i>
                  <h4>Chặn</h4>
                  <p>Xem lại những người bạn đã chặn hoặc thêm ai đó vào danh sách chặn</p>
                </div>
              </Link>

              <Link to="/setting/change_password">
              <div className="card">
                <i className="bi bi-clock-history "></i>
                <h4>Nhật ký hoạt động</h4>
                <p>Xem và quản lý hoạt động của bạn</p>
              </div>
              </Link>

              <Link to="/setting/change_password">
              <div className="card">
                <i className="bi bi-shield-lock"></i>
                <h4>Mật khẩu & Bảo Mật</h4>
                <p>Xem và quản lý quyền riêng tư của bạn</p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;