import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
} from '@mui/material';

const Photos = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const photos = [
    { id: 1, url: "https://via.placeholder.com/300", date: "Tháng 5, 2024" },
    { id: 2, url: "https://via.placeholder.com/300", date: "Tháng 5, 2024" },
    { id: 3, url: "https://via.placeholder.com/300", date: "Tháng 4, 2024" },
    // Thêm nhiều ảnh khác...
  ];

  return (
    <Card>
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Ảnh của bạn" />
            <Tab label="Album" />
          </Tabs>
        </Box>

        {value === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Ảnh</Typography>
              <Button variant="contained">Thêm ảnh</Button>
            </Box>

            <Grid container spacing={2}>
              {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                  <img
                    src={photo.url}
                    alt=""
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {photo.date}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {value === 1 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Chưa có album nào
            </Typography>
            <Button variant="contained">Tạo album</Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Photos; 