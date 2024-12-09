import { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

const UserManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState({ data: [], total: 0 });

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get("admin/users", {
        params: { page: page + 1, limit: rowsPerPage }, // API sử dụng page bắt đầu từ 1
      });
      setUsers({
        data: res.data.data, // Mảng dữ liệu người dùng
        total: res.data.total, // Tổng số bản ghi
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [page, rowsPerPage]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý người dùng
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Tìm kiếm người dùng..."
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflowY: "auto" }} // Bật cuộn nếu bảng dài hơn 500px
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Ngày tham gia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell># {user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.is_active === 0 ? "Hoạt động" : "Bị khóa"}
                    color={user.is_active === 0 ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.is_admin ? "Quản trị" : "Người dùng"}
                    color={user.is_admin ? "secondary" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={users.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default UserManagement;
