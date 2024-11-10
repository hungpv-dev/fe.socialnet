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
    Popover
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
    People
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';

const Post = ({ post }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [liked, setLiked] = useState(post.user_emotion ? true : false);
    const [selectedEmoji, setSelectedEmoji] = useState(post.user_emotion?.emoji || null);
    const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
    const [emojiCount, setEmojiCount] = useState(post.emoji_count);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    gridTemplateColumns: layout.gridCols,
                    gap: '2px',
                    height: layout.height
                }}>
                    {data.image?.slice(0, 3).map((img, index) => (
                        <Box key={index} sx={layout.styles}>
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
                        sx={{ width: 40, height: 40 }}
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
                            <MenuItem onClick={handleClose}>Lưu bài viết</MenuItem>
                            <MenuItem onClick={handleClose}>Báo cáo</MenuItem>
                        </Menu>
                    </>
                }
                title={
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {post.user.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
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
                <Typography variant="body1">
                    {post.content}
                </Typography>
                {renderMedia(post.data)}
            </CardContent>

            <Box sx={{ px: 2, py: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpAlt color="primary" sx={{ fontSize: '18px' }} />
                        <Typography variant="body2" color="text.secondary">
                            {emojiCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            {post.comment_count} bình luận
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.share_count} chia sẻ
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
                <Button
                    startIcon={<ChatBubbleOutline sx={{ fontSize: '18px' }} />}
                    sx={{ flex: 1 }}
                >
                    Bình luận
                </Button>
                <Button
                    startIcon={<Share sx={{ fontSize: '18px' }} />}
                    sx={{ flex: 1 }}
                >
                    Chia sẻ
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
