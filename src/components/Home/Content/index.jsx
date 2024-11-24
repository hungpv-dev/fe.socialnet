import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import Posts from "@/components/Posts/Posts";
import { Dialog, Button, Avatar, Typography, CircularProgress, Box } from "@mui/material";
import CreatePost from "@/components/Posts/CreatePost";
import { useState, useEffect, useRef } from "react";
import Stories from "@/components/Stories/Stories";
import { useSelector } from "react-redux";
import axiosInstance from "@/axios";

const cx = classNames.bind(styles);

function Content() {
  const user = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const fetchPosts = async () => {
    if (loadingRef.current) return;
    
    try {
      setLoading(true);
      loadingRef.current = true;
      const excludeIds = posts.map(post => post.id).join(',');
      const response = await axiosInstance.get(`posts?ids=${excludeIds}`);
      const newPosts = response.data;
      
      setPosts(prevPosts => {
        // Lọc bỏ các bài viết trùng lặp
        const uniquePosts = newPosts.filter(newPost => 
          !prevPosts.some(existingPost => existingPost.id === newPost.id)
        );
        return [...prevPosts, ...uniquePosts];
      });

      if (newPosts.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
      // Đặt timeout để tránh gọi API liên tục
      setTimeout(() => {
        loadingRef.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = (e) => {
    const element = e.target;
    const { scrollHeight, scrollTop, clientHeight } = element;
    
    if (scrollTop + clientHeight >= scrollHeight - 1000 && !loading && hasMore && !loadingRef.current) {
      fetchPosts();
    }
  };

  useEffect(() => {
    const homeContent = document.querySelector(`.${cx('home-content')}`);
    if (homeContent) {
      homeContent.addEventListener('scroll', handleScroll);
      return () => homeContent.removeEventListener('scroll', handleScroll);
    }
  }, [loading, hasMore]);

  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <div className={cx("home-content")} style={{ height: '100vh', overflowY: 'auto' }}>
      <Stories />
      <div>
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
          <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
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
          <CreatePost setPosts={setPosts} onClose={() => setOpenCreatePost(false)} />
        </Dialog>

        <Posts setPosts={setPosts} posts={posts} />
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={30} thickness={4} />
          </Box>
        )}
        {!hasMore && (
          <Typography sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
            Đã hiển thị tất cả bài viết
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Content;
