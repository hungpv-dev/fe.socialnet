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
  School,
  LocationOn,
  Instagram,
} from '@mui/icons-material';

const Introduction = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Thông tin cá nhân</Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Học vấn</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <School sx={{ mr: 1 }} />
            <Typography>Cao đẳng FPT PolyTechnic</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nơi sống</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography>Đến từ Thanh Thủy - Phú Thọ</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Mạng xã hội</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Instagram sx={{ mr: 1 }} />
            <Typography color="primary">pathuw__</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Thông tin liên hệ</Typography>
          <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 1 }}>
            Thêm số điện thoại
          </Button>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Mối quan hệ</Typography>
          <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 1 }}>
            Thêm tình trạng mối quan hệ
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Introduction; 