import { useEffect, useState } from "react";
import React from 'react';

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
  TextField
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  School,
  LocationOn,
  RssFeed,
  Instagram,
  ThumbUp,
  Comment,
  Close
} from '@mui/icons-material';
import Introduction from './Introduction';
import Friends from './Friends';
import Photos from './Photos';
import Videos from './Videos';

const Canhan = () => {
  const [openStoryDialog, setOpenStoryDialog] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openCoverDialog, setOpenCoverDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

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
  };

  const handleOpenCoverDialog = () => {
    setOpenCoverDialog(true);
  };

  const handleCloseCoverDialog = () => {
    setOpenCoverDialog(false);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return <Introduction />;
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
                  <Avatar sx={{ mr: 2 }} />
                  <Button fullWidth variant="outlined" sx={{ borderRadius: 20 }}>
                    Bạn đang nghĩ gì?
                  </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button startIcon={<PhotoCamera />}>Ảnh/Video</Button>
              </CardContent>
            </Card>

            {[1,2].map((post) => (
              <Card key={post} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Anh Thư</Typography>
                      <Typography variant="caption">31 tháng 5</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ mb: 2 }}>
                    {post === 1 ? 'Living for yourself, not for anyone else' : 'Tips tạo dáng khi ngồi cho các nàng :)))'}
                  </Typography>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {[1,2,3].map((img) => (
                      <Grid item xs={4} key={img}>
                        <img
                          src="https://via.placeholder.com/300x400"
                          alt=""
                          style={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Anh Thư và 2 người khác</Typography>
                    <Typography variant="body2">{post === 1 ? '6' : '10'}</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button startIcon={<ThumbUp />}>Thích</Button>
                    <Button startIcon={<Comment />}>Bình luận</Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
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
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM8MyajtJunf-jP0Hz_C1qvwE3pBTI-jR36A&s"
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
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Chọn ảnh bìa mới
                </Button>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM8MyajtJunf-jP0Hz_C1qvwE3pBTI-jR36A&s"
                  alt="Cover"
                  style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCoverDialog}>Hủy</Button>
              <Button variant="contained" color="primary">
                Lưu thay đổi
              </Button>
            </DialogActions>
          </Dialog>

          {/* Profile Section */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4, mt: -6 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiyrpSorxQ9z2cYsy0ueHGseMCrnOYizDKbQ&s"
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
              <Typography variant="h4" fontWeight="bold">User</Typography>
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
                />
                <TextField
                  fullWidth
                  label="Tiểu sử"
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Trường học"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Nơi sống"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Instagram"
                  variant="outlined"
                  sx={{ mb: 2 }}
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
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Chọn ảnh
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAvatarDialog}>Hủy</Button>
              <Button variant="contained" color="primary">
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
                    <Typography>Cao đẳng FPT PolyTechnic</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1 }} />
                    <Typography>Đến từ Thanh Thủy - Phú Thọ</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RssFeed sx={{ mr: 1 }} />
                    <Typography>Có 200 người theo dõi</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Instagram sx={{ mr: 1 }} />
                    <Typography color="primary">pathuw__</Typography>
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
                    {[1,2,3,4,5,6].map((item) => (
                      <Grid item xs={4} key={item}>
                        <img 
                          src="https://via.placeholder.com/100"
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
