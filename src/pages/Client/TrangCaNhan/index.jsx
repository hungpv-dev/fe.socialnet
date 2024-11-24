import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from "@/axios";
import { toast } from 'react-toastify';

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
  Radio
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  School,
  LocationOn,
  RssFeed,
  Instagram,
  Close
} from '@mui/icons-material';
import Introduction from './Introduction';
import Friends from './Friends';
import Photos from './Photos';
import Videos from './Videos';
import { useParams } from "react-router-dom";

const Canhan = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openStoryDialog, setOpenStoryDialog] = useState(false);
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
  }, []);

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
        const userResponse = await axiosInstance.get(`/user/${id}`);
        setUser(userResponse.data);
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

  const handleOpenStoryDialog = () => {
    setOpenStoryDialog(true);
  };

  const handleCloseStoryDialog = () => {
    setOpenStoryDialog(false);
  };

  const handleOpenAvatarDialog = () => {
    setOpenAvatarDialog(true);
  };

  const handleCloseAvatarDialog = () => {
    setOpenAvatarDialog(false);
    setSelectedAvatar(null);
    setAvatarCaption('');
  };

  const handleOpenCoverDialog = () => {
    setOpenCoverDialog(true);
  };

  const handleCloseCoverDialog = () => {
    setOpenCoverDialog(false);
    setSelectedCover(null);
    setCoverCaption('');
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      await axiosInstance.put('/user/profile', profileData);
      // Refresh user data after update
      const response = await axiosInstance.get('/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await axiosInstance.post('/user/posts', postData);
      // Refresh posts after creating new one
      const response = await axiosInstance.get('/user/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return <Introduction userData={user} />;
      case 'friends':
        return <Friends />;
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
                cursor: 'pointer',
                height: 400,
                objectFit: 'cover'
              }}
            />
            <Button
              variant="contained"
              startIcon={<PhotoCamera />}
              sx={{ position: 'absolute', right: 32, bottom: 32, bgcolor: 'grey.300' }}
              onClick={handleOpenCoverDialog}
            >
              Thêm ảnh bìa
            </Button>
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
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4, mt: -6 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={user?.avatar || "/user_default.png"}
                sx={{ width: 138, height: 138, border: 3, borderColor: 'background.paper', cursor: 'pointer' }}
                onClick={handleOpenAvatarDialog}
              />
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
            </Box>
            <Box sx={{ ml: 3, flex: 1 }}>
              <Typography variant="h4" fontWeight="bold">{user?.name || 'User'}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mr: 2 }}
                  onClick={handleOpenStoryDialog}
                >
                  + Thêm vào tin
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<Edit />} 
                  color="inherit"
                  onClick={handleOpenEditDialog}
                >
                  Chỉnh sửa trang cá nhân
                </Button>
              </Box>
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
                  variant="outlined"
                  sx={{ mb: 2 }}
                  defaultValue={user?.name}
                />
                <TextField
                  fullWidth
                  label="Tiểu sử"
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  defaultValue={user?.bio}
                />
                <TextField
                  fullWidth
                  label="Trường học"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  defaultValue={user?.school}
                />
                <TextField
                  fullWidth
                  label="Nơi sống"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  defaultValue={user?.location}
                />
                <TextField
                  fullWidth
                  label="Instagram"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  defaultValue={user?.instagram}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Hủy</Button>
              <Button variant="contained" color="primary">
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

          {/* Story Dialog */}
          <Dialog 
            open={openStoryDialog} 
            onClose={handleCloseStoryDialog}
            maxWidth="sm"
            fullWidth
            scroll="paper"
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Tạo tin</Typography>
                <IconButton onClick={handleCloseStoryDialog}>
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
                  placeholder="Hãy viết gì đó..."
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Thêm ảnh/video
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseStoryDialog}>Hủy</Button>
              <Button variant="contained" color="primary">
                Đăng tin
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
                  <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
                    Thêm tiểu sử
                  </Button>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <School sx={{ mr: 1 }} />
                    <Typography>{user?.school || 'Cao đẳng FPT PolyTechnic'}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1 }} />
                    <Typography>{user?.location || 'Đến từ Thanh Thủy - Phú Thọ'}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RssFeed sx={{ mr: 1 }} />
                    <Typography>Có {user?.followers_count || 0} người theo dõi</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Instagram sx={{ mr: 1 }} />
                    <Typography color="primary">{user?.instagram || 'pathuw__'}</Typography>
                  </Box>

                  <Button fullWidth variant="outlined">
                    Chỉnh sửa chi tiết
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Ảnh</Typography>
                  <Grid container spacing={1}>
                    {user?.photos?.slice(0, 6).map((photo, index) => (
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
            <Grid item xs={12} md={8}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Canhan;                   
