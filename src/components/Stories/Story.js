import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Story = ({ story, onClick }) => {
  const latestStory = story.stories[story.stories.length - 1];
  const previewUrl = latestStory?.file?.image || latestStory?.file?.video;
  const isVideo = latestStory?.file?.video;
  const user = useSelector(state => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <Box className={cx('story-item')} onClick={handleClick}>
      <Box className={cx('story-card')}>
        {/* Hiển thị nội dung tin mới nhất */}
        {isVideo ? (
          <video
            src={previewUrl}
            className={cx('story-preview')}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <img
            src={previewUrl}
            alt={story.name}
            className={cx('story-preview')}
            style={{
              width: '100%', 
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}

        {/* Hiển thị avatar user */}
        <Box 
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '4px solid #1877f2',
            overflow: 'hidden'
          }}
        >
          <img 
            src={story?.avatar || "/user_default.png"}
            alt={story.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        <Box className={cx('story-footer')}>
          <Typography
            className={cx('story-text')}
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)'
            }}
          >
            {story.id === user.id ? 'Tin của bạn' : story.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Story;