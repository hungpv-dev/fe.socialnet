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


const Quanly = () => {
  return (
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
  );
};

export default Quanly;
