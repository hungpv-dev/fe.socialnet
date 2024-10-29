import React, { useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Button, Collapse, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, ImageList, ImageListItem, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import ImageIcon from '@mui/icons-material/Image';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import NickName from './ChatInfo/NickName';
import BlockUser from './ChatInfo/BlockUser';
import { toast } from 'react-toastify';
import axiosInstance from '@/axios';
import ListImages from './ChatInfo/ListImages';

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  minWidth: 400,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  height: '100vh',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const FullWidthButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  position: 'absolute',
  bottom: theme.spacing(2),
  width: 'calc(100% - 48px)',
}));

function ChatInfo({ room, onClose }) {
  // State
  const [showMembers, setShowMembers] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openNickname, setOpenNickname] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openBlockConfirm, setOpenBlockConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(state => state.user);

  // Xử lý dữ liệu
  if (!room) return null;
  const admins = room.admin;
  const isAdmin = admins.some(admin => admin.id === currentUser.id);
  const members = [currentUser,...room.users];

  // Xử lý sự kiện
  const handleMemberAction = (user, action) => {
    console.log(`${action} người dùng:`, user);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = () => {
    if (room.chat_room_type !== 1 && isAdmin) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('avatar', file);
          formData.append('_method', 'PUT');
          try {
            await toast.promise(
              axiosInstance.post(`chat-room/${room.chat_room_id}?type=avatar`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }),
              {
                pending: 'Đang xử lý...',
                success: 'Cập nhật ảnh nhóm thành công 👌',
                error: 'Cập nhật thất bại 🤯'
              }
            );
          } catch (error) {
            console.error('Lỗi:', error);
          }
        }
      };
      input.click();
    }
  };

  // Render header
  const renderHeader = () => (
    <>
      <LargeAvatar
        src={room.chat_room_type === 1 ? room.users[0].avatar : room.avatar}
        alt={room.name}
        onClick={handleAvatarClick}
        title={room.chat_room_type !== 1 && isAdmin ? "Nhấp để thay đổi ảnh nhóm" : ""}
      />
      <Typography variant="h5" gutterBottom>{room.name}</Typography>
    </>
  );

  // Render actions
  const renderActions = () => (
    room.chat_room_type === 1 ? (
      <>
        <FullWidthButton startIcon={<EditIcon />} onClick={() => setOpenNickname(true)}>
          Đặt biệt danh
        </FullWidthButton>
        <FullWidthButton startIcon={<ImageIcon />} onClick={() => setOpenImages(true)}>
          Xem file/ảnh đã gửi
        </FullWidthButton>
      </>
    ) : (
      <>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Số thành viên: {room.users.length}
        </Typography>
        <FullWidthButton startIcon={<PersonAddIcon />}>
          Thêm thành viên
        </FullWidthButton>
        <FullWidthButton startIcon={<ImageIcon />} onClick={() => setOpenImages(true)}>
          Xem file/ảnh đã gửi
        </FullWidthButton>
      </>
    )
  );

  // Render members
  const renderMembers = () => (
    <Box width="100%" mt={2}>
      <Button
        fullWidth
        onClick={() => setShowMembers(!showMembers)}
        endIcon={showMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        Xem thành viên
      </Button>
      <Collapse in={showMembers}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Tất cả" />
          <Tab label="Quản trị viên" />
        </Tabs>
        <List>
          {(activeTab === 0 ? members : admins).map(user => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    {user.name}
                    {user.id === currentUser.id && (
                      <span style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        marginLeft: '8px'
                      }}>
                        Bạn
                      </span>
                    )}
                  </>
                }
                secondary={admins.some(admin => admin.id === user.id) ? "Quản trị viên" : "Thành viên"}
              />
              {isAdmin && currentUser.id !== user.id && (
                <>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleMemberAction(user, 'admin')}>Thêm admin</MenuItem>
                    <MenuItem onClick={() => handleMemberAction(user, 'kick')}>Kick khỏi nhóm</MenuItem>
                  </Menu>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );

  let theirUserId = room.users[0]?.id;
  let isBlocked = room.block?.includes('user_'+theirUserId);
  // Render description
  const renderDescription = () => (
    room.description && (
      <Box mt={2} width="100%">
        <Typography variant="subtitle1" gutterBottom>Mô tả:</Typography>
        <Typography variant="body2">{room.description}</Typography>
      </Box>
    )
  );

  // Render dialogs
  const renderDialogs = () => (
    <>
      {openNickname && <NickName room={room} open={openNickname} closeModal={onClose} onClose={setOpenNickname} />}

      <ListImages 
        open={openImages} 
        room={room}
        onClose={() => setOpenImages(false)}
      />

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận rời khỏi nhóm</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn rời khỏi nhóm này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Hủy</Button>
          <DangerButton onClick={() => {
            console.log('Rời khỏi nhóm');
            setOpenConfirm(false);
          }}>
            Rời khỏi nhóm
          </DangerButton>
        </DialogActions>
      </Dialog>

      {openBlockConfirm && <BlockUser room={room} block={isBlocked} open={openBlockConfirm} onClose={() => setOpenBlockConfirm(false)} />}
    </>
  );

  // Main render
  return (
    <StyledBox>
      <CloseButton onClick={onClose} aria-label="đóng">
        <CloseIcon />
      </CloseButton>

      {renderHeader()}
      {renderActions()}
      {room.chat_room_type !== 1 && renderMembers()}
      {renderDescription()}

      <Box mt="auto" width="100%">
        {room.chat_room_type === 1 ? (
          <DangerButton fullWidth startIcon={<BlockIcon />} onClick={() => setOpenBlockConfirm(true)}>
            {isBlocked ? 'Bỏ chặn' : 'Chặn'}
          </DangerButton>
        ) : (
          <DangerButton fullWidth startIcon={<ExitToAppIcon />} onClick={() => setOpenConfirm(true)}>
            Rời khỏi nhóm
          </DangerButton>
        )}
      </Box>

      {renderDialogs()}
    </StyledBox>
  );
}

export default ChatInfo;