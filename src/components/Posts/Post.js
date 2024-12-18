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
import Report from './Report.js';
import ImageViewer from './ImageViewer.js';

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
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [openReport, setOpenReport] = useState(false);
    const [loadingShare, setLoadingShare] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

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
        setLoadingShare(true);
        try {
            const response = await axiosInstance.post('posts', {
                content: shareContent,
                share: post.id,
                status: shareStatus
            });

            if (response.status === 200) {
                if (redirectDetail) {
                    navigate(`/posts/${response.data.data.id}`);
                } else {
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
        } finally {
            setLoadingShare(false);
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
                } else {
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

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setOpenImageViewer(true);
    };

    const renderMedia = (data) => {
        if (!data || (!data.image?.length && !data.video?.length)) return null;

        const imageCount = data.image?.length || 0;
        const layouts = {
            1: {
                gridTemplateAreas: '"main"',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '400px'
            },
            2: {
                gridTemplateAreas: '"left right"',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '400px'
            },
            3: {
                gridTemplateAreas: '"left right-top" "left right-bottom"',
                gridTemplateColumns: '2fr 1fr',
                gridTemplateRows: '200px 200px'
            },
            4: {
                gridTemplateAreas: '"left-top right-top" "left-bottom right-bottom"',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '200px 200px'
            }
        };

        const layout = layouts[Math.min(imageCount, 4)];

        return (
            <Box sx={{ mt: 2, mb: 2 }}>
                <Box sx={{
                    display: 'grid',
                    gap: '2px',
                    ...layout,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    '@media (max-width: 768px)': {
                        gridTemplateRows: layout?.gridTemplateRows
                            .split(' ')
                            .map(row => `${parseInt(row) / 2}px`)
                            .join(' '),
                    }
                }}>
                    {data.image?.slice(0, 4).map((img, index) => {
                        let gridArea = '';
                        if (imageCount === 1) gridArea = 'main';
                        else if (imageCount === 2) gridArea = index === 0 ? 'left' : 'right';
                        else if (imageCount === 3) {
                            if (index === 0) gridArea = 'left';
                            else if (index === 1) gridArea = 'right-top';
                            else gridArea = 'right-bottom';
                        }
                        else if (imageCount >= 4) {
                            if (index === 0) gridArea = 'left-top';
                            else if (index === 1) gridArea = 'right-top';
                            else if (index === 2) gridArea = 'left-bottom';
                            else gridArea = 'right-bottom';
                        }

                        return (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    gridArea,
                                    cursor: 'pointer',
                                    height: '100%',
                                    '&:hover': {
                                        opacity: 0.95
                                    }
                                }}
                                onClick={() => handleImageClick(index)}
                            >
                                <img
                                    loading="lazy"
                                    src={img}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                {index === 3 && imageCount > 4 && (
                                    <Box sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        bgcolor: 'rgba(0,0,0,0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography variant="h6" color="white">
                                            +{imageCount - 4}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>

                <Dialog
                    open={openImageViewer}
                    onClose={() => setOpenImageViewer(false)}
                    maxWidth="xl"
                    fullWidth
                    >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: { xs: '14px', sm: '16px' },
                        px: 1
                    }}>
                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                        Tất cả ảnh ({data.image?.length})
                        </Typography>
                        <IconButton onClick={() => setOpenImageViewer(false)}>
                        <Close />
                        </IconButton>
                    </Box>
                    
                    <ImageViewer
                        open={openImageViewer}
                        onClose={() => setOpenImageViewer(false)}
                        data={data}
                        currentIndex={selectedImageIndex}
                        setCurrentIndex={setSelectedImageIndex}
                    />
                    </Dialog>

                {data.video?.map((video, index) => (
                    <Box key={index} sx={{
                        position: 'relative',
                        height: '400px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        bgcolor: '#000',
                        mt: 2,
                        maxWidth: '100%',
                        width: '100%',
                    }}>
                        <video
                            controls
                            style={{
                                width: '100%',
                                height: 'auto',
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

    const handleDeleteOpen = () => {
        setOpenDeleteConfirm(true);
    };

    const handleDeleteClose = () => {
        setOpenDeleteConfirm(false);
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            const response = await axiosInstance.delete(`posts/${post.id}`);
            if (response.status === 200) {
                setPosts(prevPosts => prevPosts.filter(p => p.id !== post.id));
                toast.success('Đã xóa bài viết');
                handleDeleteClose();
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error);
            toast.error('Có lỗi xảy ra khi xóa bài viết');
        } finally {
            setLoadingDelete(false);
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
                                <>
                                    <MenuItem onClick={handleEditOpen}>
                                        <Edit sx={{ mr: 1 }} />
                                        Chỉnh sửa bài viết
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteOpen}>
                                        <Close sx={{ mr: 1 }} />
                                        Xóa bài viết
                                    </MenuItem>
                                </>
                            ) : (
                                <MenuItem onClick={() => {
                                    handleClose();
                                    setOpenReport(true);
                                }}>
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
                            {post.is_active === 0 && (
                                <Typography color="error">Đã khóa</Typography>
                            )}
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="body1" sx={{ mb: post.post_share ? 2 : 0 }}>
                    {post.content}
                </Typography>
                {post.post_share && post.post_share.is_active === 0 ? (
                    <Card sx={{ bgcolor: '#f0f2f5' }}>
                        <CardContent>
                            <Typography sx={{ bgcolor: '#f0f2f5' }} color="error">Đã bị khóa</Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {post.post_share ? <Card sx={{ bgcolor: '#f0f2f5' }}>
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
                        </Card> : (post.share_id > 0 ?
                            <>
                                <Card sx={{ bgcolor: '#f0f2f5' }}>
                                    <CardContent>
                                        <Typography sx={{ bgcolor: '#f0f2f5' }} color="error">Bài viết đã bị xóa!</Typography>
                                    </CardContent>
                                </Card>
                            </>
                            : '')}
                        {!post.post_share && renderMedia(post.data)}
                    </>
                )}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                                {emojiCount || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                cảm xúc
                            </Typography>
                        </Box>
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
                        <Typography sx={{ fontSize: '14px' }}>{selectedEmoji || "👍"}</Typography> :
                        <ThumbUpAltOutlined sx={{ fontSize: '14px' }} />
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
                            sx={{ fontSize: {
                                    xs: '12px', 
                                    sm: '14px', 
                                }}}
                            onClick={() => handleEmojiClick(reaction.emoji)}
                            title={reaction.name}
                        >
                            <Typography sx={{ fontSize: '14px' }}>{reaction.emoji}</Typography>
                        </IconButton>
                    ))}
                </Popover>
                {!hideCommentButton && (
                    <Button
                        startIcon={<ChatBubbleOutline sx={{ fontSize: '12px' }} />}
                        sx={{ flex: 1, fontSize: {
                                    xs: '12px', 
                                    sm: '14px', 
                                } }}
                        onClick={handleCommentOpen}
                    >
                    Bình luận
                    </Button>
                )}
                <Button
                    startIcon={<Share sx={{ fontSize: '12px' }} />}
                    sx={{ flex: 1, fontSize: {
                                    xs: '12px', 
                                    sm: '14px', 
                                } }}
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
                        <IconButton
                            onClick={handleShareClose}
                            disabled={loadingShare}
                        >
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
                        disabled={loadingShare}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Đối tượng</InputLabel>
                        <Select
                            value={shareStatus}
                            onChange={(e) => setShareStatus(e.target.value)}
                            label="Đối tượng"
                            disabled={loadingShare}
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
                                        loading="lazy"
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
                    <Button
                        onClick={handleShareClose}
                        disabled={loadingShare}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleShare}
                        disabled={!shareContent.trim() || loadingShare}
                        startIcon={loadingShare && <CircularProgress size={20} color="inherit" />}
                    >
                        {loadingShare ? 'Đang chia sẻ...' : 'Chia sẻ ngay'}
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
                                            loading="lazy"
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
                                            loading="lazy"
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
                        <Typography variant="h6">Bày tỏ cảm xúc</Typography>
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

            <Report
                open={openReport}
                onClose={() => setOpenReport(false)}
                type="post"
                id={post.id}
            />

            <Dialog
                open={openDeleteConfirm}
                onClose={handleDeleteClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    {loadingDelete ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Typography>Bạn có chắc chắn muốn xóa bài viết này không?</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} disabled={loadingDelete}>Hủy</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={loadingDelete}
                    >
                        {loadingDelete ? 'Đang xóa...' : 'Xóa'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Post;
