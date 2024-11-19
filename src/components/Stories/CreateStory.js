import React, { useState } from 'react';
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
} from '@mui/material';
import {
    Close as CloseIcon,
    AddPhotoAlternate as AddPhotoIcon,
    Public,
    Lock,
    People,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';

const CreateStory = ({ open,stories,  setStories, onClose }) => {
    const [data, setData] = useState(null);
    const [privacy, setPrivacy] = useState('public');

    const handleMediaSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData(file);
        }
    };

    const handlePaste = (event) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                setData(file);
                break;
            }
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
        }
    };

    const handleClearMedia = () => {
        setData(null);
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
                            cursor: 'pointer',
                        }}
                        component="label"
                        onPaste={handlePaste}
                        tabIndex={0}
                    >
                        <input
                            accept="image/*,video/*"
                            type="file"
                            onChange={handleMediaSelect}
                            style={{ display: 'none' }}
                        />
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                            Chọn ảnh hoặc video để tải lên hoặc dán (Ctrl+V)
                        </Typography>
                        <AddPhotoIcon />
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
        >
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
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!data}
                >
                    Đăng tin
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateStory;