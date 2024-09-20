import className from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./main.scss";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
const Thongke = () => {
  return (
    <div className="container-tk mt-4">
      <div className="row">
        <div className="col">
          <div className="indicator blue"></div>
          <h3>34</h3>
          <p>Hôm Nay</p>
        </div>
        <div className="col">
          <div className="indicator orange"></div>
          <h3>120</h3>
          <p>Một Tuần Qua</p>
        </div>
        <div className="col">
          <div className="indicator green"></div>
          <h3>6353</h3>
          <p>Một Tháng Qua</p>
        </div>
      </div>

      <ChartContainer
        width={800}
        height={400}
        series={[{ type: "line", data: pData }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: "#8884d8",
            strokeWidth: 2,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: "#8884d8",
            scale: "0.6",
            fill: "#fff",
            strokeWidth: 2,
          },
        }}
        disableAxisListener
      >
        <LinePlot />
        <MarkPlot />
      </ChartContainer>
    </div>
  );
};

export default Thongke;
