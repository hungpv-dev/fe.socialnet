import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    Typography,
    Avatar,
    TextField,
    Divider,
} from '@mui/material';
import { Close, Send, Image } from '@mui/icons-material';
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ShowListComment from './ShowListComment';
import { formatDateToNow } from '@/components/FormatDate';

const CommentDialog = ({ open, onClose, post }) => {
    const [newComment, setNewComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [commentChilde, setCommentChilde] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef();
    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        if (open) {
            fetchComments();
        }
    }, [open, post, page]);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`comments/by/post/${post.id}?page=${page}`);
            if (response.data.data.length > 0) {
                setComments(prevComments => [...prevComments, ...response.data.data]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Lỗi khi tải bình luận:', error);
            toast.error('Có lỗi xảy ra khi tải bình luận');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setPreviewImage(null);
        }
    }, [selectedImage]);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
        } else {
            toast.error('Vui lòng chọn file ảnh hợp lệ');
        }
    };

    const handlePaste = (e) => {
        const items = e.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    setSelectedImage(file);
                    break;
                }
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosInstance.delete(`comments/${commentId}`);
            setComments(prevComments =>
                prevComments.filter(comment => comment.id !== commentId)
            );
            toast.success('Xóa bình luận thành công');
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            toast.error('Có lỗi xảy ra khi xóa bình luận');
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim() && !selectedImage) return;

        try {
            const formData = new FormData();
            formData.append('text', newComment);
            formData.append('post_id', post.id);
            if (selectedImage) {
                formData.append('files', selectedImage);
            }
            if (replyTo) {
                formData.append('parent_id', replyTo.id);
            }

            const response = await axiosInstance.post('comments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                let comment = response.data.data;
                if (replyTo) {
                    let check = true;
                    setComments(prevComments => {
                        return prevComments.map(c => {
                            if (c.id === replyTo.id) {
                                check = false;
                                if(!c.countChildren){
                                    c.countChildren = 0
                                }
                                c.countChildren += 1
                                return {
                                    ...c,
                                    replies: comment,
                                };
                            } else {
                                delete c.replies;
                            }
                            return c;
                        });
                    });
                    if(check){
                        setCommentChilde(comment)
                    }
                }else{
                    setComments(prevComments => {
                        let newComment =  prevComments.map(c => {
                            delete c.replies;
                            return c;
                        });
                        return [comment, ...newComment]
                    });
                }
                setNewComment('');
                setSelectedImage(null);
                setPreviewImage(null);
                setReplyTo(null);
            }
        } catch (error) {
            console.error('Lỗi khi thêm bình luận:', error);
            toast.error('Có lỗi xảy ra khi tải bình luận');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ p: 2, bgcolor: '#ffffff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#050505' }}>
                        Bài viết của {post.user.name}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            bgcolor: '#E4E6EB',
                            '&:hover': { bgcolor: '#D8DADF' }
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <Divider />

            <Box sx={{ p: 3, bgcolor: '#ffffff' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                        src={post.user.avatar}
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 1.5,
                            border: '1px solid #E4E6EB'
                        }}
                    />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#050505', mb: 0.5 }}>
                            {post.user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#65676B', fontSize: '0.8125rem' }}>
                            {formatDateToNow(post.created_at)}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 2,
                        whiteSpace: 'pre-wrap',
                        color: '#050505',
                        fontSize: '0.9375rem',
                        lineHeight: 1.3333
                    }}
                >
                    {post.content}
                </Typography>
                {post.image && (
                    <Box sx={{ mb: 2 }}>
                        <img
                            src={post.image}
                            alt="Post"
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                backgroundColor: '#F0F2F5'
                            }}
                        />
                    </Box>
                )}
            </Box>

            <Divider />

            <DialogContent sx={{ flex: 1, overflow: 'auto', p: 0, bgcolor: '#ffffff' }}>
                <ShowListComment
                    commentChilde={commentChilde}
                    setCommentChilde={setCommentChilde}
                    comments={comments}
                    onReply={setReplyTo}
                    onDelete={handleDeleteComment}
                    post={post}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={() => setPage(prev => prev + 1)}
                />
            </DialogContent>

            <Divider />

            <Box sx={{ p: 2, bgcolor: '#ffffff' }}>
                {replyTo && (
                    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#65676B', fontSize: '0.8125rem' }}>
                            Đang trả lời {replyTo.user.name}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => setReplyTo(null)}
                            sx={{ p: 0.5 }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                )}
                {previewImage && (
                    <Box sx={{ mb: 2, position: 'relative' }}>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                borderRadius: '8px',
                                backgroundColor: '#F0F2F5'
                            }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                            }}
                            onClick={() => {
                                setSelectedImage(null);
                                setPreviewImage(null);
                            }}
                        >
                            <Close sx={{ color: 'white', fontSize: '1.25rem' }} />
                        </IconButton>
                    </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
                    <Avatar
                        src={currentUser?.avatar}
                        sx={{
                            width: 32,
                            height: 32,
                            border: '1px solid #E4E6EB'
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        placeholder={replyTo ? `Trả lời ${replyTo.user.name}...` : "Viết bình luận..."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onPaste={handlePaste}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                bgcolor: '#F0F2F5',
                                fontSize: '0.9375rem',
                                '& fieldset': {
                                    borderColor: 'transparent'
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1877F2'
                                }
                            }
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                    />
                    <IconButton
                        onClick={() => fileInputRef.current.click()}
                        sx={{
                            color: '#65676B',
                            '&:hover': { bgcolor: '#F0F2F5' }
                        }}
                    >
                        <Image />
                    </IconButton>
                    <IconButton
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim() && !selectedImage}
                        sx={{
                            color: !newComment.trim() && !selectedImage ? '#BCC0C4' : '#1877F2',
                            '&:hover': { bgcolor: '#F0F2F5' }
                        }}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CommentDialog;