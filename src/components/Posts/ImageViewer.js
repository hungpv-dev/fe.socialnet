import React, { useState } from 'react';
import { Dialog, IconButton, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    boxShadow: 'none',
    maxWidth: 'none',
    margin: 0,
    overflow: 'hidden'
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
  padding: 0
});

const StyledImg = styled('img')(({ theme }) => ({
  maxWidth: '95vw',
  maxHeight: '95vh',
  height: 'auto',
  width: 'auto',
  objectFit: 'contain',
  borderRadius: '0',
  boxShadow: '0 0 30px rgba(0,0,0,0.5)',
  transform: 'scale(0.95)',
  opacity: 0,
  '&.loaded': {
    transform: 'scale(1)',
    opacity: 1
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  zIndex: 1,
  '&.prev': {
    left: '0',
  },
  '&.next': {
    right: '0',
  },
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
}));

const ImageViewer = ({ open, onClose, data, currentIndex, setCurrentIndex }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    if (open) setIsLoaded(false);
  }, [open]);

  // Ensure data and data.image exist before accessing it
  if (!data || !data.image || data.image.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation(); // Ngừng sự kiện lan ra ngoài
    if (currentIndex < data.image.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation(); // Ngừng sự kiện lan ra ngoài
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      fullScreen
      onClick={onClose}
      TransitionProps={{
        timeout: 300
      }}
    >
      <ImageContainer>
        <StyledImg 
          src={data.image[currentIndex]}
          alt="Xem ảnh phóng to"
          onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click trên ảnh để không đóng modal
          className={isLoaded ? 'loaded' : ''}
          onLoad={() => setIsLoaded(true)}
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Navigation Buttons */}
        <NavigationButton className="prev" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowBack />
        </NavigationButton>
        <NavigationButton className="next" onClick={handleNext} disabled={currentIndex === data.image.length - 1}>
          <ArrowForward />
        </NavigationButton>

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
