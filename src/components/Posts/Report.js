import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, CircularProgress } from '@mui/material';
import axiosInstance from '@/axios';

const Report = ({ open, onClose, type, id }) => {
    const [reportText, setReportText] = useState('');
    const [reportType, setReportType] = useState('');
    const [reportTypes, setReportTypes] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('error');
    const [loading, setLoading] = useState(false);

    // Mapping cho tiêu đề dựa trên type
    const getTitleByType = () => {
        const titles = {
            post: 'Báo cáo bài viết',
            user: 'Báo cáo người dùng',
            comment: 'Báo cáo bình luận',
            story: 'Báo cáo tin',
            room: 'Báo cáo phòng chat',
            message: 'Báo cáo tin nhắn'
        };
        return titles[type] || 'Báo cáo';
    };

    useEffect(() => {
        const fetchReportTypes = async () => {
            try {
                const response = await axiosInstance.get('/reports/type');
                setReportTypes(response.data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách loại báo cáo:', error);
            }
        };

        if (open) {
            fetchReportTypes();
            // Reset form khi mở dialog
            setReportText('');
            setReportType('');
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!reportType) {
            setSnackbarMessage('Vui lòng chọn loại báo cáo');
            setSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/reports/add', {
                type: type,
                id: id,
                report_type: reportType,
                content: reportText
            });

            setSnackbarMessage('Gửi báo cáo thành công!');
            setSeverity('success');
            setOpenSnackbar(true);
            
            // Reset form và đóng dialog
            setReportText('');
            setReportType('');
            onClose();
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message || 'Có lỗi xảy ra khi gửi báo cáo');
            setSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Dialog 
                open={open} 
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        p: 2
                    }
                }}
            >
                <DialogTitle sx={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    pb: 1
                }}>
                    {getTitleByType()}
                </DialogTitle>
                <DialogContent sx={{ py: 2 }}>
                    <Typography 
                        variant="body1" 
                        gutterBottom 
                        sx={{ mb: 3, color: 'text.secondary' }}
                    >
                        Vui lòng chọn loại báo cáo và nhập lý do (nếu có):
                    </Typography>
                    <FormControl 
                        fullWidth 
                        sx={{ mb: 3 }}
                    >
                        <InputLabel id="report-type-label">Loại báo cáo</InputLabel>
                        <Select
                            labelId="report-type-label"
                            id="report-type"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            label="Loại báo cáo"
                            required
                            sx={{ minHeight: 45 }}
                        >
                            {reportTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="report-text"
                        label="Lý do báo cáo"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={onClose} 
                        variant="outlined"
                        sx={{ 
                            minWidth: 100,
                            mr: 1
                        }}
                        disabled={loading}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained"
                        sx={{ 
                            minWidth: 100,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            }
                        }}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Report;
