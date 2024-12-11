import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './404.module.scss';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const cx = classNames.bind(styles);

const NotFound = ( { message = 'Không tìm thấy trang' } ) => {
  return (
    <div className={cx('not-found-container')}>
      <Box className={cx('content')}>
        <ErrorOutlineIcon className={cx('icon')} />
        <Typography variant="h1" className={cx('title')}>
          404
        </Typography>
        <Typography variant="h4" className={cx('subtitle')}>
          {message}
        </Typography>
        <Typography className={cx('description')}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          className={cx('home-button')}
        >
          Trở về trang chủ
        </Button>
      </Box>
    </div>
  );
};

export default NotFound;
