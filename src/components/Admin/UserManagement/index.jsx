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
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { setUser } from "@/actions/user";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatusToToggle, setCurrentStatusToToggle] = useState(null);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

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
          key: searchValue,
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
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleConfirmToggle = (userId, currentStatus) => {
    setIsUpdating(true);
    const confirmToast = toast(
      <div>
        <p>
          Bạn có chắc chắn muốn{" "}
          {currentStatusToToggle === 0 ? "khóa" : "mở khóa"} tài khoản này
          không?
        </p>
        <Button
          onClick={async () => {
            toast.dismiss(confirmToast);
            setIsUpdating(true);

            setIsUpdating(true);
            try {
              await toast.promise(
                axiosInstance.put(`admin/users/${userId}`, {
                  is_active: currentStatusToToggle === 0 ? 1 : 0,
                }),
                {
                  pending: "Đang cập nhật trạng thái...",
                  success: "Cập nhật thành công!",
                  error: "Cập nhật thất bại!",
                }
              );

              setUser((prevUsers) => ({
                ...prevUsers,
                data: prevUsers.data.map((user) =>
                  user.id === userId
                    ? { ...user, is_active: currentStatus === 0 ? 1 : 0 }
                    : user
                ),
              }));
            } catch (error) {
              console.error("Lỗi khi thay đổi trạng thái người dùng:", error);
            } finally {
              setIsUpdating(false);
              toast.dismiss(confirmToast); // Đóng toast xác nhận
            }
          }}
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": {
              backgroundColor: "success.dark",
            },
            marginRight: "5px",
          }}
          disabled={isUpdating}
        >
          Xác nhận
        </Button>
        <Button
          onClick={() => {
            toast.dismiss(confirmToast);
            setIsUpdating(false);
          }}
          sx={{
            backgroundColor: "error.main",
            color: "white",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
          disabled={isUpdating}
        >
          Hủy
        </Button>
      </div>,
      {
        autoClose: 3000,
        closeOnClick: false,
        draggable: false,
        onClose: () => setIsUpdating(false),
      }
    );
  };

  const handleToggleAdminStatus = (userId, currentStatus) => {
    setIsConfirmDisabled(true);
    const confirmToast = toast(
      <div>
        <p>
          Bạn có chắc chắn muốn {currentStatus === false ? "thêm" : "gỡ"} quyền
          quản trị của người dùng này không?
        </p>
        <Button
          onClick={async () => {
            toast.dismiss(confirmToast);
            setIsConfirmDisabled(true);
            try {
              await toast.promise(
                axiosInstance.put(`admin/users/${userId}`, {
                  is_admin: !currentStatus,
                }),
                {
                  pending: "Đang cập nhật quyền quản trị...",
                  success: "Cập nhật quyền quản trị thành công!",
                  error: "Cập nhật quyền quản trị thất bại!",
                }
              );

              // Cập nhật dữ liệu người dùng trong state
              setUser((prevUsers) => ({
                ...prevUsers,
                data: prevUsers.data.map((user) =>
                  user.id === userId
                    ? {
                        ...user,
                        is_active: currentStatus === false ? true : false,
                      }
                    : user
                ),
              }));
            } catch (error) {
              console.error("Lỗi khi thay đổi quyền quản trị:", error);
            } finally {
              setIsConfirmDisabled(false);
            }
          }}
          sx={{
            backgroundColor: "success.main",
            color: "white",
            "&:hover": {
              backgroundColor: "success.dark",
            },
            marginRight: "5px",
          }}
        >
          Xác nhận
        </Button>
        <Button
          onClick={() => {
            toast.dismiss(confirmToast);
            setIsConfirmDisabled(false);
          }}
          sx={{
            backgroundColor: "error.main",
            color: "white",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          Hủy
        </Button>
      </div>,
      {
        autoClose: 5000, // Tự động đóng sau 5 giây
        closeOnClick: false,
        draggable: false,
        onClose: () => setIsConfirmDisabled(false),
      }
    );
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
                Ngày đăng ký{" "}
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
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: { width: "500px", minHeight: "600px", position: "relative" },
        }}
      >
        <DialogContent sx={{ padding: 0, textAlign: "left" }}>
          {console.log(selectedUser)}
          {selectedUser && (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Ảnh bìa */}
              <img
                src={selectedUser.cover_avatar || "/cover_default.png"} // Thay thế bằng đường dẫn ảnh bìa
                alt="Cover"
                style={{ width: "100%", height: "200px", borderRadius: "8px" }} // Chiều rộng 100% và chiều cao 200px
              />
              {/* Ảnh đại diện hình tròn */}
              <img
                src={selectedUser.avatar || "/user_default.png"} // Thay thế bằng đường dẫn ảnh đại diện
                alt="Avatar"
                style={{
                  position: "absolute",
                  top: "220px", // Điều chỉnh vị trí để nửa trên nằm trong ảnh bìa
                  left: "100px",
                  transform: "translate(-50%, -50%)",
                  width: "100px", // Chiều rộng của ảnh đại diện
                  height: "100px", // Chiều cao của ảnh đại diện
                  borderRadius: "50%", // Hình tròn
                  border: "2px solid white", // Đường viền trắng
                  // marginRight: "50px", // Cách lề phải 50px
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "230px", // Điều chỉnh vị trí để nửa trên nằm trong ảnh bìa
                  left: "260px",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Typography variant="h6">
                  <strong>{selectedUser.name}</strong>
                </Typography>
              </div>
            </div>
          )}
          {selectedUser && (
            <div
              style={{ textAlign: "left", padding: "20px", marginTop: "60px" }}
            >
              {selectedUser.email && (
                <Typography variant="body1">
                  Email: <b>{selectedUser.email}</b>
                </Typography>
              )}
              {selectedUser.phone && (
                <Typography variant="body1">
                  Số điện thoại: <b>{selectedUser.phone}</b>
                </Typography>
              )}
              {selectedUser.time_offline && (
                <Typography variant="body1">
                  Thời gian ngoại tuyến: <b>{selectedUser.time_offline}</b>
                </Typography>
              )}
              {selectedUser.address && (
                <Typography variant="body1">
                  Địa chỉ: <b>{selectedUser.address}</b>
                </Typography>
              )}
              {selectedUser.hometown && (
                <Typography variant="body1">
                  Quê quán: <b>{selectedUser.hometown}</b>
                </Typography>
              )}
              {selectedUser.gender && (
                <Typography variant="body1">
                  Giới tính:{" "}
                  <b>{selectedUser.gender === "male" ? "Nam" : "Nữ"}</b>
                </Typography>
              )}
              {selectedUser.birthday && (
                <Typography variant="body1">
                  Ngày sinh:{" "}
                  <b>
                    {new Date(selectedUser.birthday).toLocaleDateString(
                      "vi-VN"
                    )}
                  </b>
                </Typography>
              )}
              {selectedUser.relationship && (
                <Typography variant="body1">
                  Mối quan hệ:{" "}
                  <b>
                    {
                      {
                        single: "Độc thân",
                        married: "Đã kết hôn",
                        divorced: "Đã ly hôn",
                        widowed: "Góa bụa",
                      }[selectedUser.relationship]
                    }
                  </b>
                </Typography>
              )}
              {selectedUser.follower !== undefined && (
                <Typography variant="body1">
                  Người theo dõi: <b>{selectedUser.follower}</b>
                </Typography>
              )}
              {selectedUser.friend_counts !== undefined && (
                <Typography variant="body1">
                  Số bạn bè: <b>{selectedUser.friend_counts}</b>
                </Typography>
              )}
              {selectedUser.is_admin !== undefined && (
                <Typography variant="body1">
                  Vai trò:{" "}
                  <Chip
                    label={selectedUser.is_admin ? "Quản trị" : "Người dùng"}
                    color={selectedUser.is_admin ? "secondary" : "warning"}
                    size="small"
                  />
                </Typography>
              )}
              {selectedUser.is_active !== undefined && (
                <Typography variant="body1">
                  Trạng thái:{" "}
                  <Chip
                    label={
                      selectedUser.is_active === 0 ? "Hoạt động" : "Bị khóa"
                    }
                    color={selectedUser.is_active === 0 ? "success" : "error"}
                    size="small"
                  />
                </Typography>
              )}
              {selectedUser.is_online !== undefined && (
                <Typography variant="body1">
                  Trực tuyến:{" "}
                  <Chip
                    label={selectedUser.is_online ? "Có" : "Không"}
                    color={selectedUser.is_online ? "success" : "error"}
                    size="small"
                  />
                </Typography>
              )}
              {selectedUser.created_at && (
                <Typography variant="body1">
                  Thời gian đăng ký:{" "}
                  <b>
                    {new Date(selectedUser.created_at)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </b>
                </Typography>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color={
              selectedUser && selectedUser.is_admin === false
                ? "secondary"
                : "warning"
            }
            onClick={() => {
              if (selectedUser) {
                handleToggleAdminStatus(selectedUser.id, selectedUser.is_admin);
              }
            }}
            disabled={isConfirmDisabled}
          >
            {selectedUser && selectedUser.is_admin === false
              ? "Cấp quyền quản trị"
              : "Gỡ quyền quản trị"}
          </Button>
          <Button
            variant="contained"
            color={
              selectedUser && selectedUser.is_active === 0 ? "error" : "success"
            }
            onClick={() => {
              if (selectedUser) {
                handleConfirmToggle(selectedUser.id, selectedUser.is_active);
              }
            }}
            disabled={isUpdating}
          >
            {selectedUser && selectedUser.is_active === 0
              ? "Khóa tài khoản"
              : "Mở khóa tài khoản"}
          </Button>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
