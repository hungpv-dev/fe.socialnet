import React, { useEffect, useState } from "react";
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress, Avatar, Paper } from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "@/axios"; // Bạn có thể thay thế bằng axios instance của bạn.

const BlockedUsersList = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  // Hàm fetch danh sách người dùng bị chặn với phân trang
  const fetchBlockedUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/blocks?page=${page}`);
      if (response.status === 200) {
        setBlockedUsers(response.data.data); // Cập nhật danh sách người dùng bị chặn
        setPagination({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          total: response.data.total,
        });
      } else {
        toast.error("Không thể lấy danh sách người dùng bị chặn!");
      }
    } catch (error) {
      toast.error(`Lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hàm bỏ chặn người dùng
  const handleUnblockUser = async (id) => {
    try {
      const response = await axiosInstance.delete(`/blocks/${id}`);
      if (response.status === 200) {
        toast.success("Đã bỏ chặn người dùng!");
        // Cập nhật lại danh sách sau khi bỏ chặn
        setBlockedUsers((prev) => prev.filter((user) => user.user_is_blocked.id !== id));
      } else {
        toast.error("Không thể bỏ chặn người dùng!");
      }
    } catch (error) {
      toast.error(`Lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    }
  };

  // Gọi fetchBlockedUsers khi component được mount
  useEffect(() => {
    fetchBlockedUsers(pagination.currentPage);
  }, [pagination.currentPage]);

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <div style={{ width: "80%", maxWidth: "600px", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        
        {/* Tiêu đề */}
        <Typography variant="h5" gutterBottom>
          Danh sách người dùng bị chặn
        </Typography>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : blockedUsers.length === 0 ? (
          <Typography align="center">Không có người dùng nào bị chặn.</Typography>
        ) : (
          <List>
            {blockedUsers.map((user) => (
              <ListItem key={user.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                
                {/* Avatar người dùng */}
                <Avatar
                  src={user.user_is_blocked.avatar || ""}
                  alt={user.user_is_blocked.name || "A"}
                  sx={{ width: 40, height: 40, marginRight: 10 }}
                >
                  {user.user_is_blocked.name ? user.user_is_blocked.name[0] : "A"}
                </Avatar>

                <ListItemText
                  primary={
                    <a href={`/profile/${user.user_is_blocked.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#3f51b5" }}>
                      {user.user_is_blocked.name || "Người dùng ẩn danh"}
                    </a>
                  }
                  secondary={`ID: ${user.user_is_blocked.id}`}
                />
                
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUnblockUser(user.user_is_blocked.id)}
                  >
                    Bỏ chặn
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {/* Phân trang */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            disabled={pagination.currentPage === 1}
            onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          >
            Previous
          </Button>
          <Typography style={{ margin: "0 10px" }}>
            Trang {pagination.currentPage} / {pagination.lastPage}
          </Typography>
          <Button
            variant="outlined"
            disabled={pagination.currentPage === pagination.lastPage}
            onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsersList;
