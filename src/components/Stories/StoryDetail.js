import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/axios';
import StoryViewer from './StoryViewer';
import NotFound from '../errors/404';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axiosInstance.get(`/story/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error('Lỗi khi tải story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, navigate]);
  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'black'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Nếu có dữ liệu story, chuyển đổi format để phù hợp với StoryViewer
  const formattedStories = story ? [
    {
      id: story.user.id,
      name: story.user.name,
      avatar: story.user?.avatar || "/user_default.png",
      stories: [story]
    }
  ] : [];

  if(!story){
    return <NotFound message='Tin không tồn tại' />;
  }

  return (
    <StoryViewer
      open={true}
      stories={formattedStories}
      initialStoryIndex={0}
      onClose={() => navigate('/')}
      setStories={() => {}} // Không cần cập nhật stories trong trường hợp này
    />
  );
};

export default StoryDetail;
