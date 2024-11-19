import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Menu, MenuItem, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axiosInstance from '@/axios';
import { setNotifications } from "@/actions/notification";
import { useNavigate } from 'react-router-dom';

const Notification = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notifications = useSelector(state => state.notifications);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Fetch thông báo
    const fetchNotifications = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get('/notifications', {
                params: { index: notifications.length },
            });

            const newNotifications = response.data.filter(notification =>
                !notifications.some(existingNotification => existingNotification.id === notification.id)
            );

            if (newNotifications.length > 0) {
                dispatch(setNotifications([...notifications, ...newNotifications]));
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [notifications, hasMore, loading, dispatch]);

    useEffect(() => {
        fetchNotifications();
    }, []); // Chỉ chạy lần đầu

    // Kiểm tra cuộn đến cuối
    const handleScroll = useCallback((event) => {
        const bottom = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 5;
        if (bottom) fetchNotifications();
    }, [fetchNotifications]);

    // Xử lý menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenNotification = () => {
        handleCloseMenu();
        navigate('/notifications');
    }

    const handleMarkAllAsRead = async () => {
        handleCloseMenu();
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            is_seen: true,
            is_read: true,
        }));
        dispatch(setNotifications(updatedNotifications));

        try {
            await axiosInstance.post("/notifications/read/all");
        } catch (error) {
            // console.error("Error marking all as read:", error);
        }
    };

    const getNotificationContent = (notification) => notification.data.message || "Thông báo.";
    const getNotificationLink = (notification) => {
        switch (notification.type) {
            case 'App\\Notifications\\CreatePost':
                const postId = notification.post?.id || notification.data?.post?.id;
                return `/post/${postId}`;
            default:
                return '/';
        }
    };
    const getAvatarUrl = (notification) => notification.user?.avatar || notification.data?.user?.avatar;
    const getUserName = (notification) => notification.user?.name || notification.data?.user?.name;

    return (
        <Box 
            sx={{
                width: 360,
                maxHeight: 500,
                overflow: 'auto',
                bgcolor: 'background.paper',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '4px',
                    '&:hover': { backgroundColor: '#555' },
                },
            }}
            onScroll={handleScroll}
        >
            <Typography variant="h6" sx={{ p: 2, fontWeight: 600, borderBottom: 1, borderColor: 'divider' }}>
                Thông báo
                <IconButton onClick={handleMenuClick} sx={{ float: 'right' }}>
                    <MoreHorizIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleMarkAllAsRead}>Đánh dấu tất cả là đã đọc</MenuItem>
                    <MenuItem onClick={handleOpenNotification}>Xem thông báo</MenuItem>
                </Menu>
            </Typography>

            <List sx={{ p: 0 }}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <ListItem
                            key={notification.id}
                            component={Link}
                            to={getNotificationLink(notification)}
                            onClick={onClose}
                            sx={{
                                p: 2,
                                textDecoration: 'none',
                                color: 'inherit',
                                bgcolor: notification.is_seen ? 'inherit' : 'action.hover',
                                '&:hover': { bgcolor: 'action.selected' },
                                borderBottom: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={getAvatarUrl(notification)} alt={getUserName(notification)} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<span dangerouslySetInnerHTML={{ __html: getNotificationContent(notification) }} />}
                                secondary={formatDistanceToNow(new Date(notification.created_at), {
                                    addSuffix: true,
                                    locale: vi,
                                })}
                                primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '0.9rem', lineHeight: 1.4 } }}
                                secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                            />
                            {!notification.is_read && (
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                        ml: 1,
                                        flexShrink: 0,
                                    }}
                                />
                            )}
                        </ListItem>
                    ))
                ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                            Không có thông báo mới
                        </Typography>
                    </Box>
                )}
            </List>

            {loading && hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <CircularProgress size={24} sx={{ color: 'grey' }} />
                </Box>
            )}

            {!loading && !hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        Không còn thông báo cũ hơn
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Notification;
