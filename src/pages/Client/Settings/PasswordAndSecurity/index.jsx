
import { Link } from 'react-router-dom';
import './main.scss';

function PasswordAndSecurity() {
  return (
      <div className="main-content">
        <h3>Mật Khẩu và Bảo Mật</h3>
        <p>Đăng nhập & khôi phục</p>
        <div className="security-options">
          <div className="option">
            <Link to="/setting/change_password">
              <i className="bi bi-lock"></i> <label>Đổi Mật Khẩu</label>
            </Link>

          </div>
          <div className="option">
            <Link to="/setting/factor_authen">
              <i className="bi bi-shield"></i> <label>Xác thực 2 yếu tố</label>
            </Link>

          </div>
          <div className="option">
            <Link to="/setting/Sign_out_devices">
              <i className="bi bi-box-arrow-right"></i><label> Đăng xuất khỏi các thiết bị khác</label>
            </Link>
          </div>
        </div>
      </div>


  );
}

export default PasswordAndSecurity;