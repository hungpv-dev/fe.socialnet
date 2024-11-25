import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from "@/axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { 
  Box,
  Container,
  Button,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogContentText,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  School,
  LocationOn,
  RssFeed,
  Close,
  PersonAdd,
  Message,
  Phone,
  Wc,
  Cake,
  Favorite
} from '@mui/icons-material';
import Introduction from './Introduction';
import Friends from './Friends';
import Photos from './Photos';
import Videos from './Videos';
import { useParams } from "react-router-dom";
import useChatRoom from "@/hooks/useChatRoom";
import useFriend from "@/hooks/useFriend";
import { useSelector } from "react-redux";

const Canhan = () => {
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openCoverDialog, setOpenCoverDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [avatarCaption, setAvatarCaption] = useState('');
  const [coverCaption, setCoverCaption] = useState('');
  const [avatarPrivacy, setAvatarPrivacy] = useState('public');
  const [coverPrivacy, setCoverPrivacy] = useState('public');
  const { id } = useParams();
  const navigate = useNavigate();
  const chatRoom = useChatRoom();
  const friendApi = useFriend();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  // Form state for profile editing
  const [editForm, setEditForm] = useState({
    name: '',
    address: '',
    hometown: '',
    phone: '',
    gender: '',
    birthday: '',
    relationship: ''
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        address: user.address || '',
        hometown: user.hometown || '',
        phone: user.phone || '',
        gender: user.gender || '',
        birthday: user.birthday || '',
        relationship: user.relationship || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const handleGlobalPaste = (e) => {
      if (!openAvatarDialog && !openCoverDialog) return;
      
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (openAvatarDialog) {
            setSelectedAvatar(blob);
          } else {
            setSelectedCover(blob);
          }
          break;
        }
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
    };
  }, [openAvatarDialog, openCoverDialog]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file ảnh hợp lệ!');
        return;
      }
      setSelectedAvatar(file);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file ảnh hợp lệ!');
        return;
      }
      setSelectedCover(file);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      if (!selectedAvatar) {
        toast.warning('Vui lòng tải lên ảnh đại diện!');
        return;
      }

      if (!selectedAvatar.type.startsWith('image/')) {
        toast.error('Định dạng không hợp lệ!');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', selectedAvatar);
      formData.append('content', avatarCaption);
      formData.append('status', avatarPrivacy);

      const response = await axiosInstance.post('/user/avatar/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        await reUser();
        setOpenAvatarDialog(false);
        setSelectedAvatar(null);
        setAvatarCaption('');
        toast.success('Cập nhật ảnh đại diện thành công!');
      }

    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật ảnh đại diện');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axiosInstance.put('/user/profile/update', editForm);
      
      if (response.status === 200) {
        await reUser();
        setOpenEditDialog(false);
        toast.success('Cập nhật thông tin cá nhân thành công!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.errors) {
        // Show validation errors
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(key => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
      }
    }
  };

  async function reUser(){
    const userResponse = await axiosInstance.get(`/user/${id}`);
    setUser(userResponse.data);
  }

  const handleSaveCover = async () => {
    try {
      if (!selectedCover) {
        toast.warning('Vui lòng tải lên ảnh bìa!');
        return;
      }

      const formData = new FormData();
      formData.append('background', selectedCover);
      formData.append('content', coverCaption);
      formData.append('status', coverPrivacy);

      const response = await axiosInstance.post('/user/background/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const userResponse = await axiosInstance.get(`/user/${id}`);
        setUser(userResponse.data);
        setOpenCoverDialog(false);
        setSelectedCover(null);
        setCoverCaption('');
        toast.success('Cập nhật ảnh bìa thành công!');
      }
    } catch (error) {
      console.error('Error updating cover:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật ảnh bìa');
    }
  };
  const handleOpenAvatarDialog = () => {
    if (currentUser.id !== user?.id) {
      return;
    }
    setOpenAvatarDialog(true);
  };

  const handleCloseAvatarDialog = () => {
    setOpenAvatarDialog(false);
    setSelectedAvatar(null);
    setAvatarCaption('');
  };

  const handleOpenCoverDialog = () => {
    if (currentUser.id !== user?.id) {
      return;
    }
    setOpenCoverDialog(true);
  };

  const handleCloseCoverDialog = () => {
    setOpenCoverDialog(false);
    setSelectedCover(null);
    setCoverCaption('');
  };

  const handleOpenEditDialog = () => {
    if (currentUser.id !== user?.id) {
      return;
    }
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
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

  const handleAcceptFriend = async (userId) => {
    await friendApi.accept(userId);
    reUser();
  };

  const handleRejectFriend = async (userId) => {
    await friendApi.reject(userId);
    reUser();
  };

  const handleDeleteFriend = async (userId) => {
    await friendApi.deleteFriend(userId);
    reUser();
  };

  const handleDeleteFriendSuccess = async (userId) => {
    await friendApi.deleteFriendSuccess(userId);
    reUser();
  };

  const handleAddFriend = async (userId) => {
    await friendApi.add(userId);
    reUser();
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
      await handleDeleteFriendSuccess(selectedFriendId);
      handleCloseConfirmDialog();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return <Introduction userData={user} />;
      case 'friends':
        return <Friends userData={user} />;
      case 'photos':
        return <Photos />;
      case 'videos':
        return <Videos />;
      case 'posts':
      default:
        return (
          <>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }} src={user?.avatar} />
                  <Button fullWidth variant="outlined" sx={{ borderRadius: 20 }}>
                    Bạn đang nghĩ gì?
                  </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button startIcon={<PhotoCamera />}>Ảnh/Video</Button>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', height: '100vh', overflowY: 'auto' }}>
      <Container maxWidth="lg" sx={{ pt: 0 }}>
        <Box sx={{ position: 'relative' }}>
          {/* Cover Image */}
          <Card sx={{ mb: 2, pt: 0 }}>
            <CardMedia
              component="img"
              image={user?.cover_avatar || '/cover_default.png'}
              alt="Cover"
              onClick={handleOpenCoverDialog}
              sx={{ 
                cursor: currentUser.id === user?.id ? 'pointer' : 'default',
                height: 400,
                objectFit: 'cover'
              }}
            />
          </Card>

          {/* Cover Image Dialog */}
          <Dialog
            open={openCoverDialog}
            onClose={handleCloseCoverDialog}
            maxWidth="lg"
            fullWidth
            scroll="paper"
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Ảnh bìa</Typography>
                <IconButton onClick={handleCloseCoverDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Hãy viết gì đó về ảnh bìa..."
                  variant="outlined"
                  value={coverCaption}
                  onChange={(e) => setCoverCaption(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="cover-upload"
                  type="file"
                  onChange={handleCoverChange}
                />
                <label htmlFor="cover-upload">
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    fullWidth
                    sx={{ mb: 2 }}
                    component="span"
                  >
                    Chọn ảnh
                  </Button>
                </label>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
                  Hoặc dán ảnh trực tiếp (Ctrl+V)
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <RadioGroup
                    row
                    value={coverPrivacy}
                    onChange={(e) => setCoverPrivacy(e.target.value)}
                  >
                    <FormControlLabel value="public" control={<Radio />} label="Công khai" />
                    <FormControlLabel value="friend" control={<Radio />} label="Bạn bè" />
                    <FormControlLabel value="private" control={<Radio />} label="Chỉ mình tôi" />
                  </RadioGroup>
                </FormControl>
                {selectedCover && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={URL.createObjectURL(selectedCover)}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCoverDialog}>Hủy</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveCover}
              >
                Lưu thay đổi
              </Button>
            </DialogActions>
          </Dialog>

          {/* Profile Section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 4, mt: -6 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={user?.avatar || "/user_default.png"}
                  sx={{ width: 138, height: 138, border: 3, borderColor: 'background.paper', cursor: currentUser.id === user?.id ? 'pointer' : 'default' }}
                  onClick={handleOpenAvatarDialog}
                />
                {currentUser.id === user?.id && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.200' }
                    }}
                    onClick={handleOpenAvatarDialog}
                  >
                    <PhotoCamera />
                  </IconButton>
                )}
              </Box>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h4" fontWeight="bold">{user?.name || 'User'}</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                  {user?.friend_counts} bạn bè · {user?.follower} người theo dõi
                </Typography>
                {user?.friend_commons && user.friend_commons.length > 0 && (
                  <Typography variant="body2" color="textSecondary">
                    {user.friend_commons.length} bạn chung
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user?.button?.includes('accept') && (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<PersonAdd />}
                  onClick={() => handleAcceptFriend(user.id)}
                >
                  Chấp nhận lời mời
                </Button>
              )}
              
              {user?.button?.includes('reject') && (
                <Button 
                  variant="outlined"
                  color="error"
                  onClick={() => handleRejectFriend(user.id)}
                >
                  Từ chối
                </Button>
              )}

              {user?.button?.includes('delete') && (
                <Button 
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteFriend(user.id)}
                >
                  Hủy kết bạn
                </Button>
              )}

              {user?.button?.includes('friend') && (
                <Button 
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpenConfirmDialog(user.id)}
                >
                  Bạn bè
                </Button>
              )}

              {user?.button?.includes('add') && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PersonAdd />}
                  onClick={() => handleAddFriend(user.id)}
                >
                  Thêm bạn bè
                </Button>
              )}

              {user?.button?.includes('chat') && (
                <Button
                  variant="contained"
                  color="primary" 
                  startIcon={<Message />}
                  onClick={() => handleStartChat(user.id)}
                >
                  Nhắn tin
                </Button>
              )}

              {currentUser.id === user?.id && (
                <>
                  <Button 
                    variant="contained" 
                    startIcon={<Edit />} 
                    color="inherit"
                    onClick={handleOpenEditDialog}
                  >
                    Chỉnh sửa trang cá nhân
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {/* Edit Profile Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Chỉnh sửa trang cá nhân</Typography>
                <IconButton onClick={handleCloseEditDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Tên hiển thị"
                  name="name"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={editForm.name}
                  onChange={handleFormChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={editForm.phone}
                  onChange={handleFormChange}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleFormChange}
                    label="Giới tính"
                  >
                    <MenuItem value="male">Nam</MenuItem>
                    <MenuItem value="female">Nữ</MenuItem>
                    <MenuItem value="other">Khác</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  name="birthday"
                  type="date"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={editForm.birthday}
                  onChange={handleFormChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tình trạng mối quan hệ</InputLabel>
                  <Select
                    name="relationship"
                    value={editForm.relationship}
                    onChange={handleFormChange}
                    label="Tình trạng mối quan hệ"
                  >
                    <MenuItem value="single">Độc thân</MenuItem>
                    <MenuItem value="married">Đã kết hôn</MenuItem>
                    <MenuItem value="divorced">Đã ly hôn</MenuItem>
                    <MenuItem value="widowed">Góa phụ/phu</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Địa chỉ hiện tại"
                  name="address"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={editForm.address}
                  onChange={handleFormChange}
                />
                <TextField
                  fullWidth
                  label="Quê quán"
                  name="hometown"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={editForm.hometown}
                  onChange={handleFormChange}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Hủy</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveProfile}
              >
                Lưu thay đổi
              </Button>
            </DialogActions>
          </Dialog>

          {/* Avatar Update Dialog */}
          <Dialog
            open={openAvatarDialog}
            onClose={handleCloseAvatarDialog}
            maxWidth="sm"
            fullWidth
            scroll="paper"
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Cập nhật ảnh đại diện</Typography>
                <IconButton onClick={handleCloseAvatarDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Hãy viết gì đó về ảnh đại diện..."
                  variant="outlined"
                  value={avatarCaption}
                  onChange={(e) => setAvatarCaption(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    fullWidth
                    sx={{ mb: 2 }}
                    component="span"
                  >
                    Chọn ảnh
                  </Button>
                </label>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
                  Hoặc dán ảnh trực tiếp (Ctrl+V)
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <RadioGroup
                    row
                    value={avatarPrivacy}
                    onChange={(e) => setAvatarPrivacy(e.target.value)}
                  >
                    <FormControlLabel value="public" control={<Radio />} label="Công khai" />
                    <FormControlLabel value="friend" control={<Radio />} label="Bạn bè" />
                    <FormControlLabel value="private" control={<Radio />} label="Chỉ mình tôi" />
                  </RadioGroup>
                </FormControl>
                {selectedAvatar && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={URL.createObjectURL(selectedAvatar)}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAvatarDialog}>Hủy</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveAvatar}
              >
                Lưu thay đổi
              </Button>
            </DialogActions>
          </Dialog>

          {/* Navigation */}
          <Paper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', p: 2, overflowX: 'auto' }}>
              <Button 
                color={activeTab === 'posts' ? 'primary' : 'inherit'}
                onClick={() => setActiveTab('posts')}
              >
                Bài viết
              </Button>
              <Button
                color={activeTab === 'about' ? 'primary' : 'inherit'}
                onClick={() => setActiveTab('about')}
              >
                Giới thiệu
              </Button>
              <Button
                color={activeTab === 'friends' ? 'primary' : 'inherit'}
                onClick={() => setActiveTab('friends')}
              >
                Bạn bè
              </Button>
              <Button
                color={activeTab === 'photos' ? 'primary' : 'inherit'}
                onClick={() => setActiveTab('photos')}
              >
                Ảnh
              </Button>
              <Button
                color={activeTab === 'videos' ? 'primary' : 'inherit'}
                onClick={() => setActiveTab('videos')}
              >
                Video
              </Button>
            </Box>
          </Paper>

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Giới thiệu</Typography>
                  {(user?.hometown || user?.address || user?.phone) ? (
                    <>
                      {user?.hometown && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ mr: 1 }} />
                          <Typography>Quê quán: {user.hometown}</Typography>
                        </Box>
                      )}

                      {user?.address && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ mr: 1 }} />
                          <Typography>Sống tại: {user.address}</Typography>
                        </Box>
                      )}

                      {user?.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Phone sx={{ mr: 1 }} />
                          <Typography>Điện thoại: {user.phone}</Typography>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Typography color="textSecondary" align="center" sx={{ my: 2 }}>
                      Chưa có thông tin giới thiệu
                    </Typography>
                  )}

                  {currentUser.id === user?.id && (
                    <Button
                      fullWidth variant="outlined"
                      onClick={handleOpenEditDialog}
                    >
                      Chỉnh sửa chi tiết
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Ảnh</Typography>
                  <Grid container spacing={1}>
                    {user?.photos && user.photos.slice(0, 6).map((photo, index) => (
                      <Grid item xs={4} key={index}>
                        <img 
                          src={photo.url}
                          alt=""
                          style={{ width: '100%', height: 100, objectFit: 'cover' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Button fullWidth sx={{ mt: 2 }}>Xem tất cả ảnh</Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={8} style={{ 
              marginBottom: '100px'
             }}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
      </Container>
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
    </Box>
  );
};

export default Canhan;                   
