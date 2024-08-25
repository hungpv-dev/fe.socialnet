import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from "./main.scss";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

// type Props = {}

const Repassword = (props: Props) => {

    const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Confirmation code entered:", code);
  };

  const handleCancel = () => {
    setCode("");
  };

    return (
        <div className="containerFl">
            
            <form onSubmit={handleSubmit} className="form rounded-0">
            <h2 className="mb-4">Nhập mật khẩu mới</h2> 
            <div className="input-group">
                <input className="" type="text" id="confirmation-code" value={code} onChange={handleChange}/>
                <label className="" htmlFor="confirmation-code">Nhập mật khẩu mới</label>
            </div>
           
                <div className=" d-flex justify-content-center">
                <button type="submit"  className=" d-flex justify-content-center submit-btn">
                    CẬP NHẬT
                </button>
                </div>
            </form>
        </div>
    );
};

export default Repassword;