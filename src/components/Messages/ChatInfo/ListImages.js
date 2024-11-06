import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';

const StyledImageList = styled(ImageList)(({ theme }) => ({
  width: '100%',
  gap: '16px !important', 
  padding: theme.spacing(2),
  '& .MuiImageListItem-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  },
}));

const ListImages = ({ open, onClose, room }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const imagesPerPage = 9;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get(`chat-room/images/${room.chat_room_id}?page=${page}`);
        setImages(response.data.data.data);
        setTotalPages(Math.ceil(response.data.data.total / response.data.data.per_page));
      } catch (error) {
        console.error('Lỗi khi tải ảnh:', error);
        toast.error('Không thể tải danh sách ảnh');
      }
    };

    if (open) {
      fetchImages();
    }
  }, [open, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>File/ảnh đã gửi</DialogTitle>
      <DialogContent>
        <StyledImageList cols={3} rowHeight={200}>
          {images.map((img, index) => (
            <ImageListItem key={index}>
              {img.files.map((url, imgIndex) => (
                <img key={imgIndex} src={url} className='show-image' alt={`Ảnh ${index + 1}.${imgIndex + 1}`} loading="lazy" />
              ))}
            </ImageListItem>
          ))}
        </StyledImageList>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListImages;
