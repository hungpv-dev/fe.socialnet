import className from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const data = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nvanph123@fpt.edu.vn",
    role: "Người dùng",
    status: "đang hoạt động",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    email: "nvanph123@fpt.edu.vn",
    role: "Người dùng",
    status: "Chờ xác nhận",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    email: "nvanph123@fpt.edu.vn",
    role: "Người dùng",
    status: "Đang xử lý",
  },
];
const cx = className.bind(styles);

type Props = {};

const Quanly = (props: Props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 bg-light sidebar">
          <h4 className="text-primary my-4">ADMIN</h4>
          <h6>Main Menu</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Campaign
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                account management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Balance
              </a>
            </li>
          </ul>
          <ul className="nav flex-column mt-4">
            <h6>Others</h6>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Guide
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Messages <span className="badge bg-danger">1</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div className="col-10">
          <h3 className="my-4">Account Management</h3>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quanly;
