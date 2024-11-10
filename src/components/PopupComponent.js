import React, { useEffect, useState } from 'react';
import styles from '@/components/css/PopupComponent.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField, Avatar, Typography, CircularProgress, Chip, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import axios from '@/axios';
import { useNavigate } from 'react-router-dom';


export const PopupDeleteMessage = ({ onClose, onDeleteForMe, onDeleteForAll, me }) => {
    const [deleteOption, setDeleteOption] = useState('forMe');

    const checkOption = () => {
        if (me) {
            setDeleteOption('forMe');
        } else {
            setDeleteOption('forAll');
        }
    };

    useEffect(() => {
        checkOption();
    }, [me]);

    const handleDelete = () => {
        if (deleteOption === 'forMe') {
            onDeleteForAll();
        } else {
            onDeleteForMe();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === styles.overlay) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.popup}>
                <header className={styles.header}>
                    <h4>Thu hồi tin nhắn này ở phía ai?</h4>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 5,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </header>
                <div className={styles.content}>
                    <div className={styles.radioGroup}>
                        {me && (
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="forMe"
                                    checked={deleteOption === 'forMe'}
                                    onChange={() => setDeleteOption('forMe')}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioText}>Thu hồi với mọi người</span>
                            </label>
                        )}
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                value="forAll"
                                checked={deleteOption === 'forAll'}
                                onChange={() => setDeleteOption('forAll')}
                                className={styles.radioInput}
                            />
                            <span className={styles.radioText}>Thu hồi với bạn</span>
                        </label>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancelButton}>Hủy</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>Gỡ</button>
                </div>
            </div>
        </div>
    );
};

export const PupupCreateGroupChat = ({ onClose }) => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [groupAvatar, setGroupAvatar] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setGroupAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleCreateGroup = async () => {
        setIsCreating(true);
        try {
            const formData = new FormData();
            let users = selectedFriends.map(item => item.id);
            formData.append('chat_type_id', 2);
            formData.append('room_name', groupName);
            formData.append('avatar', groupAvatar);
            users.forEach((userId, index) => {
                formData.append(`user[${index}]`, userId);
            });
            const res = await axios.post('chat-room', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => res);
            if(res.status === 201){
                let id = res.data.data.chat_room_id;
                onClose();
                navigate(`/messages/${id}`);
            }
        } catch (error) {
            console.error('Lỗi khi tạo nhóm:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const searchFriends = async () => {
        setIsLoading(true);
        setNoResults(false);

        if (searchTerm.trim() !== '') {
            console.log('tìm');
            const response = await axios.post(`friend/find?name=${searchTerm}`).then(res => res);
            const data = await response.data.data;
            setFriends(data);
            setNoResults(data.length === 0);
        } else {
            setNoResults(false);
            setFriends([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            searchFriends();
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const handleAddFriend = (friend) => {
        if (!selectedFriends.find(f => f.id === friend.id)) {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };

    const handleRemoveFriend = (friendId) => {
        setSelectedFriends(selectedFriends.filter(f => f.id !== friendId));
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === styles.overlay) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={`${styles.popup} ${styles.createGroupPopup}`}>
                <header className={styles.header}>
                    <h3>Tạo nhóm chat mới</h3>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 3,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </header>
                <div className={styles.content}>
                    <div className={styles.avatarContainer}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar-upload"
                            type="file"
                            onChange={handleAvatarChange}
                            required
                        />
                        <label htmlFor="avatar-upload">
                            <Avatar
                                src={avatarPreview}
                                sx={{ width: 100, height: 100, cursor: 'pointer', margin: '0 auto' }}
                            >
                                {!avatarPreview && <CloudUploadIcon sx={{ fontSize: 40 }} />}
                            </Avatar>
                        </label>
                        <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center' }}>
                            Chọn ảnh đại diện nhóm (bắt buộc)
                        </Typography>
                    </div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Tên nhóm"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        margin="normal"
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Tìm kiếm bạn bè"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                        sx={{ marginBottom: 2 }}
                        autoComplete="off"
                    />
                    <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', marginBottom: 2 }}>
                        <List className={styles.friendsList}>
                            {isLoading ? (
                                <div className={styles.loadingContainer}>
                                    <CircularProgress size={24} />
                                    <Typography variant="body2" className={styles.loadingText}>
                                        Đang tìm kiếm...
                                    </Typography>
                                </div>
                            ) : noResults ? (
                                <Typography variant="body2" color="textSecondary" className={styles.noResultsText}>
                                    Không tìm thấy bạn bè
                                </Typography>
                            ) : (
                                friends.map(friend => (
                                    <ListItem
                                        key={friend.id}
                                        className={styles.friendItem}
                                        onClick={() => handleAddFriend(friend)}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                transition: 'background-color 0.3s'
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={friend.avatar} alt={friend.name} />
                                        </ListItemAvatar>
                                        <ListItemText primary={friend.name} />
                                    </ListItem>
                                ))
                            )}
                        </List>
                    </Paper>
                    <Paper variant="outlined" sx={{ padding: 2, marginTop: 2, maxHeight: 150, overflow: 'auto' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Thành viên đã chọn:
                        </Typography>
                        <div className={styles.selectedFriends}>
                            {selectedFriends.map(friend => (
                                <Chip
                                    key={friend.id}
                                    avatar={<Avatar src={friend.avatar} alt={friend.name} />}
                                    label={friend.name}
                                    onDelete={() => handleRemoveFriend(friend.id)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </div>
                    </Paper>
                </div>
                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCreateGroup}
                        disabled={isCreating || !groupName || !groupAvatar || selectedFriends.length < 2}
                        startIcon={isCreating ? <CircularProgress size={24} /> : null}
                        sx={{ marginTop: 2 }}
                    >
                        {isCreating ? 'Đang tạo...' : 'Tạo nhóm'}
                    </Button>
                </div>
            </div>
        </div>
    );
};