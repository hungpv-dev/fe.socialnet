import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import Posts from "@/components/Posts/Posts";
import { Dialog, Button, Avatar, Typography } from "@mui/material";
import CreatePost from "@/components/Posts/CreatePost";
import { useState, useEffect } from "react";
import Stories from "@/components/Stories/Stories";
import { useSelector } from "react-redux";
import axiosInstance from "@/axios";

const cx = classNames.bind(styles);

function Content() {
  const user = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const excludeIds = posts.map(post => post.id).join(',');
      const response = await axiosInstance.get(`posts?ids=${excludeIds}`);
      const newPosts = response.data;
      
      setPosts(prevPosts => [...prevPosts, ...newPosts]);

      if (newPosts.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = (e) => {
    const element = e.target;
    const { scrollHeight, scrollTop, clientHeight } = element;
    
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {
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
          <CreatePost onClose={() => setOpenCreatePost(false)} />
        </Dialog>

        <Posts posts={posts} />
        {loading && (
          <Typography sx={{ textAlign: 'center', py: 2 }}>Đang tải thêm bài viết...</Typography>
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
