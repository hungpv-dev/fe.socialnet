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
  Popover,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ReportManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reports, setReports] = useState([]);
  const [reportType, setReportType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedReportType, setSelectedReportType] = useState(0);
  const [reportTypesMenuAnchorEl, setReportTypesMenuAnchorEl] = useState(null);
  const [reportByUser, setReportByUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHandle, setIsHandle] = useState(false);

  const handleRefresh = () => {
    setPage(0);
    setRowsPerPage(10);
    setReportByUser("");
    setSelectedStatus("all");
    setSelectedReportType(0);
    setSortOrder("desc");
    setSearchInput("");
  };

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("admin/reports", {
        params: {
          page: page + 1,
          paginate: rowsPerPage,
          sort: sortOrder,
          status: selectedStatus,
          report_type: selectedReportType,
          user: reportByUser,
        },
      });
      setReports(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu báo cáo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [
    page,
    rowsPerPage,
    sortOrder,
    selectedStatus,
    selectedReportType,
    reportByUser,
  ]);

  const fetchReportType = async () => {
    const res = await axiosInstance.get("admin/reports/type");
    setReportType(res.data);
  };

  useEffect(() => {
    fetchReportType();
  }, []);

  const handleMouseEnter = (event, user) => {
    setAnchorEl(event.currentTarget);
    setHoveredUser(user);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setHoveredUser(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null); // Đóng menu
  };

  const handleClickOutside = (event) => {
    if (menuAnchorEl && !menuAnchorEl.contains(event.target)) {
      setMenuAnchorEl(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuAnchorEl]);

  const handleReportTypesMenuClick = (event) => {
    setReportTypesMenuAnchorEl(event.currentTarget);
  };

  const handleReportTypesMenuClose = () => {
    setReportTypesMenuAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const openMenu = Boolean(menuAnchorEl);

  const handleInfoClick = (report) => {
    setSelectedReport(report);
  };

  const handleClosePopup = () => {
    setSelectedReport(null);
  };

  const handleReport = async (id, status) => {
    setIsUpdating(true);
    const confirmToast = toast(
      <div>
        <p>
          Bạn có chắc chắn muốn{" "}
          {status === "approved" ? "chấp nhận" : "từ chối"} báo cáo này không?
          {status === "approved" && (
            <>
              <br />
              <span style={{ color: "red" }}>
                Đồng nghĩa với việc ẩn bài viết!
              </span>
            </>
          )}
        </p>
        <Button
          onClick={() => {
            handleConfirm(id, status);
            toast.dismiss(confirmToast);
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
          onClick={() => toast.dismiss(confirmToast)}
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
        autoClose: 5000,
        closeOnClick: false,
        draggable: false,
      }
    );

    try {
      await axiosInstance.put(`admin/reports/${id}`, {
        status,
      });
      setReports((prevReports) => ({
        ...prevReports,
        data: prevReports.data.map((report) =>
          report.id === id ? { ...report, status } : report
        ),
      }));
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái báo cáo:", error);
    } finally {
      setIsUpdating(false);
      handleClosePopup();
    }
  };

  console.log(reports);

  const handleConfirm = async (id, status) => {
    const promise = axiosInstance.put(`admin/reports/${id}`, {
      status,
    });

    toast.promise(promise, {
      pending: "Đang cập nhật trạng thái báo cáo...",
      success: {
        render({ data }) {
          return data.data.message; // Hiển thị thông báo thành công
        },
      },
      error: {
        render({ data }) {
          return data.data.message; // Hiển thị thông báo lỗi
        },
      },
    });

    try {
      const res = await promise;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái báo cáo:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý báo cáo
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          placeholder="Tìm kiếm người dùng..."
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          fullWidth
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value !== reportByUser) {
              setReportByUser(e.target.value);
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleRefresh}
          disabled={
            page === 0 &&
            rowsPerPage === 10 &&
            reportByUser === "" &&
            selectedStatus === "all" &&
            selectedReportType === 0 &&
            sortOrder === "desc"
          }
        >
          <RefreshIcon />
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.light" }}>
              <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Người gửi</TableCell>
              <TableCell
                onClick={handleReportTypesMenuClick}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Kiểu báo cáo<span>&#9660;</span>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nội dung</TableCell>
              <TableCell
                onClick={handleMenuClick}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Trạng thái <span>&#9660;</span>
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  setSortOrder((prevSortOrder) =>
                    prevSortOrder === "desc" ? "asc" : "desc"
                  );
                }}
              >
                Ngày tạo
                {sortOrder === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={150} />
                    </TableCell>
                  </TableRow>
                ))
              : Array.isArray(reports.data) &&
                reports.data.map((report, index) => (
                  <TableRow
                    key={report.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "grey.100" },
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell># {report.id}</TableCell>
                    <TableCell
                      onMouseEnter={(e) => handleMouseEnter(e, report.user)}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        fontWeight: 600,
                        color: "black",
                        textDecoration: "none",
                        width: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {report.user.name}
                    </TableCell>
                    <TableCell>{report.report_type.name}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        "&:hover span": {
                          textDecoration: "underline", // Thêm gạch chân khi hover
                        },
                      }}
                    >
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "1rem", maxWidth: "300px" }}
                          >
                            {report.content}
                          </Typography>
                        }
                        arrow
                      >
                        <span>{report.content}</span>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          report.status === "approved"
                            ? "Chấp nhận"
                            : report.status === "declined"
                            ? "Từ chối"
                            : "Đang chờ"
                        }
                        color={
                          report.status === "approved"
                            ? "success"
                            : report.status === "declined"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(report.created_at).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleInfoClick(report)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ pointerEvents: "none" }}
      >
        {hoveredUser && (
          <Box
            p={2}
            sx={{
              maxWidth: 300,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={hoveredUser.avatar || "/user_default.png"}
              alt="Avatar"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                marginBottom: 10,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {hoveredUser.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>{hoveredUser.email}</b>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Có <b>{hoveredUser.follower}</b> lượt theo dõi
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Có <b>{hoveredUser.friend_counts}</b> bạn bè
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Đến từ <b>{hoveredUser.hometown}</b>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Sống tại <b>{hoveredUser.hometown}</b>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Đăng kí vào{" "}
              <b>
                {new Date(hoveredUser.created_at).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </b>
            </Typography>
          </Box>
        )}
      </Popover>

      <Menu anchorEl={menuAnchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setSelectedStatus("all");
          }}
          selected={selectedStatus === "all"}
        >
          Tất cả
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setSelectedStatus("approved");
          }}
          selected={selectedStatus === "approved"}
        >
          Chấp nhận
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setSelectedStatus("declined");
          }}
          selected={selectedStatus === "declined"}
        >
          Từ chối
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setSelectedStatus("pending");
          }}
          selected={selectedStatus === "pending"}
        >
          Đang chờ
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={reportTypesMenuAnchorEl}
        open={Boolean(reportTypesMenuAnchorEl)}
        onClose={handleReportTypesMenuClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            overflowY: "auto",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleReportTypesMenuClose();
            setSelectedReportType(0);
          }}
        >
          Tất cả
        </MenuItem>
        {reportType.map((type) => (
          <MenuItem
            key={type.id}
            onClick={() => {
              handleReportTypesMenuClose();
              setSelectedReportType(type.id);
            }}
          >
            {type.name}
          </MenuItem>
        ))}
      </Menu>

      <TablePagination
        component="div"
        count={reports.total}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />

      {selectedReport && (
        <Dialog
          open={Boolean(selectedReport)}
          onClose={handleClosePopup}
          maxWidth="md"
        >
          <DialogTitle>Thông tin báo cáo</DialogTitle>
          <DialogContent>
            <Box display="flex">
              <Box
                flex={1}
                sx={{
                  paddingRight: 2,
                  marginRight: 1,
                  overflowY: "auto",
                  maxHeight: "400px",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Typography variant="h6">Người gửi:</Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    src={selectedReport.user.avatar || "/user_default.png"}
                    alt="Avatar"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      marginBottom: 10,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
                  >
                    {selectedReport.user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    <b>{selectedReport.user.email}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    Có <b>{selectedReport.user.follower}</b> lượt theo dõi
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    Có <b>{selectedReport.user.friend_counts}</b> bạn bè
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    Đến từ <b>{selectedReport.user.hometown}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    Sống tại <b>{selectedReport.user.hometown}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textAlign: "center" }}
                  >
                    Đăng kí vào{" "}
                    <b>
                      {new Date(selectedReport.user.created_at).toLocaleString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }
                      )}
                    </b>
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    my: 2,
                    width: "100%",
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                />
                <Typography variant="body1">
                  Kiểu báo cáo: <b>{selectedReport.report_type.name}</b>
                </Typography>
                <Typography variant="body1">
                  Nội dung: <b>{selectedReport.content}</b>
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "black", borderWidth: 1 }}
              />
              <Box
                flex={1}
                sx={{
                  marginLeft: 1,
                  overflowY: "auto",
                  maxHeight: "400px",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Typography variant="h6">
                  Nội dung bài viết bị báo cáo:
                </Typography>
                <Typography variant="body1">
                  Tạo lúc:{" "}
                  <b>
                    {new Date(
                      selectedReport.reportable.created_at
                    ).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </b>{" "}
                  •{" "}
                  <b>
                    {selectedReport.reportable.status === "public"
                      ? "Công khai"
                      : selectedReport.reportable.status === "friend"
                      ? "Bạn bè"
                      : "Riêng tư"}
                  </b>
                  {selectedReport.reportable.is_active === 0 && (
                    <span sx={{ color: "red" }}> • Đã bị ẩn</span>
                  )}
                </Typography>
                {selectedReport.reportable.content && (
                  <Typography variant="body1">
                    {selectedReport.reportable.content}
                  </Typography>
                )}
                {selectedReport.reportable.data && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {(() => {
                      const parsedData = JSON.parse(
                        selectedReport.reportable.data
                      );
                      const images = parsedData.images.split(",");
                      return images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "100%", borderRadius: "8px" }}
                        />
                      ));
                    })()}
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleReport(selectedReport.id, "approved")}
              sx={{
                backgroundColor: "success.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "success.dark",
                },
                cursor:
                  isUpdating || selectedReport.status !== "pending"
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={isUpdating || selectedReport.status !== "pending"}
            >
              Chấp nhận
            </Button>
            <Button
              onClick={() => handleReport(selectedReport.id, "declined")}
              sx={{
                backgroundColor: "error.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
                cursor:
                  isUpdating || selectedReport.status !== "pending"
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={isUpdating || selectedReport.status !== "pending"}
            >
              Từ chối
            </Button>
            <IconButton
              onClick={handleClosePopup}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ReportManagement;
