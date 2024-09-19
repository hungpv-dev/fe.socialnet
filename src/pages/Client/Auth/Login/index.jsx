import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from "classnames";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./main.scss";
import useAuth from "@/hooks/useAuth";
const cx = classNames.bind(styles);

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // login 
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInputs, setShowInputs] = useState(false);
  const handleGenderChange = (event) => {
    if (event.target.value === 'Male') {
      setShowInputs(true);  // Hiển thị input khi chọn Male
    } else {
      setShowInputs(false);  // Ẩn input khi chọn bất kỳ tùy chọn nào khác
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.login(email, password);
    await auth.me();
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center row login-page">
      <div className="row recent-logins">
        <h1 className="facebook-title fw-bold">facebook</h1>
        <h2 className="recent-logins-title">Recent logins</h2>
        <p>Click your picture or add an account.</p>
        <div className="d-flex login-cards mt-2">
          <div className="col-6 rounded-2 text-center login-card">
            <img className="" src="" alt="User" />
            <div>
              <p>Thuy Trang</p>
            </div>
            <button className="remove-btn">×</button>
          </div>
          <div className="d-flex justify-content-center rounded-2 col-6 login-card add-account" onClick={handleShow}>
            <div className="add-icon">+</div>
            <p>Add Account</p>
          </div>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title className="mt-3">Log in to Facebook</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Email address or phone number" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberPasswordCheck" name="rememberPasswordCheck" />
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <Button type="submit" variant="primary" className=" w-100 mb-2 mt-2">
                  Log in
                </Button>
                <div className="text-center mb-4">
                  <Link className="text-decoration-none d-block forgot-password" to="/register">Forgotten password?</Link>
                  {/* <a href="/register" className="text-decoration-none">
                Forgotten password?
              </a> */}
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>


      <div className=" login-form rounded-3 text-center">
        <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-12 mt-3">
            <div className='responseUser'>
              <img className="" src="" alt="User" />
            </div>
          </div>
          <div className="col-12 forminp mt-3">
            <input type="text" className="form-control mb-3" placeholder="Email address or phone number" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col-12 forminp">
            <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="col-12 btnSub">
            <button type="submit" className="fw-bold fs-5 mb-3 rounded-3 w-100 btn btn-login">Log in</button>
          </div>
          <div className="col-12">
            <Link className="text-decoration-none d-block forgot-password" to="/register">Forgotten password?</Link>
            {/* <a href="/Register" className="text-decoration-none d-block forgot-password">Forgotten password?</a> */}
          </div>
          <div className="col-12 m-3">
            <hr />
          </div>
          <div className="col-12 mb-3">
            <button className="btn btn-create-account fw-bold fs-6 rounded-3" data-bs-toggle="modal" data-bs-target="#signUpModal">Create new account</button>
          </div>
          <div className="col-12">
            <p className="create-page">
              <a className="text-decoration-none" href="#">Create a Page</a> for a celebrity, brand or business.
            </p>
          </div>
        </div>
        </form>
      </div>

      {/* Modal Sign up */}
      <div className="row">
        <div className="col-4">
          <div className=" modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content w-100">
                <div className="modal-header">
                  <h5 className="modal-title" id="signUpModalLabel">Sign Up</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <input type="text" className="form-control" placeholder="First name" />
                      </div>
                      <div className="col-6 mb-3">
                        <input type="text" className="form-control" placeholder="Surname" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <input type="email" className="form-control" placeholder="Mobile number or email address" />
                      </div>
                      <div className="col-12 mb-3">
                        <input type="password" className="form-control" placeholder="New password" />
                      </div>
                    </div>
                    {/* Date of birth */}
                    <div className="row mb-3 dateTime">
                      <label className="form-check-label mb-2">Date</label>
                      <div className="col-4">
                        <select className="form-select">
                          <option>Date</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <select className="form-select">
                          <option>Month</option>
                          <option value="Jan">Jan</option>
                          <option value="Feb">Feb</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <select className="form-select">
                          <option>Year</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                        </select>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="row formGender mb-3">
                      <label className="form-check-label">Gender</label>
                      <div className="m-3 col-3 form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Female" onChange={handleGenderChange} />
                        <label className="form-check-label">Female</label>
                      </div>
                      <div className="m-3 col-3 form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Custom" onChange={handleGenderChange} />
                        <label className="form-check-label">Male</label>
                      </div>

                      <div className="m-3 col-3 form-check">
                        <input className="form-check-input" type="radio" name="gender" value="Male" onChange={handleGenderChange} />
                        <label className="form-check-label">Custom</label>
                      </div>
                    </div>

                    {/* Hiển thị hai ô input khi chọn "Custom" */}
                    {showInputs && (
                      <div className="row mb-3">
                        <div className="col-12 mb-3">
                          <select className="form-control" name="" id="">
                            <option value="">Select your pronoun</option>
                            <option value="">abc </option>
                            <option value="">abc </option>
                            <option value="">abc </option>
                          </select>
                        </div>
                        <div className="col-12 mb-3">
                          <input type="text" className="form-control" placeholder="Gender (Optional)" />
                        </div>
                      </div>
                    )}
                    <div className="text-center mt-4 mb-5">
                      <button type="submit" className="btn-create-account fw-bold fs-6 p-2 rounded-3">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
