import {
  Box,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PeopleAlt, Message, Report, TrendingUp } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7_days");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("admin/", {
        params: { time_filter: timeFilter },
      });
      setStats(res.data);
      console.log(res.data);
      
    } catch (error) {
      toast.error("Không thể tải dữ liệu thống kê!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [timeFilter]);

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  // Tạo dữ liệu biểu đồ
  const chartData = {
    labels: stats ? stats.dates : [], // Giả sử `stats.dates` là mảng ngày/tháng
    datasets: [
      {
        label: "Người dùng mới",
        data: stats ? stats.statistics.new_users : [],
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        borderColor: "#1976d2",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Tin nhắn mới",
        data: stats ? stats.statistics.new_messages : [],
        backgroundColor: "rgba(46, 125, 50, 0.2)",
        borderColor: "#2e7d32",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Báo cáo vi phạm",
        data: stats ? stats.statistics.new_reports : [],
        backgroundColor: "rgba(211, 47, 47, 0.2)",
        borderColor: "#d32f2f",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Bài viết mới",
        data: stats ? stats.statistics.new_posts : [],
        backgroundColor: "rgba(237, 108, 2, 0.2)",
        borderColor: "#ed6c02",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const summary = [
    {
      title: "Tổng người dùng mới",
      value: stats
        ? stats.statistics.new_users.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          )
        : "--",
      icon: <PeopleAlt />,
      color: "#1976d2",
    },
    {
      title: "Tin nhắn mới",
      value: stats
        ? stats.statistics.new_messages.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          )
        : "--",
      icon: <Message />,
      color: "#2e7d32",
    },
    {
      title: "Báo cáo vi phạm",
      value: stats
        ? stats.statistics.new_reports.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          )
        : "--",
      icon: <Report />,
      color: "#d32f2f",
    },
    {
      title: "Bài viết mới",
      value: stats
        ? stats.statistics.new_posts.reduce(
            (acc, currentValue) => acc + currentValue,
            0
          )
        : "--",
      icon: <TrendingUp />,
      color: "#ed6c02",
    },
  ];

  return (
    <Box
      sx={{
        marginTop: "60px",
        height: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tổng quan
      </Typography>

      <FormControl sx={{ mb: 4, minWidth: 200 }}>
        <InputLabel id="time-filter-label">Thời gian</InputLabel>
        <Select
          labelId="time-filter-label"
          value={timeFilter}
          onChange={handleTimeFilterChange}
        >
          <MenuItem value="7_days">7 ngày gần nhất</MenuItem>
          <MenuItem value="30_days">30 ngày gần nhất</MenuItem>
          <MenuItem value="3_months">3 tháng gần nhất</MenuItem>
          <MenuItem value="6_months">6 tháng gần nhất</MenuItem>
          <MenuItem value="1_year">1 năm gần nhất</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summary.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ color: stat.color }}>{stat.icon}</Box>
              <Box>
                <Typography color="text.secondary">{stat.title}</Typography>
                {loading ? (
                  <Skeleton variant="text" width={60} height={40} />
                ) : (
                  <Typography variant="h4">{stat.value}</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, height: 450 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Biểu đồ thống kê
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" height={300} />
        ) : (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
            height={300}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
