import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Divider,
    Typography,
    IconButton,
    Avatar,
    TextField,
    CircularProgress,
} from '@mui/material';
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';
import ShowListComment from './ShowListComment';
import Post from './Post';
import { Close, Send } from '@mui/icons-material';
import Image from '@mui/icons-material/Image';
import { useSelector } from 'react-redux';

const CommentDialog = ({ open, onClose, post, setPosts, redirectDetail=false }) => {
    const [newComment, setNewComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [commentChilde, setCommentChilde] = useState({});
    const [deleteCommentChil, setDeleteCommentChil] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef();
    const currentUser = useSelector(state => state.user);
    const [scrollPosition, setScrollPosition] = useState(0);
    const dialogContentRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && post?.id) {
            setPage(1);
            setComments([]);
            setHasMore(true);
            fetchComments(false);
        }
    }, [open, post?.id]);

    useEffect(() => {
        if (page !== 1 && post?.id) {
            fetchComments(true);
        }
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (dialogContentRef.current) {
                setScrollPosition(dialogContentRef.current.scrollTop);
            }
        };

        const contentElement = dialogContentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const fetchComments = async (prev) => {
        if (!post?.id) return;

        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`comments/by/post/${post.id}?page=${page}`);
            if (response.data.data.length > 0) {
                if(prev){
                    setComments(prevComments => [...prevComments, ...response.data.data]);
                }else{
                    setComments(response.data.data);
                }
                setHasMore(true);
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
            setDeleteCommentChil(commentId)
            toast.success('Xóa bình luận thành công');
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            toast.error('Có lỗi xảy ra khi xóa bình luận');
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim() && !selectedImage) return;

        setLoading(true);

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
                    
                    // Cuộn xuống cuối sau khi thêm comment mới
                    setTimeout(() => {
                        if (dialogContentRef.current) {
                            dialogContentRef.current.scrollTo({
                                top: dialogContentRef.current.scrollHeight,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
                setNewComment('');
                setSelectedImage(null);
                setPreviewImage(null);
                setReplyTo(null);
            }
        } catch (error) {
            console.error('Lỗi khi thêm bình luận:', error);
            toast.error('Có lỗi xảy ra khi tải bình luận');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: '80vh',
                    // minHeight: '900px', 
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                }
            }}
        >
            <Box sx={{ 
                top: 0,
                zIndex: 1,
                bgcolor: '#ffffff',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                transform: `translateY(-${scrollPosition * 0.3}px)`,
                transition: 'transform 0.1s ease-out'
            }}>
                <Post 
                    post={post} 
                    hideCommentButton={true} 
                    setPosts={setPosts}
                    onShareSuccess={onClose}
                    redirectDetail={redirectDetail}
                />
            </Box>

            <Divider />

            <DialogContent 
                ref={dialogContentRef}
                sx={{ 
                    flex: 1,
                    p: 0, 
                    bgcolor: '#ffffff',
                    minHeight: '45%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                        '&:hover': {
                            background: '#555'
                        }
                    }
                }}
            >
                <ShowListComment
                    commentChilde={commentChilde}
                    setCommentChilde={setCommentChilde}
                    deleteCommentChil={deleteCommentChil}
                    setDeleteCommentChil={setDeleteCommentChil}
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

            <Box sx={{ 
                p: 2,
                position: 'sticky',
                bottom: 0,
                bgcolor: '#ffffff',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                zIndex: 1
            }}>
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
                        onKeyPress={handleKeyPress}
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
                        disabled={!newComment.trim() || loading}
                        sx={{
                            color: !newComment.trim() || loading ? '#BCC0C4' : '#1877F2',
                            '&:hover': { bgcolor: '#F0F2F5' }
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CommentDialog;