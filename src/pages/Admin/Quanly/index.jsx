import className from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./main.scss";
const cx = className.bind(styles);
// import "bootstrap/dist/css/bootstrap.min.css";

// const data = [
//   {
//     id: 1,
//     name: "Nguyễn Văn A",
//     email: "nvanph123@fpt.edu.vn",
//     role: "Người dùng",
//     status: "đang hoạt động",
//   },
//   {
//     id: 2,
//     name: "Nguyễn Văn A",
//     email: "nvanph123@fpt.edu.vn",
//     role: "Người dùng",
//     status: "Chờ xác nhận",
//   },
//   {
//     id: 3,
//     name: "Nguyễn Văn A",
//     email: "nvanph123@fpt.edu.vn",
//     role: "Người dùng",
//     status: "Đang xử lý",
//   },
// ];
// const cx = className.bind(styles);
// console.log("abc ");

const Quanly = () => {
  return (
    <div className={cx("list-qly")}>
      <h3 className="my-4">Account Management</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th className="exte-center">ID</th>
            <th className="exte-center">Tên</th>
            <th className="exte-center">Email</th>
            <th className="exte-center">Vai trò</th>
            <th className="exte-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <td className="exte-center"> 12 </td>
          <td className="exte-center">abc </td>
          <td className="exte-center">abc@gmailm.com </td>
          <td className="exte-center"> hân viên </td>
          <td className="exte-center">hoạt động </td>
          {/* {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Quanly;
