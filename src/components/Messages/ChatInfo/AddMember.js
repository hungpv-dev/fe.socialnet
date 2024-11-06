import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, IconButton, Typography, Paper, CircularProgress, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import axiosInstance from '@/axios';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import classNames from 'classnames/bind';
import styles from "../SlideBar/main.scss";

const cx = classNames.bind(styles);

const SearchTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1)
}));

export default function AddMember({ open, onClose, members, room }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const searchFriends = async () => {
    setIsLoading(true);
    setNoResults(false);

    if (searchTerm.trim() !== '') {
      try {
        const response = await axiosInstance.post(`friend/find?name=${searchTerm}`);
        const data = response.data.data;
        setUsers(data);
        setNoResults(data.length === 0);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        toast.error('Có lỗi xảy ra khi tìm kiếm');
      }
    } else {
      setUsers([]);
    }
    setIsLoading(false);
  };

  const debouncedSearch = debounce(searchFriends, 500);

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  const handleAddMembers = async () => {
    setIsAdding(true);
    try {
      await toast.promise(
        axiosInstance.put(`chat-room/${room.chat_room_id}?type=addmember`, { 
          ids: selectedUsers.map(user => user.id)
        }),
        {
          pending: 'Đang thêm thành viên...',
          success: 'Đã thêm thành viên thành công 👌', 
          error: 'Không thể thêm thành viên 🤯'
        }
      );
      // Reset form
      setSearchTerm('');
      setUsers([]);
      setSelectedUsers([]);
      onClose();
    } catch (error) {
      console.error('Lỗi:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const isUserInGroup = (userId) => {
    return members.some(member => member.id === userId);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Thêm thành viên
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm bạn bè"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
          autoComplete="off"
        />

        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', marginBottom: 2 }}>
          <List>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <CircularProgress size={24} />
              </div>
            ) : noResults ? (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', padding: '20px' }}>
                Không tìm thấy bạn bè
              </Typography>
            ) : (
              users.map(user => (
                <ListItem
                  key={user.id}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} alt={user.name} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={user.name}
                    secondary={user.email}
                  />
                  {isUserInGroup(user.id) ? (
                    <Button variant="outlined" size="small" disabled>
                      Đã trong đoạn chat
                    </Button>
                  ) : selectedUsers.find(u => u.id === user.id) ? (
                    <Button variant="outlined" size="small" disabled>
                      Đã chọn
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSelectUser(user)}
                    >
                      Chọn
                    </Button>
                  )}
                </ListItem>
              ))
            )}
          </List>
        </Paper>

        {selectedUsers.length > 0 && (
          <Paper variant="outlined" sx={{ padding: 2, marginTop: 2, maxHeight: 150, overflow: 'auto' }}>
            <Typography variant="subtitle1" gutterBottom>
              Thành viên đã chọn:
            </Typography>
            <div className={styles.selectedFriends}>
              {selectedUsers.map(user => (
                <Chip
                  key={user.id}
                  avatar={<Avatar src={user.avatar} alt={user.name} />}
                  label={user.name}
                  onDelete={() => handleRemoveUser(user.id)}
                  sx={{ margin: 0.5 }}
                />
              ))}
            </div>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedUsers.length === 0 || isAdding}
          onClick={handleAddMembers}
          startIcon={isAdding ? <CircularProgress size={20} /> : null}
        >
          {isAdding ? 'Đang thêm...' : `Thêm (${selectedUsers.length})`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
