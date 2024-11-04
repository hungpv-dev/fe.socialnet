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
import AddMember from './ChatInfo/AddMember';

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

function ChatInfo({ room, isOut,outs, onClose }) {
  // State
  outs = outs ?? [];
  const [showMembers, setShowMembers] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openNickname, setOpenNickname] = useState(false); 
  const [openImages, setOpenImages] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openBlockConfirm, setOpenBlockConfirm] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const currentUser = useSelector(state => state.user);
  isOut = outs.includes('user_' + currentUser.id);

  // Xử lý dữ liệu
  if (!room) return null;
  let admins = room.admin;
  let isAdmin = admins.some(admin => admin.id === currentUser.id);
  let members = [currentUser,...room.users];
  outs.forEach(item => {
    const userId = item.replace('user_', '');
    members = members.filter(member => member.id !== parseInt(userId));
    admins = admins.filter(admin => admin.id !== parseInt(userId));
  });

  // Xử lý sự kiện
  const handleMemberAction = async (id, action) => {
    if (isOut) return;
    try{
      if(action === 'admin'){
        await axiosInstance.put(`chat-room/${room.chat_room_id}?type=addadmin`,{id});
      }else if(action === 'kick'){
        await axiosInstance.put(`chat-room/${room.chat_room_id}?type=out`,{id}).then(res => res);
      }
    }catch(e){
      console.log(e);
    }
    handleMenuClose();
  };

  const handleMenuClick = (event, userId) => {
    if (isOut) return;
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleAvatarClick = () => {
    if (isOut || room.chat_room_type === 1 || !isAdmin) return;
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
  };

  // Render header
  const renderHeader = () => (
    <>
      <LargeAvatar
        src={room.chat_room_type === 1 ? room.users[0].avatar : room.avatar}
        alt={room.name}
        onClick={handleAvatarClick}
        title={room.chat_room_type !== 1 && isAdmin && !isOut ? "Nhấp để thay đổi ảnh nhóm" : ""}
      />
      <Typography variant="h5" gutterBottom>{room.name}</Typography>
    </>
  );

  // Render actions
  const renderActions = () => {
    if (isOut) {
      return (
        <>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Bạn đã rời khỏi cuộc trò chuyện này
          </Typography>
          <FullWidthButton startIcon={<ImageIcon />} onClick={() => setOpenImages(true)}>
            Xem file/ảnh đã gửi
          </FullWidthButton>
        </>
      );
    }

    return room.chat_room_type === 1 ? (
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
          Số thành viên: {members.length}
        </Typography>
        <FullWidthButton startIcon={<PersonAddIcon />} onClick={() => setOpenAddMember(true)}>
          Thêm thành viên
        </FullWidthButton>
        <FullWidthButton startIcon={<ImageIcon />} onClick={() => setOpenImages(true)}>
          Xem file/ảnh đã gửi
        </FullWidthButton>
      </>
    );
  };

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
              {isAdmin && !isOut && currentUser.id !== user.id && !admins.some(admin => admin.id === user.id) && (
                <>
                  <IconButton onClick={(e) => handleMenuClick(e, user.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleMemberAction(selectedUserId, 'admin')}>Thêm admin</MenuItem>
                    <MenuItem onClick={() => handleMemberAction(selectedUserId, 'kick')}>Kick khỏi nhóm</MenuItem>
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

  // Render dialogs
  const renderDialogs = () => (
    <>
      {openNickname && <NickName room={room} open={openNickname} closeModal={onClose} onClose={setOpenNickname} />}

      <ListImages 
        open={openImages} 
        room={room}
        onClose={() => setOpenImages(false)}
      />

      <AddMember
        open={openAddMember}
        room={room}
        members={members}
        onClose={() => setOpenAddMember(false)}
      />

      <Dialog 
        open={openConfirm} 
        onClose={() => setOpenConfirm(false)}
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '8px'
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          color: '#d32f2f',
          fontWeight: 'bold'
        }}>
          Xác nhận rời khỏi nhóm
        </DialogTitle>
        <DialogContent>
          <Typography sx={{
            textAlign: 'center',
            color: '#666',
            marginTop: 1
          }}>
            Bạn có chắc chắn muốn rời khỏi nhóm này?
          </Typography>
        </DialogContent>
        <DialogActions sx={{
          padding: '16px',
          justifyContent: 'center',
          gap: 2
        }}>
          <Button 
            variant="outlined"
            onClick={() => setOpenConfirm(false)}
            sx={{
              borderRadius: '8px',
              minWidth: '120px'
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained" 
            color="error"
            onClick={async () => {
              try{
                await axiosInstance.put(`chat-room/${room.chat_room_id}?type=out`).then(res => res);
              }catch(e){
                console.log(e);
              }
              setOpenConfirm(false);
            }}
            sx={{
              borderRadius: '8px',
              minWidth: '120px'
            }}
          >
            Rời khỏi nhóm
          </Button>
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
      {room.chat_room_type !== 1 && !isOut && renderMembers()}
    
      {!isOut && (
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
      )}

      {renderDialogs()}
    </StyledBox>
  );
}

export default ChatInfo;