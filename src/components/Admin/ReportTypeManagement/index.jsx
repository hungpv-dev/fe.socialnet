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
} from "@mui/material";
import { toast } from "react-toastify";

const ReportTypeManagement = () => {
  const [reportType, setReportType] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const fetchReportType = async () => {
    try {
      const res = await axiosInstance.get("admin/reports/type");
      setReportType(res.data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu kiểu báo cáo!");
    }
  };

  useEffect(() => {
    fetchReportType();
  }, []);

  const handleDoubleClick = (id, name) => {
    setEditableId(id);
    setEditedName(name);
  };

  const handleUpdate = async (id) => {
    let response = await toast.promise(
      axiosInstance.post(`admin/reports/type/${id}`, {
        name: editedName,
        _method: "PUT",
      }),
      {
        pending: "Đang xử lý...",
        success: "Cập nhật thành công!",
        error: "Cập nhật thất bại!",
      }
    );
    // if (response.status === 200) {

    // }

    setEditableId(null);
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

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý kiểu báo cáo
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflowY: "auto" }}
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
            {reportType.map((type, index) => (
              <TableRow key={type.id}>
                <TableCell sx={{ width: 150 }}>{index + 1}</TableCell>
                <TableCell sx={{ width: 150 }}># {type.id}</TableCell>
                <TableCell
                  onDoubleClick={() => handleDoubleClick(type.id, type.name)}
                >
                  {editableId === type.id ? (
                    <TextField
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      fullWidth
                    />
                  ) : (
                    type.name
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportTypeManagement;
