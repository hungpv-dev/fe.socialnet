import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import {
  Edit,
  LocationOn,
  Phone,
  Favorite,
  Home,
  Cake,
  Wc
} from '@mui/icons-material';

const Introduction = ( {userData} ) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Thông tin cá nhân</Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nơi sống</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography>Sống tại {userData?.address}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Home sx={{ mr: 1 }} />
            <Typography>Đến từ {userData?.hometown}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Thông tin cơ bản</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Wc sx={{ mr: 1 }} />
            <Typography>Giới tính: {userData?.gender === 'male' ? 'Nam' : userData?.gender === 'female' ? 'Nữ' : 'Khác'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Cake sx={{ mr: 1 }} />
            <Typography>Sinh nhật: {new Date(userData?.birthday).toLocaleDateString('vi-VN')}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Thông tin liên hệ</Typography>
          {userData?.phone ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography>{userData.phone}</Typography>
            </Box>
          ) : (
            <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 1 }}>
              Thêm số điện thoại
            </Button>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Mối quan hệ</Typography>
          {userData?.relationship ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Favorite sx={{ mr: 1 }} />
              <Typography>{userData.relationship === 'single' ? 'Độc thân' : userData.relationship}</Typography>
            </Box>
          ) : (
            <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 1 }}>
              Thêm tình trạng mối quan hệ
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Introduction;