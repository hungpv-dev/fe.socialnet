import className from "classnames/bind";
import { Link } from 'react-router-dom'
import styles from "./main.scss";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const cx = className.bind(styles);

type Props = {}

const Register = (props: Props) => {

  return (
    <div className="containerF d-flex justify-content-center">
      <div className="row">
      <div className="card p-4">
        <div className="row mb-2">
          <h5 className="fw-bold fs-4">Find Your Account</h5>
        </div>
        <div className="row">
          <hr />
        </div>
        <p className="card-text fs-6">
          Please enter your email address or mobile number to search for your account.
        </p>
        <form>
          <input type="text" className="form-control" placeholder="Email address or mobile number" />
          <div className="row justify-content-end mt-4">
            <div className="col-6 justify-content-end d-flex">
            <Link className="text-decoration-none d-block forgot-password" to="/login"><button type="button" className="btn btn-secondary">Cancel</button></Link>
            <Link className="text-decoration-none d-block forgot-password" to="/forgot"><button type="submit" className="btn btn-primary btn-search">Search</button></Link>
              
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Register