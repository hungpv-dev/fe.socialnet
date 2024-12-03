import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import axiosInstance from '@/axios';
import { useNavigate } from 'react-router-dom';
import useChatRoom from '@/hooks/useChatRoom';
import useFriend from '@/hooks/useFriend';

const Friends = ( { userData } ) => {
  const [friendsList, setFriendsList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const chatRoom = useChatRoom();
  const friendApi = useFriend();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance(`/friend/list/${userData.id}?index=${friendsList.length}`);
        const data = response.data;
        
        if(data.length === 0) {
          setHasMore(false);
          return;
        }
        
        setFriendsList(prev => [...prev, ...data]);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      }
    };

    if (userData?.id) {
      fetchFriends();
    }
  }, [userData]);

  const handleLoadMore = () => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance(`/friend/list/${userData.id}?index=${friendsList.length}`);
        const data = response.data;
        
        if(data.length === 0) {
          setHasMore(false);
          return;
        }
        
        setFriendsList(prev => [...prev, ...data]);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      }
    };
    fetchFriends();
  };

  const handleNavigateToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleStartChat = async (userId) => {
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

  const handleOpenConfirmDialog = (userId) => {
    setSelectedFriendId(userId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedFriendId(null);
  };

  const handleConfirmUnfriend = async () => {
    if (selectedFriendId) {
      await friendApi.deleteFriendSuccess(selectedFriendId);
      setFriendsList(prev => prev.filter(friend => friend.id !== selectedFriendId));
      handleCloseConfirmDialog();
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Bạn bè</Typography>
          <Typography color="primary" sx={{ cursor: 'pointer' }}>
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {friendsList.length} người bạn
        </Typography>

        <Grid container spacing={2}>
          {friendsList.map((friend) => (
            <Grid item xs={12} sm={6} md={4} key={friend.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={friend.avatar}
                      sx={{ width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight="bold"
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                        onClick={() => handleNavigateToProfile(friend.id)}
                      >
                        {friend.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {friend.friend_common?.length || 0} bạn chung
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {friend.follower} người theo dõi
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {friend.button.includes('friend') && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        fullWidth
                        onClick={() => handleOpenConfirmDialog(friend.id)}
                      >
                        Bạn bè
                      </Button>
                    )}
                    {friend.button.includes('chat') && (
                      <Button 
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        onClick={() => handleStartChat(friend.id)}
                      >
                        Nhắn tin
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={handleLoadMore}
            >
              Xem thêm
            </Button>
          </Box>
        )}
      </CardContent>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Hủy kết bạn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn hủy kết bạn với người này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Hủy</Button>
          <Button onClick={handleConfirmUnfriend} color="error" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Friends;