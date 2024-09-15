import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const cx = className.bind(styles);

function Forgot() {
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
    <div className="container-f">
      <div className="card rounded-0">
        <h2>Nhập mã xác nhận</h2> 
        <div className="input-group entryarea">
          <input className="" type="text" id="confirmation-code" value={code} onChange={handleChange}/>
          <label className="" htmlFor="confirmation-code">Nhập mã để xác nhận</label>
        </div>
        <div className="row buttons d-flex justify-content-end ">
          <div className="d-flex justify-content-end ">
            <button className="cancel" onClick={handleCancel}>Hủy</button>
            <Link className="text-decoration-none d-block forgot-password" to="/repassword"><button className="submit btn-buttons btn btn-primary" onClick={handleSubmit}>Xác nhận</button></Link>
            
          </div>
          </div>
      </div>
    </div>
  );
  }
  
  export default Forgot;
