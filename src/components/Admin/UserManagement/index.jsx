import { useState } from 'react';
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
  Chip
} from '@mui/material';

const UserManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data - thay thế bằng API thực tế
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      status: 'active',
      role: 'user',
      joinDate: '2024-01-01'
    },
    // Thêm dữ liệu người dùng khác
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Quản lý người dùng</Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Tìm kiếm người dùng..."
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Ngày tham gia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    color={user.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;