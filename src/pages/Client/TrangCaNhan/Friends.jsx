import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
} from '@mui/material';

const Friends = () => {
  const friendsList = [
    { id: 1, name: "Nguyễn Văn A", mutualFriends: 5, avatar: "https://via.placeholder.com/150" },
    { id: 2, name: "Trần Thị B", mutualFriends: 3, avatar: "https://via.placeholder.com/150" },
    { id: 3, name: "Lê Văn C", mutualFriends: 8, avatar: "https://via.placeholder.com/150" },
    // Thêm nhiều bạn bè khác...
  ];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Bạn bè</Typography>
          <Typography color="primary" sx={{ cursor: 'pointer' }}>
            Tìm bạn bè
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
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {friend.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {friend.mutualFriends} bạn chung
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="contained" fullWidth>
                    Bạn bè
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Friends; 