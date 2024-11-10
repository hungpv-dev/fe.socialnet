import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';

const cx = classNames.bind(styles);

const Story = ({ story }) => {
  return (
    <Box key={story.id} className={cx('story-item')}>
      <Box 
        className={cx('story-card')}
        style={{
          backgroundImage: `url(${story.imageUrl})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
        sx={{
          '& img': {
            transition: 'transform 0.3s ease',
          },
          '&:hover img': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <Box className={cx('story-overlay')} />
        <Box className={cx('story-header')}>
          <Avatar
            className={cx('avatar')} 
            src={story.user.avatar}
            alt={story.user.name}
          />
        </Box>
        <Box className={cx('story-footer')}>
          <Typography className={cx('story-text')}>
            {story.user.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Story;