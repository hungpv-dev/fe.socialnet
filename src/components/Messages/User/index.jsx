import classNames from "classnames/bind";
import { formatDateToNow } from "@/components/FormatDate";
import styles from "./main.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { showRoomAvatar } from "@/components/MessageComponent";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { Delete, PersonOff, MoreVert, Warning, Person } from '@mui/icons-material';
import BlockUser from "../ChatInfo/BlockUser";
import axiosInstance from '@/axios';
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "@/actions/rooms";

const cx = classNames.bind(styles);

function User({ room, currentRooms = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const open = Boolean(anchorEl);

  let theirUserId = room.users[0]?.id;
  let isBlocked = room.block?.includes('user_'+theirUserId);
  const outs = room.outs ?? [];
  const isOut = outs?.includes('user_'+user.id);


  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBlockUser = () => {
    setShowBlockModal(true);
    handleClose();
  };

  const handleDeleteChat = () => {
    setShowDeleteModal(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.put(`chat-room/${room.chat_room_id}?type=remove`);
      const updatedRooms = currentRooms.filter(r => r.chat_room_id !== room.chat_room_id);
      dispatch(setRooms(updatedRooms));
      navigate('/messages');
    } catch(e) {
      console.log(e);
    }
    setShowDeleteModal(false);
  };
  return (
    <div className={cx("user", { selected: room.selected })}>
      <Link to={`/messages/${room.chat_room_id}`} className="user-avatar">
        {showRoomAvatar(room)}
      </Link>
      <Link to={`/messages/${room.chat_room_id}`} className="content">
        <h6 className="m-0">{room.name}</h6>
        <p className={!room.last_message?.is_seen && !isOut ? "m-0 mt-1 text-dark" : "m-0"}>
          {!room.last_message ? 'Bắt đầu cuộc trò chuyện ngay?' : ((room.last_message.body.length > 20
            ? room.last_message.body.substring(0, 40) + '...'
            : (room.last_message.body || 'Đã gửi một hình ảnh')))} . {
            room.last_message ? formatDateToNow(room.last_message?.created_at) : ''
          }
        </p>
      </Link>
      
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {room.chat_room_type === 1 && (
          <MenuItem 
            onClick={() => {
              navigate(`/profile/${room.users[0].id}`);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Xem trang cá nhân</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={handleDeleteChat}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xóa đoạn chat</ListItemText>
        </MenuItem>

        {room.chat_room_type === 1 && (
          <MenuItem onClick={handleBlockUser}>
            <ListItemIcon>
              <PersonOff fontSize="small" />
            </ListItemIcon>
            <ListItemText>{isBlocked ? 'Bỏ chặn' : 'Chặn'}</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {showBlockModal && <BlockUser room={room} block={isBlocked} open={showBlockModal} onClose={() => setShowBlockModal(false)} />}

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'error.contrastText', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning />
          Xác nhận xóa đoạn chat
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Bạn có chắc chắn muốn xóa đoạn chat này không?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sau khi xóa, bạn sẽ không thể khôi phục lại đoạn chat này.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setShowDeleteModal(false)}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default User;
