import React, { useState, useEffect } from 'react';
import { Box, IconButton, Dialog, LinearProgress, Typography, Menu, MenuItem, List, ListItem, ListItemAvatar, Avatar, ListItemText, Slide, CircularProgress } from '@mui/material';
import { Close, ChevronLeft, ChevronRight, VisibilityOutlined, Settings, Public, People, Lock } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { formatDateToNow } from '@/components/FormatDate'
import axios from '@/axios';
import { useSelector } from 'react-redux';

const theme = createTheme();

const StoryViewer = ({ open, onClose, stories, setStories, initialStoryIndex }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewedStories, setViewedStories] = useState(new Set());
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [viewers, setViewers] = useState({data: [], count: 0});
  const [anchorEl, setAnchorEl] = useState(null);
  const [showViewers, setShowViewers] = useState(false);
  const user = useSelector(state => state.user);
  const [isLoadingViewers, setIsLoadingViewers] = useState(false);

  const reactionIcons = [
    { name: "Thích", emoji: "👍" },
    { name: "Yêu thích", emoji: "❤️" },
    { name: "Haha", emoji: "😆" },
    { name: "Wow", emoji: "😮" },
    { name: "Buồn", emoji: "😢" },
    { name: "Phẫn nộ", emoji: "😠" },
  ];

  const privacyOptions = [
    { value: 'public', label: 'Công khai' },
    { value: 'friend', label: 'Bạn bè' },
    { value: 'private', label: 'Riêng tư' }
  ];

  // Thêm object ánh xạ status với icon và title tương ứng
  const statusIcons = {
    public: { icon: <Public sx={{ fontSize: 16 }} />, title: 'Công khai' },
    friend: { icon: <People sx={{ fontSize: 16 }} />, title: 'Bạn bè' },
    private: { icon: <Lock sx={{ fontSize: 16 }} />, title: 'Riêng tư' }
  };

  useEffect(() => {
    if (open) {
      setCurrentUserIndex(initialStoryIndex);
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [open, initialStoryIndex]);

  const currentUser = stories?.[currentUserIndex];
  const currentStory = currentUser?.stories?.[currentStoryIndex];
  const isMyStory = currentUser?.id === user.id;

  useEffect(() => {
    if (currentStory?.user_emotion?.emoji) {
      setCurrentEmotion(currentStory.user_emotion.emoji);
    } else {
      setCurrentEmotion('');
    }
  }, [currentStory]);

  // Lấy danh sách người xem khi click vào số lượng người xem
  const handleViewersClick = async () => {
    if (currentStory?.id && isMyStory) {
      try {
        setIsLoadingViewers(true);
        const response = await axios.get(`story/${currentStory.id}/viewer`);
        setViewers(response.data);
        setShowViewers(true);
        setIsPaused(true);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người xem:', error);
      } finally {
        setIsLoadingViewers(false);
      }
    }
  };

  // Gửi request khi xem story mới
  useEffect(() => {
    const markStoryAsViewed = async () => {
      if (!currentStory?.id || viewedStories.has(currentStory.id) || !open || isMyStory) return;

      try {
        await axios.post(`story/${currentStory.id}/emotion`,{emoji: ''});
        setViewedStories(prev => new Set([...prev, currentStory.id]));
      } catch (error) {
        console.error('Lỗi khi đánh dấu story đã xem:', error);
      }
    };

    if (currentStory) {
      markStoryAsViewed();
    }
  }, [currentStory, viewedStories, open, isMyStory]);

  useEffect(() => {
    if (!open || isPaused) return;
    
    // Nếu là video dài hơn 5s thì không dùng interval
    if (currentStory?.file?.video && videoDuration > 5) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        if (newProgress >= 100) {
          handleNext();
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [open, currentStoryIndex, videoDuration, isPaused]);

  const handleNext = () => {
    setShowViewers(false);
    if (currentStoryIndex < currentUser?.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    setShowViewers(false);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      const previousUser = stories[currentUserIndex - 1];
      setCurrentStoryIndex(previousUser.stories.length - 1);
      setProgress(0);
    }
  };

  const handleLoadedMetadata = (e) => {
    setVideoDuration(e.target.duration);
  };

  const handleContentClick = () => {
    setIsPaused(!isPaused);
  };

  const handleReactionClick = async (reaction) => {
    try {
      await axios.post(`story/${currentStory.id}/emotion`,{
        emoji: reaction.emoji
      });
      
      // Cập nhật lại stories
      const updatedStories = stories.map(user => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            stories: user.stories.map(story => {
              if (story.id === currentStory.id) {
                return {
                  ...story,
                  user_emotion: {
                    ...story.user_emotion,
                    emoji: reaction.emoji
                  }
                };
              }
              return story;
            })
          };
        }
        return user;
      });

      setStories(updatedStories);
      setCurrentEmotion(reaction.emoji);
    } catch (error) {
      console.error('Lỗi khi gửi reaction:', error);
    }
  };

  const handlePrivacyClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePrivacyChange = async (privacy) => {
    try {
      await axios.put(`story/${currentStory.id}`, {
        status: privacy
      });
      
      // Cập nhật lại stories
      const updatedStories = stories.map(user => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            stories: user.stories.map(story => {
              if (story.id === currentStory.id) {
                return {
                  ...story,
                  status: privacy
                };
              }
              return story;
            })
          };
        }
        return user;
      });

      setStories(updatedStories);
    } catch (error) {
      console.error('Lỗi khi cập nhật quyền riêng tư:', error);
    }
    setAnchorEl(null);
  };

  if (!stories) return null;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              maxWidth: 'none',
              bgcolor: 'transparent', 
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'scroll',
              scrollbarGutter: 'stable',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(8px)',
            }
          }}
        >
          {/* Background mờ */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={onClose}
          />

          {/* Story Container */}
          <Box 
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              height: '95vh',
              bgcolor: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                padding: '16px',
              }}
            >
              {/* Progress bars */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                {currentUser?.stories.map((_, idx) => (
                  <LinearProgress
                    key={idx}
                    variant="determinate"
                    value={idx < currentStoryIndex ? 100 : idx === currentStoryIndex ? progress : 0}
                    sx={{
                      flex: 1,
                      height: 2.5,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'white',
                      }
                    }}
                  />
                ))}
              </Box>

              {/* User info */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #1876f2',
                    }}
                  >
                    <img 
                      src={currentUser?.avatar  || "/user_default.png"} 
                      alt={currentUser?.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ color: 'white' }}>
                    <Typography sx={{ 
                      fontWeight: 600, 
                      fontSize: '15px',
                      lineHeight: '1.2',
                    }}>
                      {currentUser?.name}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontSize: '13px',
                      opacity: 0.7 
                    }}>
                      <Typography>
                        {currentStory?.created_at ? formatDateToNow(currentStory.created_at) : ''}
                      </Typography>
                      {currentStory?.status && (
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 0.5,
                            '&:before': {
                              content: '"•"',
                              fontSize: '8px'
                            }
                          }}
                          title={statusIcons[currentStory.status]?.title}
                        >
                          {statusIcons[currentStory.status]?.icon}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {isMyStory && (
                    <IconButton
                      onClick={handlePrivacyClick}
                      sx={{
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      <Settings />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={onClose}
                    sx={{
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Story Content */}
            <Box 
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              onClick={handleContentClick}
            >
              {currentStory?.file?.video ? (
                <video
                  src={currentStory.file.video}
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(100% - 80px)',
                    objectFit: 'contain',
                  }}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleNext}
                  onTimeUpdate={(e) => {
                    if (videoDuration > 5) {
                      setProgress((e.target.currentTime / videoDuration) * 100);
                    }
                  }}
                  {...(isPaused ? { pause: true } : { play: true })}
                />
              ) : (
                <img
                  src={currentStory?.file?.image}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(100% - 80px)',
                    objectFit: 'contain',
                  }}
                />
              )}

              {/* Nút điều hướng */}
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '0 4px 4px 0',
                  height: '60px',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                  visibility: (currentStoryIndex > 0 || currentUserIndex > 0) ? 'visible' : 'hidden',
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '4px 0 0 4px',
                  height: '60px',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                  visibility: 'visible', // Luôn hiển thị nút next
                }}
              >
                <ChevronRight />
              </IconButton>

              {/* Vùng click để điều hướng */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30%',
                  height: '100%',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              />
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '30%',
                  height: '100%',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              />
            </Box>

            {/* Footer - Reactions hoặc Viewers */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                zIndex: 2,
              }}
            >
              {/* Số lượng người xem */}
              {isMyStory && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                  onClick={handleViewersClick}
                >
                  <VisibilityOutlined />
                  <Typography>{currentStory?.user_count || 0} người xem</Typography>
                </Box>
              )}

              {/* Reactions */}
              {!isMyStory && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {reactionIcons.map((icon, index) => (
                    <Box
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        position: 'relative',
                        '&::after': currentEmotion === icon.emoji ? {
                          content: '""',
                          position: 'absolute',
                          bottom: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#ff0000',
                        } : {},
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                      onClick={() => handleReactionClick(icon)}
                    >
                      {icon.emoji}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Menu quyền riêng tư */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {privacyOptions.map((option) => (
              <MenuItem 
                key={option.value}
                onClick={() => handlePrivacyChange(option.value)}
                selected={currentStory?.privacy === option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          {/* Danh sách người xem */}
          <Slide direction="up" in={showViewers} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '40vh',
                bgcolor: 'white',
                borderRadius: '16px 16px 0 0',
                zIndex: 1300,
                boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                width: '500px',
                margin: '0 auto',
              }}
            >
              <Box sx={{ 
                p: 1.5, 
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Typography variant="subtitle1">Người xem ({viewers.count})</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => {
                    setShowViewers(false);
                    setIsPaused(false);
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              
              <Box sx={{ maxHeight: 'calc(40vh - 48px)', overflow: 'auto' }}>
                {isLoadingViewers ? (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: 200 
                  }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : viewers.data.length > 0 ? (
                  <List dense>
                    {viewers.data.map((viewer) => (
                      <ListItem 
                        key={viewer.id} 
                        sx={{ 
                          py: 0.5,
                          bgcolor: viewer.seen === 0 ? 'rgba(24, 118, 242, 0.05)' : 'transparent', // Nền xanh nhạt cho người xem mới
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={viewer.user?.avatar  || "/user_default.png"} 
                            sx={{ width: 32, height: 32 }} 
                          />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography sx={{ fontSize: '14px' }}>
                                {viewer.user.name}
                              </Typography>
                              {viewer.seen === 0 && (
                                <Typography 
                                  component="span" 
                                  sx={{ 
                                    fontSize: '12px',
                                    color: '#1876f2',
                                    fontWeight: 600,
                                    bgcolor: 'rgba(24, 118, 242, 0.1)',
                                    px: 0.8,
                                    py: 0.2,
                                    borderRadius: 1,
                                  }}
                                >
                                  Mới
                                </Typography>
                              )}
                            </Box>
                          }
                          secondary={viewer.emoji && (
                            <Box component="span" sx={{fontSize: '14px'}}>
                              {viewer.emoji}
                            </Box>
                          )}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{p: 2, textAlign: 'center'}}>
                    <Typography variant="body2">Chưa có người xem</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Slide>
        </Dialog>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default StoryViewer;
