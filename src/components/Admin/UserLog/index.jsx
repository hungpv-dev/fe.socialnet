import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/axios";
import {
  Skeleton,
  TextField,
  Box,
  Typography,
  Pagination,
} from "@mui/material";

const UserLog = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchActivityLog = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/admin/activity/log`, {
        params: {
          page,
          search: debouncedSearch,
        },
      });

      setActivityLog(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching activity log:", error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  useEffect(() => {
    fetchActivityLog();
  }, [page, debouncedSearch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <TextField
        label="Tìm kiếm tên người dùng"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          marginBottom: "20px",
          margin: "0 auto",
          textAlign: "center",
          width: "100%",
          marginTop: "50px",
          display: "block",
        }}
      />
      <Box
        sx={{
          width: "100%",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          height: "70vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={80}
              style={{ margin: "10px 0", borderRadius: "8px" }}
            />
            <Skeleton
              variant="rectangular"
              height={80}
              style={{ margin: "10px 0", borderRadius: "8px" }}
            />
          </>
        ) : (
          activityLog.map((log) => (
            <div
              key={log.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={log.properties.avatar || "/user_default.png"}
                alt="Avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div style={{ flex: 1 }}>
                <Typography variant="body1" align="left">
                  <strong>{log.properties.user}</strong> {log.description}{" "}
                  <strong>{log.properties.client}</strong>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="left"
                  style={{ marginTop: "5px" }}
                >
                  {new Date(log.created_at).toLocaleString()}
                </Typography>
              </div>
            </div>
          ))
        )}
      </Box>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ margin: "20px auto", display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default UserLog;
