import className from "classnames/bind";
import { Link } from "react-router-dom";
// import styles from "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// const accusedAccounts = [
//   {
//     id: 1,
//     name: "Nguyễn Văn B",
//     email: "nvbv1234@fpt.edu.vn",
//     status: "Bị tố cáo",
//     reports: [
//       {
//         reporter: "Nguyễn Văn C",
//         reason: "Nội dung không hợp lệ",
//         date: "20/2/2020",
//         history:
//           "Tài khoản có nội dung không phù hợp đã bị tố cáo lúc 20h15p ngày 20/2/2020",
//       },
//     ],
//   },
// ];
// };
const ToCao = () => {
  return (
    <div className="container-fluid-tocao">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h5>ADMIN</h5>
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
                  Accused account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Balance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Guide
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Messages <span className="badge bg-danger">New!</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="w-75  ">
          <h2>Accused Accounts</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search member..."
          />

          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* <tbody>
              {accusedAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.status}</td>
                  <td>
                    <button className="btn btn-primary">Xem</button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>

          <h3>Report History</h3>
          <table className="table ">
            <thead>
              <tr>
                <th>Người Tố Cáo</th>
                <th>Lý do</th>
                <th>Ngày tháng</th>
                <th>Lịch sử tố cáo</th>
              </tr>
            </thead>
            {/* <tbody>
              {accusedAccounts[0].reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.reporter}</td>
                  <td>{report.reason}</td>
                  <td>{report.date}</td>
                  <td>{report.history}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </main>
      </div>
    </div>
  );
}; // đây là  hàm

export default ToCao;
