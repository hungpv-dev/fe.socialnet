import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

const Videos = () => {
  const videos = [
    { 
      id: 1, 
      thumbnail: "https://via.placeholder.com/300",
      title: "Video của tôi",
      views: 120,
      date: "20/05/2024"
    },
    { 
      id: 2, 
      thumbnail: "https://via.placeholder.com/300",
      title: "Kỷ niệm đẹp",
      views: 89,
      date: "15/05/2024"
    },
    // Thêm nhiều video khác...
  ];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Video</Typography>
          <Button variant="contained">Thêm video</Button>
        </Box>

        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={video.thumbnail}
                    alt=""
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <PlayArrow sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.views} lượt xem • {video.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Videos; 