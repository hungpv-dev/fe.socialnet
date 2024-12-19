import React, { useState, useEffect } from 'react';
import {
    Avatar,
    TextField,
    Button,
    Divider,
    Stack,
    IconButton,
    Box,
    Typography,
    Paper,
    Popover,
    ImageList,
    ImageListItem,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';
import {
    Image as ImageIcon,
    Videocam as VideocamIcon,
    EmojiEmotions as EmojiEmotionsIcon,
    Close as CloseIcon,
    Public as PublicIcon,
    People as PeopleIcon,
    Lock as LockIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';


const CreatePost = ( { setPosts, onClose } ) => {
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const currentUser = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [privacy, setPrivacy] = useState('public');
    const [loading, setLoading] = useState(false);

    const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB in bytes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        let formData = new FormData();
        formData.append('content', content);
        formData.append('status', privacy);
        formData.append('type', 'post');
        mediaFiles.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        try {
            onClose();
            let response = await toast.promise(
                axiosInstance.post('posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }),
                {
                    pending: 'Đang xử lý...',
                    success: 'Thêm mới bài viết thành công👌',
                    error: 'Thêm bài viết thất bại 🤯'
                }
            );
            if(response.status === 200){
                let post = response.data.data;
                setPosts(prevPosts => [post, ...prevPosts])
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }
        } catch (e) {
            console.log('Lỗi khi gửi file:', e);
        } finally {
            setLoading(false);
        }
    };

    const validateFileSize = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            toast.error('Kích thước file không được vượt quá 30MB');
            return false;
        }
        return true;
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(validateFileSize);
        setMediaFiles(prev => [...prev, ...validFiles]);
    };

    const handleRemoveMedia = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleEmojiClick = (emoji) => {
        setContent(prev => prev + emoji.native);
    };

    const handleEmojiOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEmojiClose = () => {
        setAnchorEl(null);
    };

    const handlePaste = async (e) => {
        const items = e.clipboardData.items;
        const files = [];
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (validateFileSize(file)) {
                    files.push(file);
                }
            }
        }
        
        if (files.length > 0) {
            setMediaFiles(prev => [...prev, ...files]);
        }
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 3, p: 2, width: '100%', maxWidth: 600, margin: '0 auto' }}>
            <Stack spacing={2} sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        sx={{ width: 48, height: 48 }}
                    />
                    <Box flexGrow={1}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {currentUser?.name}
                        </Typography>
                        <Select
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                            size="small"
                            sx={{
                                mt: 0.5,
                                height: 32,
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    py: 0.5
                                }
                            }}
                        >
                            <MenuItem value="public">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <PublicIcon fontSize="small" />
                                    <Typography>Công khai</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem value="friend">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <PeopleIcon fontSize="small" />
                                    <Typography>Bạn bè</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem value="private">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <LockIcon fontSize="small" />
                                    <Typography>Chỉ mình tôi</Typography>
                                </Stack>
                            </MenuItem>
                        </Select>
                    </Box>
                </Stack>

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="Bạn đang nghĩ gì?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onPaste={handlePaste}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#f5f5f5',
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                    }}
                />

                {mediaFiles.length > 0 && (
                    <Box>
                        <ImageList
                            cols={mediaFiles.length === 1 ? 1 : 2}
                            gap={8}
                            sx={{ maxHeight: 600 }}
                        >
                            {mediaFiles.map((file, index) => (
                                <ImageListItem key={index} sx={{ position: 'relative' }}>
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: 8
                                            }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <video
                                            src={URL.createObjectURL(file)}
                                            controls
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 8
                                            }}
                                        />
                                    )}
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(255,255,255,0.8)',
                                            '&:hover': {
                                                bgcolor: 'white'
                                            }
                                        }}
                                        onClick={() => handleRemoveMedia(index)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                )}

                <Divider />

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Stack direction="row" spacing={1}>
                        <Button
                            component="label"
                            startIcon={<ImageIcon color="success" fontSize="small" />}
                            disabled={loading}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 1,
                                fontSize: '0.875rem'
                            }}
                        >
                            Ảnh
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                multiple
                                onChange={handleMediaChange}
                            />
                        </Button>

                        <Button
                            component="label"
                            startIcon={<VideocamIcon color="error" fontSize="small" />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 1,
                                fontSize: '0.875rem'
                            }}
                        >
                            Video
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleMediaChange}
                            />
                        </Button>

                        <Button
                            startIcon={<EmojiEmotionsIcon color="warning" fontSize="small" />}
                            onClick={handleEmojiOpen}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 1,
                                fontSize: '0.875rem'
                            }}
                        >
                            Cảm xúc
                        </Button>

                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleEmojiClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Picker
                                data={data}
                                onEmojiSelect={handleEmojiClick}
                                theme="light"
                            />
                        </Popover>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={(!content && mediaFiles.length === 0) || loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                            bgcolor: '#1877f2',
                            '&:hover': {
                                bgcolor: '#1666d5'
                            },
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        {loading ? 'Đang đăng...' : 'Đăng'}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default CreatePost;
