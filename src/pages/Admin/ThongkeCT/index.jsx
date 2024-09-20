import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
// import { PieChart } from "@mui/x-charts";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./main.scss";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const cx = className.bind(styles);
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
const ThongkeCT = () => {
  return (
    <div className="main-content-1 flex-grow-1 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Click Summary</h1>
        {/* <button className="btn btn-primary">Download CSV</button> */}
      </div>
      <div className="chart-container-1">
        <div className="row d-flex">
          <div className=" col chart bg-light p-4">
            <h3 className="mb-2">Monthly</h3>
            <p className="mb-0 font-weight-bold">867,123k</p>
          </div>
          <div className=" col chart bg-light p-4">
            <h3 className="mb-2">Weekly</h3>
            <p className="mb-0 font-weight-bold">875,451</p>
          </div>

          <div className="col chart bg-light p-4">
            <h3 className="mb-2">Daily</h3>
            <p className="mb-0 font-weight-bold">65,000</p>
          </div>
          <div className="col btn-download">
            <button className="btn btn-primary btn-ownload ">Download</button>
          </div>
        </div>
      </div>

      <div>
        <LineChart
          width={1000}
          height={500}
          series={[{ data: uData, label: "uv", area: true, showMark: false }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ThongkeCT;
