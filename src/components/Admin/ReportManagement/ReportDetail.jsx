import React, { useState } from 'react';
import { Button, Snackbar, Box, Typography, Divider, Chip, Alert } from '@mui/material';

const ReportDetail = ({ report, handleReport, isUpdating }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderMedia = (data) => {
        if (!data || (!data.image?.length && !data.video?.length)) return null;

        return (
            <Box sx={{ mt: 2, mb: 2 }}>
                {data.image?.map((img, index) => (
                    <img key={index} src={img} alt={`Hình ảnh ${index + 1}`} style={{ maxWidth: "100%", borderRadius: "8px" }} />
                ))}
                {data.video?.map((video, index) => (
                    <Box key={index} sx={{ position: 'relative', height: '400px', borderRadius: '8px', overflow: 'hidden', bgcolor: '#000', mt: 2 }}>
                        <video controls style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                            <source src={video} type="video/mp4" />
                        </video>
                    </Box>
                ))}
            </Box>
        );
    };

    return (
        <>
            <Box display="flex" sx={{ width: '800px' }}>
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
                            src={report?.user?.avatar || "/user_default.png"}
                            alt="Avatar"
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                marginBottom: 10,
                            }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}>
                            {report?.user?.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            <b>{report?.user?.email}</b>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            Có <b>{report?.user?.follower}</b> lượt theo dõi
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            Có <b>{report?.user?.friend_counts}</b> bạn bè
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            Đến từ <b>{report?.user?.hometown}</b>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            Sống tại <b>{report?.user?.hometown}</b>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
                            Đăng kí vào{" "}
                            <b>
                                {new Date(report?.user?.created_at).toLocaleString("vi-VN", {
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
                    <Divider orientation="vertical" flexItem sx={{ my: 2, width: "100%", borderColor: "black", borderWidth: 1 }} />
                    <Typography variant="body1">Kiểu báo cáo: <b>{report?.report_type.name}</b></Typography>
                    <Typography variant="body1">Nội dung: <b>{report?.content}</b></Typography>
                    <Typography variant="body1">Trạng thái: 
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
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: "black", borderWidth: 1 }} />
                <Box flex={1} sx={{ marginLeft: 1, overflowY: "auto", maxHeight: "400px", "&::-webkit-scrollbar": { display: "none" } }}>
                    <Typography variant="h6">Nội dung bài viết bị báo cáo:</Typography>
                    {report?.reportable ? (
                        <>
                            <Typography variant="body1">
                                Nội dung: <b>{report?.reportable.content}</b>
                            </Typography>
                            {report?.reportable.data && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    {(() => {
                                        const parsedData = typeof report?.reportable.data === 'string' 
                                            ? JSON.parse(report?.reportable.data) 
                                            : report?.reportable.data;

                                        return renderMedia(parsedData);
                                    })()}
                                </Box>
                            )}
                        </>
                    ) : (
                        <Alert severity="error">
                            Bài viết đã bị xóa.
                        </Alert>
                    )}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                {report?.reportable ? (
                    <>
                        <Button
                            onClick={() => handleReport(report?.id, "approved")}
                            sx={{
                                backgroundColor: "success.main",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "success.dark",
                                },
                                cursor: isUpdating || report?.status !== "pending" ? "not-allowed" : "pointer",
                            }}
                            disabled={isUpdating || report?.status !== "pending"}
                        >
                            Chấp nhận
                        </Button>
                        <Button
                            onClick={() => handleReport(report?.id, "declined")}
                            sx={{
                                backgroundColor: "error.main",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "error.dark",
                                },
                                cursor: isUpdating || report?.status !== "pending" ? "not-allowed" : "pointer",
                            }}
                            disabled={isUpdating || report?.status !== "pending"}
                        >
                            Từ chối
                        </Button>
                    </>
                ) : null}
            </Box>
            {/* <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Bạn đã nhấn nút!"
            /> */}
        </>
    );
};

export default ReportDetail;
