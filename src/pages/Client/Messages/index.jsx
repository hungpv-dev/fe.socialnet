import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Content from "@/components/Messages/Content";

const Messages = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <Box id="content-none" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
        <Paper elevation={0} sx={{ p: 4, maxWidth: 600, width: '100%', bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'medium', color: 'text.primary' }}>
            Tin nhắn của bạn
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
            Gửi tin nhắn riêng tư và an toàn cho bạn bè và nhóm
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {[
              { icon: <ChatBubbleOutlineIcon />, text: 'Bắt đầu cuộc trò chuyện mới', action: 'Tạo' },
              { icon: <PersonAddOutlinedIcon />, text: 'Thêm bạn bè vào danh bạ', action: 'Thêm' },
              { icon: <SearchOutlinedIcon />, text: 'Tìm kiếm tin nhắn và người dùng', action: 'Tìm kiếm' },
            ].map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(item.icon, { sx: { fontSize: 24, color: 'primary.main', mr: 2 } })}
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>{item.text}</Typography>
                  </Box>
                  <Button variant="outlined" size="small">{item.action}</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    );
  }

  return <Content />;
}

export default Messages;