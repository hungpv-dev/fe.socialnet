import React from 'react';
import { Dialog, IconButton, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const ImageViewer = ({ open, onClose, imageSrc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (open) setIsLoaded(false);
  }, [open]);

  if (!imageSrc) return null;

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
          src={imageSrc} 
          alt="Xem ảnh phóng to"
          onClick={(e) => e.stopPropagation()}
          className={isLoaded ? 'loaded' : ''}
          onLoad={() => setIsLoaded(true)}
          style={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
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
