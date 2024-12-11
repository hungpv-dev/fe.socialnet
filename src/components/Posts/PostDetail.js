import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Paper } from '@mui/material';
import axiosInstance from '@/axios';
import Post from './Post';
import NotFound from '../errors/404';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return <NotFound message='Không tìm thấy bài viết!' />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          p: 3,
          borderRadius: 2
        }}
      >
        <Post
            post={post}
            redirectDetail={true}
        />
      </Paper>
    </Box>
  );
};

export default PostDetail;
