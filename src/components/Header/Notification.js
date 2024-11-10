import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useSelector } from 'react-redux';

const Notification = ({ onClose }) => {
    const notifications = useSelector(state => state.notifications);
    const getNotificationContent = (notification) => {
        switch(notification.type) {
            case 'App\\Notifications\\CreatePost':
                const userName = notification.user?.name || notification.data?.user?.name;
                return `${userName} đã đăng một bài viết mới`;
            default:
                return 'Có thông báo mới';
        }
    }

    const getNotificationLink = (notification) => {
        switch(notification.type) {
            case 'App\\Notifications\\CreatePost':
                const postId = notification.post?.id || notification.data?.post?.id;
                return `/post/${postId}`;
            default:
                return '/'; 
        }
    }

    const getAvatarUrl = (notification) => {
        return notification.user?.avatar || notification.data?.user?.avatar;
    }

    const getUserName = (notification) => {
        return notification.user?.name || notification.data?.user?.name;
    }

    return (
        <Box sx={{ 
            width: 360, 
            maxHeight: 500, 
            overflow: 'auto', 
            bgcolor: 'background.paper',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: '#555'
                }
            }
        }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 600, borderBottom: 1, borderColor: 'divider' }}>
                Thông báo
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
                                bgcolor: notification.read_at ? 'inherit' : 'action.hover',
                                '&:hover': {
                                    bgcolor: 'action.selected'
                                },
                                borderBottom: 1,
                                borderColor: 'divider'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={getAvatarUrl(notification)} alt={getUserName(notification)} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={getNotificationContent(notification)}
                                secondary={formatDistanceToNow(new Date(notification.created_at), { 
                                    addSuffix: true,
                                    locale: vi 
                                })}
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    sx: { 
                                        fontWeight: notification.read_at ? 400 : 600,
                                        fontSize: '0.9rem',
                                        lineHeight: 1.4
                                    }
                                }}
                                secondaryTypographyProps={{
                                    sx: { fontSize: '0.8rem' }
                                }}
                            />
                            {!notification.read_at && (
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                        ml: 1,
                                        flexShrink: 0
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
        </Box>
    );
};

export default Notification;
