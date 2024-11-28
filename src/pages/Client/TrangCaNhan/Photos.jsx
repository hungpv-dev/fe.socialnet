import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import axiosInstance from '@/axios';
import { useNavigate } from 'react-router-dom';

const Photos = ( { userData } ) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [avatars, setAvatars] = useState({
    data: [],
    currentPage: 1,
    lastPage: 1,
    loading: false
  });
  const [backgrounds, setBackgrounds] = useState({
    data: [],
    currentPage: 1, 
    lastPage: 1,
    loading: false
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadMoreAvatars = async () => {
    if (avatars.loading || avatars.currentPage > avatars.lastPage) return;
    
    try {
      setAvatars(prev => ({ ...prev, loading: true }));
      const response = await axiosInstance.get(`/user/avatar/list?page=${avatars.currentPage}&user=${userData.id}`);
      
      setAvatars(prev => ({
        data: [...prev.data, ...response.data.data],
        currentPage: response.data.current_page + 1,
        lastPage: response.data.last_page,
        loading: false
      }));
    } catch (error) {
      console.error('Lỗi khi tải thêm ảnh đại diện:', error);
      setAvatars(prev => ({ ...prev, loading: false }));
    }
  };

  const loadMoreBackgrounds = async () => {
    if (backgrounds.loading || backgrounds.currentPage > backgrounds.lastPage) return;

    try {
      setBackgrounds(prev => ({ ...prev, loading: true }));
      const response = await axiosInstance.get(`/user/background/list?page=${backgrounds.currentPage}&user=${userData.id}`);
      
      setBackgrounds(prev => ({
        data: [...prev.data, ...response.data.data],
        currentPage: response.data.current_page + 1,
        lastPage: response.data.last_page,
        loading: false
      }));
    } catch (error) {
      console.error('Lỗi khi tải thêm ảnh bìa:', error);
      setBackgrounds(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadMoreAvatars();
    loadMoreBackgrounds();
  }, []);

  return (
    <Card>
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Ảnh đại diện" />
            <Tab label="Ảnh nền" />
          </Tabs>
        </Box>

        {value === 0 && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Ảnh đại diện</Typography>
            </Box>

            <Grid container spacing={2}>
              {avatars.data.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                  <img
                    src={photo.data.image[0]}
                    alt=""
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/posts/${photo.id}`)}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {new Date(photo.created_at).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="body2">
                      {photo.content}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {avatars.currentPage <= avatars.lastPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={loadMoreAvatars}
                  disabled={avatars.loading}
                >
                  {avatars.loading ? <CircularProgress size={24} /> : 'Xem thêm'}
                </Button>
              </Box>
            )}
          </>
        )}

        {value === 1 && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Ảnh nền</Typography>
            </Box>

            <Grid container spacing={2}>
              {backgrounds.data.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                  <img
                    src={photo.data.image[0]}
                    alt=""
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/posts/${photo.id}`)}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {new Date(photo.created_at).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="body2">
                      {photo.content}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {backgrounds.currentPage <= backgrounds.lastPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  variant="outlined"
                  onClick={loadMoreBackgrounds}
                  disabled={backgrounds.loading}
                >
                  {backgrounds.loading ? <CircularProgress size={24} /> : 'Xem thêm'}
                </Button>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Photos;