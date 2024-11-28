import { useEffect, useState, useRef } from "react";
import React from 'react';
import axiosInstance from "@/axios";
import { toast } from 'react-toastify';
import { Box, Typography, Dialog, Button, Avatar, CircularProgress } from '@mui/material';
import PostCompo from '@/components/Posts/Posts';
import CreatePost from '@/components/Posts/CreatePost';
import { useSelector } from "react-redux";

const Posts = ({ userData }) => {
  const currentUser = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const loadingRef = useRef(false);

  const fetchPosts = async (isInitial = false) => {
    if (loadingRef.current) return;
    
    try {
      setLoading(true);
      loadingRef.current = true;
      
      const currentOffset = isInitial ? 0 : offset;
      const response = await axiosInstance.get(`/posts/by/user/${userData?.id}?offset=${currentOffset}`);
      const { posts: newPosts, hasMore: moreData, nextOffset } = response.data;
      
      setPosts(prevPosts => {
        if (isInitial) return newPosts;
        return [...prevPosts, ...newPosts];
      });

      setHasMore(moreData);
      setOffset(nextOffset);
      
    } catch (error) {
      console.error('Lỗi khi tải bài viết:', error);
      toast.error('Có lỗi xảy ra khi tải bài viết');
    } finally {
      setLoading(false);
      setTimeout(() => {
        loadingRef.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchPosts(true);
    }
  }, [userData]);

  if (!posts.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          Chưa có bài viết nào
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {currentUser.id === userData?.id && (
        <>
          <Button
            variant="contained"
            onClick={() => setOpenCreatePost(true)}
            sx={{
              textTransform: 'none',
              width: '100%',
              mb: 2,
              p: 2,
              borderRadius: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#65676B',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&:hover': {
                backgroundColor: '#F0F2F5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              },
              justifyContent: 'flex-start',
              fontSize: '1rem'
            }}
          >
            <Avatar src={userData?.avatar} sx={{ width: 40, height: 40 }} />
            <Typography sx={{ color: '#65676B' }}>Bạn đang nghĩ gì thế?</Typography>
          </Button>

          <Dialog
            open={openCreatePost}
            onClose={() => setOpenCreatePost(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
              }
            }}
          >
            <CreatePost 
              setPosts={setPosts}
              onClose={() => setOpenCreatePost(false)}
            />
          </Dialog>
        </>
      )}

      <PostCompo
        posts={posts}
        setPosts={setPosts}
        hasMore={hasMore}
        loading={loading}
        onLoadMore={fetchPosts}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {hasMore && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Button
            variant="contained"
            onClick={() => fetchPosts()}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              py: 1
            }}
          >
            Xem thêm
          </Button>
        </Box>
      )}

      {!hasMore && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Đã hiển thị tất cả bài viết
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Posts;
