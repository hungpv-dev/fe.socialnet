import styles from "./main.scss";
import './main.scss';

function SignOutDevices() {
  return (
    <div className="main-content-sign">
      <h3>Đăng Xuất khỏi các thiết bị</h3>
      {/* <div className="select-all">
        <span>Chọn Tất Cả</span>
        <input type="checkbox" />
      </div> */}
      <div className="col-12 device-list">
        {['IPhone 15', 'Máy tính window', 'IPhone', 'IPhone', 'IPhone', 'IPhone', 'IPhone'].map((device, index) => (
          <div key={index} >
            <span>{device}</span>
            <div className="device-item">
              <div className="device-info">
                {/* <span>{device}</span> */}
                <span>13 tháng 6 lúc 11:08</span>
              </div>
              <input type="checkbox" />
            </div>
          </div>
        ))}
      </div>
      <div className="password-input">
        <input type="password" placeholder="Vui Lòng Nhập Mật Khẩu" />
      </div>
      <button className="logout-button">Đăng Xuất</button>
    </div>

  );
}

export default SignOutDevices;