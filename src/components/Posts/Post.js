import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Box,
    IconButton,
    Button,
    Divider,
    Menu,
    MenuItem,
    Popover,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    Select,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
    ThumbUpAlt,
    ChatBubbleOutline,
    Share,
    MoreHoriz,
    ThumbUpAltOutlined,
    Public,
    Lock,
    People,
    Close,
    Edit,
    PhotoCamera
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';
import CommentDialog from './CommentDialog.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post = ({ setPosts, post, hideCommentButton, onShareSuccess, redirectDetail = false }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const [liked, setLiked] = useState(post.user_emotion ? true : false);
    const [selectedEmoji, setSelectedEmoji] = useState(post.user_emotion?.emoji || null);
    const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
    const [emojiCount, setEmojiCount] = useState(post.emoji_count);
    const [openShare, setOpenShare] = useState(false);
    const [shareContent, setShareContent] = useState('');
    const [shareStatus, setShareStatus] = useState('public');
    const [openComment, setOpenComment] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editContent, setEditContent] = useState(post.content);
    const [editStatus, setEditStatus] = useState(post.status);
    const [newFiles, setNewFiles] = useState([]);
    const [keepFiles, setKeepFiles] = useState({
        image: post.data?.image || [],
        video: post.data?.video || []
    });
    const [openEmojiList, setOpenEmojiList] = useState(false);
    const [emojiUsers, setEmojiUsers] = useState({
        data: [],
        currentPage: 1,
        lastPage: 1,
        loading: false,
        loadingMore: false
    });
    const [loadingEmojis, setLoadingEmojis] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditOpen = () => {
        setEditContent(post.content);
        setEditStatus(post.status);
        setNewFiles([]);
        setKeepFiles({
            image: post.data?.image || [],
            video: post.data?.video || []
        });
        setOpenEdit(true);
        handleClose();
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setEditContent(post.content);
        setEditStatus(post.status);
        setNewFiles([]);
        setKeepFiles({
            image: post.data?.image || [],
            video: post.data?.video || []
        });
    };

    const handleEditSave = async () => {
        try {
            const formData = new FormData();
            formData.append('content', editContent);
            formData.append('status', editStatus);
            formData.append('_method', 'PUT');
            
            // Xử lý files mới
            if (newFiles?.length) {
                newFiles.forEach(file => {
                    formData.append('files[]', file);
                });
            }
    
            // Xử lý files giữ lại
            formData.append('keep_files', JSON.stringify(keepFiles));
    
            const response = await axiosInstance.post(`posts/${post.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                setPosts(prevPosts => 
                    prevPosts.map(p => 
                        p.id === post.id ? response.data.data : p
                    )
                );
                toast.success('Đã cập nhật bài viết');
                handleEditClose();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật bài viết');
        }
    };

    const handleShareOpen = () => {
        setOpenShare(true);
    };

    const handleShareClose = () => {
        setOpenShare(false);
        setShareContent('');
        setShareStatus('public');
    };

    const handleCommentOpen = () => {
        setOpenComment(true);
    };

    const handleCommentClose = () => {
        setOpenComment(false);
    };

    const handleShare = async () => {
        try {
            const response = await axiosInstance.post('posts', {
                content: shareContent,
                share: post.id,
                status: shareStatus
            });
            
            if (response.status === 200) {
                if(redirectDetail){
                    navigate(`/posts/${response.data.data.id}`);
                }else{
                    let post = response.data.data;
                    setPosts(prevPosts => [post, ...prevPosts])
                    toast.success('Đã chia sẻ bài viết');
                    handleShareClose();
                    if (onShareSuccess) {
                        onShareSuccess();
                    }
                }
            }
        } catch (error) {
            console.error('Lỗi khi chia sẻ bài viết:', error);
            toast.error('Có lỗi xảy ra khi chia sẻ bài viết');
        }
    };

    const handleEmojiClick = async (emoji) => {
        try {
            // Thêm hoặc cập nhật cảm xúc mới
            const response = await axiosInstance.post(`emotions`, {
                emoji: emoji,
                type: 'post',
                id: post.id,
            });
            if (response.status === 200) {
                if (selectedEmoji === emoji) {
                    setLiked(false);
                    setSelectedEmoji(null);
                }else{
                    setLiked(true);
                    setSelectedEmoji(emoji);
                }
                setEmojiCount(response.data.post.emoji_count);
            }
            setEmojiAnchorEl(null);
        } catch (error) {
            console.error('Lỗi khi thao tác cảm xúc:', error);
            toast.error('Có lỗi xảy ra khi thao tác cảm xúc');
        }
    };

    const handleEmojiOpen = (event) => {
        setEmojiAnchorEl(event.currentTarget);
    };

    const handleEmojiClose = () => {
        setEmojiAnchorEl(null);
    };

    const reactionIcons = [
        { name: "Thích", emoji: "👍" },
        { name: "Yêu thích", emoji: "❤️" },
        { name: "Haha", emoji: "😆" },
        { name: "Wow", emoji: "😮" },
        { name: "Buồn", emoji: "😢" },
        { name: "Phẫn nộ", emoji: "😠" },
    ];

    const getStatusIcon = () => {
        switch (post.status) {
            case 'public':
                return <Public sx={{ fontSize: 16, color: '#65676B' }} />;
            case 'private':
                return <Lock sx={{ fontSize: 16, color: '#65676B' }} />;
            case 'friend':
                return <People sx={{ fontSize: 16, color: '#65676B' }} />;
            default:
                return <Public sx={{ fontSize: 16, color: '#65676B' }} />;
        }
    };


    const renderMedia = (data) => {
        if (!data || (!data.image?.length && !data.video?.length)) return null;

        const imageCount = data.image?.length || 0;
        const layouts = {
            1: {
                gridCols: '1fr',
                height: '400px',
                styles: {
                    position: 'relative',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }
            },
            2: {
                gridCols: '1fr 1fr',
                height: '400px',
                styles: {
                    position: 'relative',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }
            },
            3: {
                gridCols: '2fr 1fr',
                height: '400px',
                styles: {
                    position: 'relative',
                    height: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }
            }
        };

        const layout = layouts[Math.min(imageCount, 3)];

        return (
            <Box sx={{ mt: 2 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: layout?.gridCols,
                    gap: '2px',
                    height: layout?.height
                }}>
                    {data.image?.slice(0, 3).map((img, index) => (
                        <Box key={index} sx={layout?.styles}>
                            <img
                                src={img}
                                alt=""
                                className={'show-image'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            {index === 2 && imageCount > 3 && (
                                <Box sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    bgcolor: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" color="white">
                                        +{imageCount - 3}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>

                {data.video?.map((video, index) => (
                    <Box key={index} sx={{
                        position: 'relative',
                        height: '400px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        bgcolor: '#000',
                        mt: 2
                    }}>
                        <video
                            controls
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </Box>
                ))}
            </Box>
        );
    };

    const handleNameClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${post.user_id}`);
    };

    const handleTimeClick = (e) => {
        e.preventDefault();
        navigate(`/posts/${post.id}`);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewFiles(prev => [...prev, ...files]);
    };

    const handleRemoveOldFile = (fileUrl) => {
        setKeepFiles(prev => ({
            ...prev,
            image: prev.image.filter(f => f !== fileUrl),
            video: prev.video.filter(f => f !== fileUrl)
        }));
    };

    const handleRemoveNewFile = (index) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        const files = [];
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                files.push(file);
            }
        }

        if (files.length > 0) {
            setNewFiles(prev => [...prev, ...files]);
        }
    };

    const handleShowEmojiUsers = async () => {
        try {
            setLoadingEmojis(true);
            const response = await axiosInstance.get('/emotions', {
                params: {
                    id: post.id,
                    type: 'post',
                    page: 1
                }
            });
            setEmojiUsers({
                data: response.data.data,
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                loading: false,
                loadingMore: false
            });
            setOpenEmojiList(true);
        } catch (error) {
            console.error('Lỗi khi tải danh sách cảm xúc:', error);
            toast.error('Có lỗi xảy ra khi tải danh sách cảm xúc');
        } finally {
            setLoadingEmojis(false);
        }
    };

    const handleLoadMore = async () => {
        if (emojiUsers.currentPage >= emojiUsers.lastPage) return;
        
        try {
            setEmojiUsers(prev => ({ ...prev, loadingMore: true }));
            const response = await axiosInstance.get('/emotions', {
                params: {
                    id: post.id,
                    type: 'post',
                    page: emojiUsers.currentPage + 1
                }
            });
            
            setEmojiUsers(prev => ({
                data: [...prev.data, ...response.data.data],
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                loading: false,
                loadingMore: false
            }));
        } catch (error) {
            console.error('Lỗi khi tải thêm danh sách cảm xúc:', error);
            toast.error('Có lỗi xảy ra khi tải thêm danh sách cảm xúc');
        }
    };

    return (
        <Card sx={{
            mb: 3,
            borderRadius: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            bgcolor: '#ffffff'
        }}>
            <CardHeader
                avatar={
                    <Avatar
                        src={post.user.avatar}
                        alt={post.user.name}
                        sx={{ width: 40, height: 40, cursor: 'pointer' }}
                        onClick={handleNameClick}
                    />
                }
                action={
                    <>
                        <IconButton onClick={handleClick}>
                            <MoreHoriz />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {post.user_id === user.id ? (
                                <MenuItem onClick={handleEditOpen}>
                                    <Edit sx={{ mr: 1 }} />
                                    Chỉnh sửa bài viết
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={handleClose}>
                                    Báo cáo
                                </MenuItem>
                            )}
                        </Menu>
                    </>
                }
                title={
                    <Box>
                        <Typography 
                            variant="subtitle1" 
                            component="span"
                            sx={{ 
                                fontWeight: 600,
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                            onClick={handleNameClick}
                        >
                            {post.user.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={handleTimeClick}
                            >
                                {formatDistanceToNow(new Date(post.created_at), {
                                    addSuffix: true,
                                    locale: vi
                                })}
                            </Typography>
                            <Typography color="text.secondary">•</Typography>
                            {getStatusIcon()}
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="body1" sx={{ mb: post.post_share ? 2 : 0 }}>
                    {post.content}
                </Typography>
                {post.post_share && (
                    <Card sx={{ bgcolor: '#f0f2f5' }}>
                        <CardHeader
                            avatar={<Avatar src={post.post_share.user.avatar} />}
                            title={post.post_share.user.name}
                            subheader={formatDistanceToNow(new Date(post.post_share.created_at), {
                                addSuffix: true,
                                locale: vi
                            })}
                        />
                        <CardContent>
                            <Typography variant="body2">{post.post_share.content}</Typography>
                            {renderMedia(post.post_share.data)}
                        </CardContent>
                    </Card>
                )}
                {!post.post_share && renderMedia(post.data)}
            </CardContent>

            <Box sx={{ px: 2, py: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                        onClick={handleShowEmojiUsers}
                    >
                        <ThumbUpAlt color="primary" sx={{ fontSize: '18px' }} />
                        <Typography variant="body2" color="text.secondary">
                            {emojiCount || 0}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            {post.comment_count || 0} bình luận
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.share_count || 0} chia sẻ
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider />

            <CardActions>
                <Button
                    startIcon={liked ?
                        <Typography sx={{ fontSize: '18px' }}>{selectedEmoji || "👍"}</Typography> :
                        <ThumbUpAltOutlined sx={{ fontSize: '18px' }} />
                    }
                    onClick={handleEmojiOpen}
                    onMouseEnter={handleEmojiOpen}
                    sx={{ flex: 1 }}
                >
                    {liked ? (selectedEmoji ? reactionIcons.find(r => r.emoji === selectedEmoji)?.name : "Thích") : "Thích"}
                </Button>
                <Popover
                    open={Boolean(emojiAnchorEl)}
                    anchorEl={emojiAnchorEl}
                    onClose={handleEmojiClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        onMouseLeave: handleEmojiClose,
                        sx: {
                            p: 1,
                            display: 'flex',
                            gap: 1
                        }
                    }}
                >
                    {reactionIcons.map((reaction, index) => (
                        <IconButton
                            key={index}
                            onClick={() => handleEmojiClick(reaction.emoji)}
                            title={reaction.name}
                        >
                            <Typography sx={{ fontSize: '18px' }}>{reaction.emoji}</Typography>
                        </IconButton>
                    ))}
                </Popover>
                {!hideCommentButton && (
                    <Button
                        startIcon={<ChatBubbleOutline sx={{ fontSize: '18px' }} />}
                        sx={{ flex: 1 }}
                        onClick={handleCommentOpen}
                    >
                        Bình luận
                    </Button>
                )}
                <Button
                    startIcon={<Share sx={{ fontSize: '18px' }} />}
                    sx={{ flex: 1 }}
                    onClick={handleShareOpen}
                >
                    Chia sẻ
                </Button>
            </CardActions>

            <Dialog 
                open={openShare}
                onClose={handleShareClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Chia sẻ bài viết</Typography>
                        <IconButton onClick={handleShareClose}>
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Bạn nghĩ gì về bài viết này?"
                        value={shareContent}
                        onChange={(e) => setShareContent(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Đối tượng</InputLabel>
                        <Select
                            value={shareStatus}
                            onChange={(e) => setShareStatus(e.target.value)}
                            label="Đối tượng"
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
                    <Card sx={{ bgcolor: '#f0f2f5' }}>
                        <CardHeader
                            avatar={<Avatar src={post.user.avatar} />}
                            title={post.user.name}
                            subheader={formatDistanceToNow(new Date(post.created_at), {
                                addSuffix: true,
                                locale: vi
                            })}
                        />
                        <CardContent>
                            <Typography variant="body2">{post.content}</Typography>
                            {post.data?.image && post.data.image[0] && (
                                <Box sx={{ mt: 1 }}>
                                    <img 
                                        src={post.data.image[0]} 
                                        alt=""
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            objectFit: 'cover',
                                            borderRadius: 8
                                        }}
                                    />
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShareClose}>Hủy</Button>
                    <Button 
                        variant="contained"
                        onClick={handleShare}
                        disabled={!shareContent.trim()}
                    >
                        Chia sẻ ngay
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openEdit}
                onClose={handleEditClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Chỉnh sửa bài viết</Typography>
                        <IconButton onClick={handleEditClose}>
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Nội dung bài viết"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onPaste={handlePaste}
                        sx={{ mb: 2, mt: 2 }}
                    />
                    
                    {keepFiles.image?.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Ảnh hiện tại:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {keepFiles.image.map((fileUrl, index) => (
                                    <Box key={index} sx={{ position: 'relative' }}>
                                        <img 
                                            src={fileUrl} 
                                            alt="" 
                                            style={{
                                                width: 100,
                                                height: 100,
                                                objectFit: 'cover',
                                                borderRadius: 4
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                bgcolor: 'rgba(0,0,0,0.5)',
                                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                                            }}
                                            onClick={() => handleRemoveOldFile(fileUrl)}
                                        >
                                            <Close sx={{ fontSize: 16, color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {!post.post_share && (
                        <Box sx={{ mb: 2 }}>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="upload-post-images"
                            />
                            <label htmlFor="upload-post-images">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                >
                                    Thêm ảnh mới
                                </Button>
                            </label>
                        </Box>
                    )}

                    {newFiles.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Ảnh mới:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {Array.from(newFiles).map((file, index) => (
                                    <Box key={index} sx={{ position: 'relative' }}>
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            alt="" 
                                            style={{
                                                width: 100,
                                                height: 100,
                                                objectFit: 'cover',
                                                borderRadius: 4
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                bgcolor: 'rgba(0,0,0,0.5)',
                                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                                            }}
                                            onClick={() => handleRemoveNewFile(index)}
                                        >
                                            <Close sx={{ fontSize: 16, color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Đối tượng</InputLabel>
                        <Select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            label="Đối tượng"
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
                    {renderMedia(post.data)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleEditSave}
                        disabled={!editContent.trim()}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            <CommentDialog 
                open={openComment}
                onClose={handleCommentClose}
                post={post}
                setPosts={setPosts}
            />

            <Dialog
                open={openEmojiList}
                onClose={() => setOpenEmojiList(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Những người đã bày tỏ cảm xúc</Typography>
                        <IconButton onClick={() => setOpenEmojiList(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {loadingEmojis ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : (
                        <>
                            <List>
                                {emojiUsers.data.map((emotion) => (
                                    <ListItem
                                        key={emotion.id}
                                        sx={{
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={emotion.user.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                        onClick={() => navigate(`/profile/${emotion.user.id}`)}
                                                    >
                                                        {emotion.user.name}
                                                    </Typography>
                                                    <Typography component="span" sx={{ fontSize: '18px' }}>
                                                        {emotion.emoji}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            
                            {emojiUsers.currentPage < emojiUsers.lastPage && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button
                                        onClick={handleLoadMore}
                                        disabled={emojiUsers.loadingMore}
                                        startIcon={emojiUsers.loadingMore ? <CircularProgress size={20} /> : null}
                                    >
                                        {emojiUsers.loadingMore ? 'Đang tải...' : 'Xem thêm'}
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default Post;
