import { Box, Typography, Divider, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import { useSelector } from 'react-redux';
import useChatRoom from '@/hooks/useChatRoom';
import { formatDateToNow } from '@/components/FormatDate';
import useFriend from '@/hooks/useFriend';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function RightSidebar() {
    const navigate = useNavigate();
    const chatRoom = useChatRoom();
    const [friendIds, setFriendIds] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const users = useSelector(state => state.user_online);
    const friendApi = useFriend();
    const [friendRequests, setFriendRequests] = useState([]);
    const [suggestedFriends, setSuggestedFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFriendRequests = async () => {
        try {
            const response = await axiosInstance.get('friend/request/all?take=3&index=0');
            setFriendRequests(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lời mời kết bạn:', error);
        }
    };

    const getSuggestedFriends = async () => {
        try {
            const response = await axiosInstance.get('friend/suggest?per_page=3');
            setSuggestedFriends(response.data.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bạn bè gợi ý:', error);
        }
    };

    useEffect(() => {
        const getFriendIds = async () => {
            try {
                const response = await axiosInstance.get('friend-ids');
                setFriendIds(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ID bạn bè:', error);
            }
        };
        getFriendRequests();
        getFriendIds();
    }, []);

    useEffect(() => {
        const filteredFriends = users.filter(user => friendIds.includes(user.id));
        setOnlineFriends(filteredFriends);
    }, [friendIds, users]);

    useEffect(() => {
        if (friendRequests.length === 0) {
            getSuggestedFriends();
        }
    }, [friendRequests]);

    const handleUserClick = async (userId) => {
        try {
            const response = await chatRoom.createPrivateRoom(userId);
            if (response?.data) {
                const room = response.data.data;
                navigate(`/messages/${room.chat_room_id}`);
            }
        } catch (error) {
            console.error('Lỗi khi tạo phòng chat:', error);
        }
    };

    const handleAcceptFriend = async (userId) => {
        await friendApi.accept(userId);
        getFriendRequests();
    };

    const handleRejectFriend = async (userId) => {
        await friendApi.reject(userId);
        getFriendRequests();
    };

    const handleAddFriend = async (userId) => {
        setLoading(true);
        try {
            await friendApi.add(userId);
            getSuggestedFriends();
        } catch (error) {
            console.error('Lỗi khi thêm bạn:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveSuggestion = async (userId) => {
        await friendApi.removeSuggestion(userId);
        getSuggestedFriends();
    };

    return (
        <Box component="aside" sx={{ width: 360, p: 2, bgcolor: 'background.paper',display: { xs: 'none', sm: 'block' } }}>

            <Divider sx={{ my: 2 }} />

            {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Lời mời kết bạn
                        </Typography>
                        <Link to="/friends/request" style={{ textDecoration: 'none' }}>
                            <Typography color="primary" sx={{ fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
                                Xem tất cả
                            </Typography>
                        </Link>
                    </Box>
                     
                    {friendRequests.map((request) => (
                        <Paper key={request.id} elevation={0} sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar 
                                    src={request.sender.avatar || "/user_default.png"} 
                                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                                    onClick={() => navigate(`/profile/${request.sender.id}`)}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography 
                                            variant="subtitle2" 
                                            sx={{ 
                                                fontWeight: 600, 
                                                color: 'text.primary',
                                                cursor: 'pointer',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                            onClick={() => navigate(`/profile/${request.sender.id}`)}
                                        >
                                            {request.sender.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {request.mutualFriends} bạn chung • {formatDateToNow(request.created_at)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            sx={{ 
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                bgcolor: 'primary.main'
                                            }}
                                            onClick={() => handleAcceptFriend(request.sender.id)}
                                        >
                                            Xác nhận
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="small"
                                            sx={{ 
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }}
                                            onClick={() => handleRejectFriend(request.sender.id)}
                                        >
                                            Xóa
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            ) : (
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Gợi ý kết bạn
                        </Typography>
                    </Box>
                     
                    {suggestedFriends.map((suggestion) => (
                        <Paper key={suggestion.id} elevation={0} sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar 
                                    src={suggestion.avatar || "/user_default.png"} 
                                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                                    onClick={() => navigate(`/profile/${suggestion.id}`)}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography 
                                            variant="subtitle2" 
                                            sx={{ 
                                                fontWeight: 600, 
                                                color: 'text.primary',
                                                cursor: 'pointer',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                            onClick={() => navigate(`/profile/${suggestion.id}`)}
                                        >
                                            {suggestion.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {suggestion.friend_commons.length} bạn chung
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            variant="contained" 
                                            size="small" 
                                            sx={{ 
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                bgcolor: 'primary.main'
                                            }}
                                            onClick={() => handleAddFriend(suggestion.id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang gửi...' : 'Thêm bạn bè'}
                                        </Button>
                                        {/* <Button 
                                            variant="outlined" 
                                            size="small"
                                            sx={{ 
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }}
                                            onClick={() => handleRemoveSuggestion(suggestion.id)}
                                        >
                                            Xóa
                                        </Button> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Người liên hệ
            </Typography>

            <List disablePadding>
                {Array.isArray(onlineFriends) && onlineFriends.map((user) => (
                    <ListItem 
                        key={user.id} 
                        onClick={() => handleUserClick(user.id)}
                        sx={{ 
                            px: 1, 
                            py: 0.5,
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                            cursor: 'pointer'
                        }}
                    >
                        <ListItemAvatar>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={`${user.avatar}`} />
                            </StyledBadge>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`${user.name}`}
                            sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default RightSidebar;