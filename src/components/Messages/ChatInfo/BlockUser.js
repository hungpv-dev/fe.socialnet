import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import axiosInstance from '@/axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    display: 'flex', 
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

const BlockUser = ({ room, open, block, onClose }) => {
  const handleConfirm = async () => {
    try{
      await axiosInstance.put(`chat-room/${room.chat_room_id}?type=block`,{block: room.users[0]?.id});
    }catch(e){
      console.log(e);
    }
    onClose();
  };
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <WarningIcon />
        {block ? 'Xác nhận bỏ chặn người dùng' : 'Xác nhận chặn người dùng'}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" gutterBottom>
          {block ? 'Bạn có chắc chắn muốn bỏ chặn người dùng này không?' : 'Bạn có chắc chắn muốn chặn người dùng này không?'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {block ? 'Sau khi bỏ chặn, bạn sẽ nhận được tin nhắn từ người dùng này.' : 'Sau khi chặn, bạn sẽ không nhận được tin nhắn từ người dùng này nữa.'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          color={block ? "inherit" : "error"}
          onClick={handleConfirm}
        >
          {block ? 'Bỏ chặn' : 'Chặn'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default BlockUser;
