import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axiosInstance from '@/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function NickName({ room, open, onClose, closeModal }) {
  const user = useSelector(state => state.user);
  const [myNickname, setMyNickname] = useState('');
  const [theirNickname, setTheirNickname] = useState('');
  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await axiosInstance.get(`chat-room/${room.chat_room_id}?default=true`);
        if (response.status === 200) {
          let names = response.data.name;
          for (const name in names) {
            if (name !== 'user_' + user.id) {
              setMyNickname(names[name]);
            } else {
              setTheirNickname(names[name]);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchRoom();
  }, [room.chat_room_id]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      await toast.promise(
        axiosInstance.put(`chat-room/${room.chat_room_id}?type=names`, {
          myNickname,
          theirNickname
        }),
        {
          pending: 'Đang xử lý...',
          success: 'Thay đổi biệt danh thành công 👌',
          error: 'Lưu thất bại 🤯'
        }
      );
    } catch (e) {
      console.log(e);
    }
    onClose();
    closeModal();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đặt biệt danh</DialogTitle>
      <DialogContent>
        <TextField
          label="Biệt danh của bạn"
          fullWidth
          margin="normal"
          value={myNickname}
          onChange={(e) => setMyNickname(e.target.value)}
        />
        <TextField
          label="Biệt danh của đối phương"
          fullWidth
          margin="normal"
          value={theirNickname}
          onChange={(e) => setTheirNickname(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSave} variant="contained">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NickName;
