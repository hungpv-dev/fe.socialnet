import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import {
    Close as CloseIcon,
    AddPhotoAlternate as AddPhotoIcon,
    Public,
    Lock,
    People,
    ContentPaste,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';

const CreateStory = ({ open,stories,  setStories, onClose }) => {
    const [data, setData] = useState(null);
    const [privacy, setPrivacy] = useState('public');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (open) {
            setPageLoading(true);
            setTimeout(() => {
                setPageLoading(false);
            }, 500);
        }
    }, [open]);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleMediaSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData(file);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handlePaste = (event) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                setData(file);
                event.preventDefault();
                break;
            }
        }
    };

    const handlePasteImage = async () => {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                for (const type of item.types) {
                    if (type.startsWith('image/')) {
                        const blob = await item.getType(type);
                        const file = new File([blob], "pasted-image.png", { type });
                        setData(file);
                        return;
                    }
                }
            }
            toast.warning('Không tìm thấy ảnh trong clipboard!');
        } catch (err) {
            toast.error('Không thể dán ảnh từ clipboard');
        }
    };

    const handleSubmit = async () => {
        
        // Kiểm tra kích thước file
        if (data.size > 30 * 1024 * 1024) { // 10MB
            toast.error('File không được vượt quá 10MB');
            return;
        }

        // Kiểm tra định dạng file
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
        if (!allowedTypes.includes(data.type)) {
            toast.error('Định dạng file không được hỗ trợ');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('status', privacy);
        formData.append('data', data);
    
        try {
            let response = await toast.promise(
                axiosInstance.post('story', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }),
                {
                    pending: 'Đang xử lý...',
                    success: 'Thêm mới tin thành công👌',
                    error: 'Thêm tin thất bại 🤯'
                }
            );
            if(response.status === 201){
                let data = response.data.data;
                const filteredStories = stories.filter(story => story.id !== data.id);
                setStories([data, ...filteredStories]);
            }
            onClose();
        } catch (error) {
            console.error('Lỗi khi tạo tin:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearMedia = () => {
        setData(null);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    const renderContent = () => {
        return (
            <Box sx={{ width: '100%' }}>
                {data ? (
                    <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
                        {data.type.startsWith('image/') ? (
                            <Box
                                component="img"
                                src={URL.createObjectURL(data)}
                                sx={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <video
                                src={URL.createObjectURL(data)}
                                controls
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                        <IconButton
                            onClick={handleClearMedia}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.7)',
                                },
                            }}
                        >
                            <CloseIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minHeight: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #ccc',
                            borderRadius: 1,
                            mb: 2,
                            bgcolor: '#f5f5f5',
                            padding: '16px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                            Tạo tin mới
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<AddPhotoIcon />}
                                sx={{ 
                                    bgcolor: '#1877f2',
                                    '&:hover': { bgcolor: '#166fe5' }
                                }}
                            >
                                Chọn ảnh/video
                                <input
                                    accept="image/*,video/*"
                                    type="file"
                                    onChange={handleMediaSelect}
                                    style={{ display: 'none' }}
                                />
                            </Button>
                            
                            {/* <Button
                                variant="contained"
                                onClick={handlePasteImage}
                                startIcon={<ContentPaste />}
                                sx={{ 
                                    bgcolor: '#1877f2',
                                    '&:hover': { bgcolor: '#166fe5' }
                                }}
                            >
                                Dán ảnh
                            </Button> */}
                        </Box>
                        
                        <Typography color="text.secondary" variant="body2">
                            {/* hoặc dán ảnh trực tiếp bằng Ctrl+V */}
                        </Typography>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
            onPaste={handlePaste}
        >
            {pageLoading ? (
                <DialogContent sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '400px'
                }}>
                    <CircularProgress />
                </DialogContent>
            ) : (
                <>
                    <DialogTitle sx={{ m: 0, p: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="h6" component="div">
                            Tạo tin mới
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Select
                                    value={privacy}
                                    onChange={(e) => setPrivacy(e.target.value)}
                                    size="small"
                                >
                                    <MenuItem value="public">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Public /> Công khai
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="friend">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <People /> Bạn bè
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="private">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Lock /> Chỉ mình tôi
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            {renderContent()}
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Button 
                            onClick={onClose} 
                            color="inherit"
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={!data || loading}
                            startIcon={loading && <CircularProgress size={20} color="inherit" />}
                            sx={{ 
                                minWidth: 100,
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                }
                            }}
                        >
                            {loading ? 'Đang đăng...' : 'Đăng tin'}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default CreateStory;