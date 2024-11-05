import React from 'react';
import { Dialog, IconButton, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    boxShadow: 'none',
    maxWidth: 'none',
    margin: 0
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
}));

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px'
});

const StyledImg = styled('img')(({ theme }) => ({
  maxWidth: ({ isMobile }) => isMobile ? '100vw' : '80vw',
  maxHeight: ({ isMobile }) => isMobile ? '100vh' : '80vh',
  height: 'auto',
  width: 'auto',
  objectFit: 'contain',
  borderRadius: '8px'
}));

const ImageViewer = ({ open, onClose, imageSrc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!imageSrc) return null;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen
      onClick={onClose}
    >
      <ImageContainer>
        <StyledImg 
          src={imageSrc} 
          alt="Xem ảnh phóng to"
          onClick={(e) => e.stopPropagation()}
          style={{
            transition: 'all 0.3s ease-in-out'
          }}
          isMobile={isMobile}
        />
        <CloseButton 
          onClick={onClose}
          size={isMobile ? "small" : "medium"}
        >
          <CloseIcon />
        </CloseButton>
      </ImageContainer>
    </StyledDialog>
  );
};

export default ImageViewer;
