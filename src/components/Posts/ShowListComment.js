import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Collapse,
    CircularProgress
} from '@mui/material';
import { MoreVert, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';
import { formatDateToNow } from '@/components/FormatDate';

const CommentItem = ({ comment, level = 0, deleteCommentChil, setDeleteCommentChil, commentChilde, setCommentChilde, onReply, onDelete, currentUser, post }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [isLoadingReplies, setIsLoadingReplies] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(comment.user_emotion?.emoji || null);

    const icons = ['👍', '❤️', '😆', '😢', '😮', '😡'];

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleIconClick = async (icon) => {
        try {
            await axiosInstance.post(`/emotions`, {
                id: comment.id,
                type: 'comment',
                emoji: icon
            });
            if (selectedIcon === icon) {
                setSelectedIcon(null);
            }else{
                setSelectedIcon(icon);
            }

        } catch (error) {
            console.error('Lỗi khi thả icon:', error);
            toast.error('Có lỗi xảy ra khi thả cảm xúc');
        }
    };

    const loadReplies = async () => {
        if (!showReplies && comment.countChildren > 0) {
            setIsLoadingReplies(true);
            try {
                const response = await axiosInstance.get(`comments/by/comment/${comment.id}`);
                setReplies(response.data.data);
                setShowReplies(true);
            } catch (error) {
                console.error('Lỗi khi tải replies:', error);
                toast.error('Có lỗi xảy ra khi tải phản hồi');
            }
            setIsLoadingReplies(false);
        } else {
            setShowReplies(!showReplies);
        }
    };

    useEffect(() => {
        if (deleteCommentChil > 0) {
            setReplies(prevReplies =>
                prevReplies.filter(comment => comment.id !== deleteCommentChil)
            );
            setDeleteCommentChil(0)
        }
    }, [deleteCommentChil]);

    useEffect(() => {
        if (commentChilde && Object.keys(commentChilde).length > 0) {
            setReplies(prevReplies =>
                prevReplies.map(item => {
                    if (item.id === parseInt(commentChilde.parent_id)) {
                        if (!item.countChildren) {
                            item.countChildren = 0
                        }
                        item.countChildren += 1
                        let chi = commentChilde;
                        setCommentChilde({});
                        return { ...item, replies: chi };
                    }
                    return item;
                })
            );
        }
    }, [commentChilde]);

    useEffect(() => {
        if (comment.replies) {
            if (!showReplies) {
                loadReplies();
            } else {
                setReplies(pre => [...pre, comment.replies])
            }
        }
    }, [comment.replies]);

    const canShowReplies = level < 2;

    return (
        <Box sx={{ ml: level * 4, position: 'relative', mb: 1.5 }}>
            {level > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: '-24px',
                        top: '16px',
                        bottom: 0,
                        width: '2px',
                        bgcolor: 'rgba(0, 0, 0, 0.08)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '-8px',
                            width: '24px',
                            height: '2px',
                            bgcolor: 'rgba(0, 0, 0, 0.08)'
                        }
                    }}
                />
            )}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                    src={comment.user.avatar}
                    sx={{ width: 32, height: 32 }}
                />
                <Box sx={{ flex: 1 }}>
                    <Box sx={{
                        bgcolor: '#f0f2f5',
                        p: 1.5,
                        borderRadius: '18px',
                        display: 'inline-block',
                        maxWidth: '100%',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        <Typography variant="subtitle2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#050505', mb: 0.5 }}>
                            {comment.user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.9375rem', color: '#050505', whiteSpace: 'pre-wrap', lineHeight: 1.3333 }}>
                            {comment.content.text}
                        </Typography>
                        {comment.content.image && (
                            <Box sx={{ mt: 1 }}>
                                <img
                                    src={comment.content.image}
                                    alt="Comment"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '250px',
                                        borderRadius: '12px'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 0.5, pl: 0.5 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: selectedIcon ? '#1877f2' : '#65676B',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        color: '#1D1F23'
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    const iconList = e.currentTarget.nextElementSibling;
                                    if (iconList) {
                                        iconList.style.display = 'flex';
                                    }
                                }}
                            >
                                {selectedIcon ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span>{selectedIcon}</span>
                                    </span>
                                ) : (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span>Thích</span>
                                    </span>
                                )}
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    display: 'none',
                                    top: '-40px',
                                    left: '0',
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    padding: '5px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    zIndex: 1,
                                    gap: '5px'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            >
                                {icons.map((icon, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleIconClick(icon)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '20px',
                                            padding: '2px',
                                            opacity: selectedIcon === icon ? 0.5 : 1
                                        }}
                                    >
                                        {icon}
                                    </span>
                                ))}
                            </Box>
                        </Box>
                        {canShowReplies && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#65676B',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        color: '#1D1F23'
                                    }
                                }}
                                onClick={() => onReply(comment)}
                            >
                                Phản hồi
                            </Typography>
                        )}
                        <Typography variant="caption" sx={{ color: '#65676B', fontSize: '0.75rem' }}>
                            {comment.created_at ? formatDateToNow(comment.created_at) : ''}
                        </Typography>

                        {(currentUser?.id === comment.user.id || currentUser?.id === post.user.id) && (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        padding: '2px',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.05)'
                                        }
                                    }}
                                >
                                    <MoreVert sx={{ fontSize: '1.125rem', color: '#65676B' }} />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        elevation: 1,
                                        sx: {
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                            borderRadius: '8px',
                                            minWidth: '120px'
                                        }
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        handleMenuClose();
                                        onDelete(comment.id);
                                    }}>
                                        Xóa
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Stack>

                    {canShowReplies && comment.countChildren > 0 && (
                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                color: '#65676B',
                                pl: 0.5,
                                '&:hover': {
                                    color: '#1D1F23'
                                }
                            }}
                            onClick={loadReplies}
                        >
                            {isLoadingReplies ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={14} thickness={5} sx={{ color: '#65676B' }} />
                                    <Typography variant="body2" sx={{ color: '#65676B', fontSize: '0.8125rem' }}>
                                        Đang tải phản hồi...
                                    </Typography>
                                </Box>
                            ) : showReplies ? (
                                <>
                                    <KeyboardArrowUp sx={{ fontSize: '1.25rem' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                                        Ẩn {comment.countChildren} phản hồi
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <KeyboardArrowDown sx={{ fontSize: '1.25rem' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                                        {comment.countChildren} phản hồi
                                    </Typography>
                                </>
                            )}
                        </Box>
                    )}

                    <Collapse in={showReplies}>
                        {isLoadingReplies ? (
                            <Box sx={{ mt: 1, ml: 2 }}>
                                <Typography variant="body2" sx={{ color: '#65676B', fontSize: '0.8125rem' }}>
                                    Đang tải phản hồi...
                                </Typography>
                            </Box>
                        ) : (
                            replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    level={level + 1}
                                    onReply={onReply}
                                    onDelete={onDelete}
                                    currentUser={currentUser}
                                    post={post}
                                />
                            ))
                        )}
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
};

const ShowListComment = ({ comments, deleteCommentChil, setDeleteCommentChil, commentChilde, setCommentChilde, onReply, onDelete, post, hasMore, isLoading, onLoadMore }) => {
    const currentUser = useSelector(state => state.user);

    return (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column-reverse' }}>
            {comments.map((comment) => (
                <CommentItem
                    commentChilde={commentChilde}
                    setCommentChilde={setCommentChilde}
                    deleteCommentChil={deleteCommentChil}
                    setDeleteCommentChil={setDeleteCommentChil}
                    key={comment.id}
                    comment={comment}
                    onReply={onReply}
                    onDelete={onDelete}
                    currentUser={currentUser}
                    post={post}
                />
            ))}

            {hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    {isLoading ? (
                        <CircularProgress size={20} thickness={5} sx={{ color: '#65676B' }} />
                    ) : (
                        <Typography
                            onClick={onLoadMore}
                            variant="body2"
                            sx={{
                                color: '#65676B',
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#1D1F23'
                                }
                            }}
                        >
                            Xem thêm bình luận
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ShowListComment;