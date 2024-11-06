import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { Chat, Group, EmojiEmotions, ArrowBack, ArrowForward } from '@mui/icons-material';
import Content from "@/components/Messages/Content";

const Messages = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Kết nối mọi lúc mọi nơi",
      desc: "Trò chuyện với bạn bè và người thân một cách dễ dàng",
      icon: <Chat sx={{fontSize: 60, color: '#2196f3'}} />,
      bgColor: '#e3f2fd'
    },
    {
      title: "Chia sẻ khoảnh khắc", 
      desc: "Gửi hình ảnh, video và tệp tin nhanh chóng",
      icon: <Group sx={{fontSize: 60, color: '#4caf50'}} />,
      bgColor: '#e8f5e9'
    },
    {
      title: "Biểu cảm đa dạng",
      desc: "Thể hiện cảm xúc với sticker và emoji phong phú",
      icon: <EmojiEmotions sx={{fontSize: 60, color: '#ff9800'}} />,
      bgColor: '#fff3e0'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!id) {
    return (
      <Box
        id="content-none"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
          padding: '2rem'
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center" maxWidth="1200px">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: 'left',
                padding: '2rem',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(45deg, #2196f3, #1a237e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Chào mừng đến với ứng dụng chat
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  color: '#666',
                  lineHeight: 1.8,
                  marginBottom: '2rem'
                }}
              >
                Khám phá trải nghiệm trò chuyện mới với giao diện thân thiện, nhiều tính năng hấp dẫn và khả năng kết nối không giới hạn.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '30px',
                padding: '3rem 2rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: 'linear-gradient(90deg, #2196f3, #4caf50, #ff9800)',
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    marginBottom: 4
                  }}
                >
                  <IconButton
                    onClick={handlePrevSlide}
                    sx={{
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        transform: 'translateX(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ArrowBack />
                  </IconButton>

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      backgroundColor: slides[currentSlide].bgColor,
                      transform: 'scale(1.1)',
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {slides[currentSlide].icon}
                  </Box>

                  <IconButton
                    onClick={handleNextSlide}
                    sx={{
                      backgroundColor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        transform: 'translateX(3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ArrowForward />
                  </IconButton>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    marginBottom: 2,
                    color: '#1a237e',
                    textAlign: 'center'
                  }}
                >
                  {slides[currentSlide].title}
                </Typography>

                <Typography
                  sx={{
                    color: '#666',
                    fontSize: '1rem',
                    textAlign: 'center',
                    marginBottom: 3,
                    lineHeight: 1.6
                  }}
                >
                  {slides[currentSlide].desc}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {slides.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: currentSlide === index ? '#1a237e' : '#e0e0e0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.2)'
                        }
                      }}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return <Content />;
}

export default Messages;