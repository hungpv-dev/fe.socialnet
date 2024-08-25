
import './main.scss';

function Password() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="main-content">
          <h3>Mật Khẩu và Bảo Mật</h3>
          <p>Đăng nhập & khôi phục</p>
          <div className="security-options">
            <div className="option">
              <i className="bi bi-lock"></i> Đổi Mật Khẩu
            </div>
            <div className="option">
              <i className="bi bi-shield"></i> Xác thực 2 yếu tố
            </div>
            <div className="option">
              <i className="bi bi-box-arrow-right"></i> Đăng xuất khỏi các thiết bị khác
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;