import React, { useState } from "react";
import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangePassword() {
      
  return (
    <div class="custom-card">
        <div class="card-body">
            <h1 class="card-title">Đổi mật khẩu</h1>
            <p class="card-text">
                Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).
            </p>
            <form>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Mật khẩu hiện tại" value="" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Mật khẩu mới" value="" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Nhập lại mật khẩu mới" value="" />
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="logoutDevices" />
                    <label class="form-check-label" for="logoutDevices">
                        Đăng xuất khỏi các thiết bị khác. Hãy chọn mục này nếu người khác từng dùng tài khoản của bạn.
                    </label>
                </div>
                <button type="submit" class="btn">
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    </div>

);
}

export default ChangePassword;