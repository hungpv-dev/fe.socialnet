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
  TableRow,
  Typography,
  TextField,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";

const ReportTypeManagement = () => {
  const [reportType, setReportType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableId, setEditableId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [originalName, setOriginalName] = useState(""); // State để lưu tên ban đầu khi chỉnh sửa

  const fetchReportType = async () => {
    try {
      const res = await axiosInstance.get("admin/reports/type");
      setReportType(res.data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu kiểu báo cáo!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportType();
  }, []);

  const handleDoubleClick = (id, name) => {
    setEditableId(id);
    setEditedName(name);
    setOriginalName(name); // Lưu lại tên ban đầu khi bắt đầu chỉnh sửa
  };

  const handleUpdate = async (id) => {
    // Kiểm tra nếu tên đã thay đổi
    if (editedName !== originalName) {
      // Nếu id là chuỗi và bắt đầu bằng 'placeholder'
      if (typeof id === "string" && id.startsWith("placeholder")) {
        await toast.promise(
          axiosInstance.post("admin/reports/type", {
            type: editedName,
          }),
          {
            pending: "Đang thêm mới...",
            success: "Thêm mới thành công!",
            error: "Thêm mới thất bại!",
          }
        );
      } else {
        // Cập nhật dữ liệu đã có
        await toast.promise(
          axiosInstance.post(`admin/reports/type/${id}`, {
            type: editedName,
            _method: "PUT",
          }),
          {
            pending: "Đang xử lý...",
            success: "Cập nhật thành công!",
            error: "Cập nhật thất bại!",
          }
        );
      }
      fetchReportType(); // Tải lại dữ liệu sau khi cập nhật hoặc thêm mới
    } else {
      toast.info("Không có thay đổi nào để cập nhật");
    }
    setEditableId(null);
    setOriginalName(""); // Reset tên ban đầu sau khi xử lý
  };

  const handleBlur = () => {
    if (editableId) {
      handleUpdate(editableId);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && editableId) {
      handleUpdate(editableId);
    }
  };

  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <TableRow key={`skeleton-${index}`}>
      <TableCell sx={{ width: 150 }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell sx={{ width: 150 }}>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="80%" />
      </TableCell>
    </TableRow>
  ));

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý kiểu báo cáo
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "75vh", overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}>STT</TableCell>
              <TableCell sx={{ width: 150 }}>ID</TableCell>
              <TableCell>Tiêu đề</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? skeletonRows // Hiển thị skeleton khi đang tải dữ liệu
              : reportType.map((type, index) => (
                  <TableRow key={type.id}>
                    <TableCell sx={{ width: 150 }}>{index + 1}</TableCell>
                    <TableCell sx={{ width: 150 }}># {type.id}</TableCell>
                    <TableCell>
                      <TextField
                        value={editableId !== type.id ? type.name : editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus={editableId === type.id}
                        aria-readonly={editableId !== type.id}
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border:
                                editableId === type.id
                                  ? "1px solid #1976d2"
                                  : "none", // Thêm viền khi chỉnh sửa
                            },
                            fontSize: "0.875rem",
                            padding: "4px 8px",
                            cursor: editableId === type.id ? "text" : "pointer",
                          },
                        }}
                        onDoubleClick={() =>
                          editableId !== type.id &&
                          handleDoubleClick(type.id, type.name)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            {/* Hàng trống để bổ sung đủ 10 hàng */}
            {!loading &&
              Array.from({ length: 10 - reportType.length }).map((_, index) => {
                const placeholderId = `placeholder-${index}`; // Tạo ID giả cho hàng trống
                return (
                  <TableRow key={placeholderId}>
                    <TableCell sx={{ width: 150 }}>
                      {reportType.length + index + 1}
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>
                      # {reportType.length + index + 1}
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editableId !== placeholderId ? "" : editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus={editableId === placeholderId}
                        disabled={editableId !== placeholderId}
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "1px solid #1976d2",
                            },
                            fontSize: "0.875rem",
                            padding: "4px 8px",
                            cursor:
                              editableId === placeholderId ? "text" : "pointer",
                          },
                        }}
                        onDoubleClick={() =>
                          editableId !== placeholderId &&
                          handleDoubleClick(placeholderId, "")
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportTypeManagement;
