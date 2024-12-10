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
  Skeleton,
  Menu,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";

const UserManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState(2);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [status, setStatus] = useState(2);
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("admin/users", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sort: sortOrder,
          is_admin: role,
          status: status,
          name: searchValue,
        },
      });
      setUsers({
        data: res.data.data, // Mảng dữ liệu người dùng
        total: res.data.total, // Tổng số bản ghi
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [page, rowsPerPage, sortOrder, role, status, searchValue]);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const handleRoleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setStatusAnchorEl(null);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue(searchInput);
    }
  };

  const handleRefresh = () => {
    setPage(0);
    setRowsPerPage(10);
    setSearchInput("");
    setSearchValue("");
    setRole(2);
    setStatus(2);
    setSortOrder("desc");
  };

  const handleInfoClick = (user) => {
    console.log(user);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý người dùng
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          placeholder="Tìm kiếm người dùng..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearchKeyPress}
        />
        <Button
          variant="contained"
          onClick={handleRefresh}
          disabled={
            page === 0 &&
            rowsPerPage === 10 &&
            searchInput === "" &&
            status === 2 &&
            role === 2 &&
            sortOrder === "desc"
          }
        >
          <RefreshIcon />
        </Button>
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
              <TableCell
                onClick={handleStatusClick}
                style={{ cursor: "pointer" }}
              >
                Trạng thái <span>&#9660;</span>
              </TableCell>
              <TableCell
                onClick={handleRoleClick}
                style={{ cursor: "pointer" }}
              >
                Vai trò <span>&#9660;</span>
              </TableCell>
              <TableCell onClick={handleSort} style={{ cursor: "pointer" }}>
                Ngày tham gia{" "}
                {sortOrder === "desc" ? (
                  <span>&#9660;</span>
                ) : (
                  <span>&#9650;</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton width={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={70} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={70} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={120} />
                    </TableCell>
                  </TableRow>
                ))
              : users.data.map((user, index) => (
                  <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
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
                    <TableCell>
                      <IconButton onClick={() => handleInfoClick(user)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            setRole(2);
          }}
          selected={role === 2}
        >
          Tất cả
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setRole(1);
          }}
          selected={role === 1}
        >
          Quản trị
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setRole(0);
          }}
          selected={role === 0}
        >
          Người dùng
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleCloseStatus}
      >
        <MenuItem
          onClick={() => {
            handleCloseStatus();
            setStatus(2);
          }}
          selected={status === 2}
        >
          Tất cả
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseStatus();
            setStatus(0);
          }}
          selected={status === 0}
        >
          Hoạt động
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseStatus();
            setStatus(1);
          }}
          selected={status === 1}
        >
          Bị khóa
        </MenuItem>
      </Menu>

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
