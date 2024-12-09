import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Chip,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  PersonAdd,
  PersonRemove,
  Message,
  Home,
  LocationOn,
  People
} from "@mui/icons-material";
import { addFriendRequest, deleteFriendRequest } from "@/services/friendRequestService";
import useChatRoom from "@/hooks/useChatRoom";

const SearchResults = ({ users }) => {
  const [addStates, setAddStates] = useState({});
  const [removeStates, setRemoveStates] = useState({});
  const [messageStates, setMessageStates] = useState({});
  const chatRoom = useChatRoom();
  const navigate = useNavigate();

  // Lọc danh sách người dùng không bị trùng lặp dựa trên id
  const uniqueUsers = [
    ...new Map(users.map((user) => [user.id, user])).values(),
  ];

  const handleAddfriend = async (id) => {
    setAddStates((prevStates) => ({
      ...prevStates,
      [id]: { adding: true },
    }));

    try {
      const res = await addFriendRequest(id);

      if (res && res.status === 200) {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { added: true, adding: false },
        }));
      } else {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { adding: false, added: false },
        }));
      }
    } catch (error) {
      console.error("Error adding:", error);
      setAddStates((prevStates) => ({
        ...prevStates,
        [id]: { adding: false, added: false },
      }));
    }
  };

  const handleStartChat = async (userId) => {
    setMessageStates((prevStates) => ({
      ...prevStates,
      [userId]: { messaging: true },
    }));

    try {
      const response = await chatRoom.createPrivateRoom(userId);
      if (response?.data) {
        const room = response.data.data;
        setMessageStates((prevStates) => ({
          ...prevStates,
          [userId]: { messaging: false },
        }));
        navigate(`/messages/${room.chat_room_id}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
      setMessageStates((prevStates) => ({
        ...prevStates,
        [userId]: { messaging: false },
      }));
    }
  };

  const handleRemoveFriend = async (id) => {
    setRemoveStates((prevStates) => ({
      ...prevStates,
      [id]: { removing: true },
    }));

    try {
      const res = await deleteFriendRequest(id);

      if (res && res.status === 200) {
        setAddStates((prevStates) => ({
          ...prevStates,
          [id]: { added: false, adding: false },
        }));
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removed: true, removing: false },
        }));
      } else {
        setRemoveStates((prevStates) => ({
          ...prevStates,
          [id]: { removing: false, removed: false },
        }));
      }
    } catch (error) {
      console.error("Error removing:", error);
      setRemoveStates((prevStates) => ({
        ...prevStates,
        [id]: { removing: false, removed: false },
      }));
    }
  };

  const renderUserInfo = (user) => {
    const infoParts = [];

    if (user.button.includes("friend")) {
      infoParts.push(<Chip size="small" label="Bạn bè" color="primary" />);
    }

    if (user.friend_commons.length > 0) {
      infoParts.push(
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <People fontSize="small" />
          <Typography variant="body2">{user.friend_commons.length} bạn chung</Typography>
        </Box>
      );
    }

    if (user.address) {
      infoParts.push(
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOn fontSize="small" />
          <Typography variant="body2">{user.address}</Typography>
        </Box>
      );
    }

    if (user.hometown) {
      infoParts.push(
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Home fontSize="small" />
          <Typography variant="body2">{user.hometown}</Typography>
        </Box>
      );
    }

    if (user.friend_counts > 0) {
      infoParts.push(
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <People fontSize="small" />
          <Typography variant="body2">{user.friend_counts} bạn bè</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        {infoParts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Typography variant="body2" color="text.secondary">●</Typography>}
            {part}
          </React.Fragment>
        ))}
      </Box>
    );
  };

  return (
    <List>
      {uniqueUsers.map((user, index) => {
        const { adding, added } = addStates[user.id] || {};
        const { removing } = removeStates[user.id] || {};
        const { messaging } = messageStates[user.id] || {};

        return (
          <React.Fragment key={user.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={user.avatar || "/user_default.png"}
                  alt={user.name}
                  sx={{ 
                    width: 56, 
                    height: 56,
                    border: 1,
                    borderColor: 'divider'
                  }}
                />
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                      component={Link}
                      to={`/profile/${user.id}`}
                      variant="subtitle1"
                      sx={{
                        textDecoration: 'none',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {user.name}
                    </Typography>
                    {user.button.includes("friend") && (
                      <Chip 
                        size="small" 
                        label="Bạn bè" 
                        color="primary" 
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {renderUserInfo(user)}
                  </Box>
                }
              />

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                alignItems: 'flex-start',
                minWidth: { xs: 'auto', sm: 140 }
              }}>
                {user.button.includes("add") ? (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={adding || added ? <PersonRemove /> : <PersonAdd />}
                    onClick={() => added ? handleRemoveFriend(user.id) : handleAddfriend(user.id)}
                    disabled={adding || removing}
                    color={added ? "error" : "primary"}
                    size="small"
                  >
                    {adding ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : added ? (
                      "Gỡ lời mời"
                    ) : (
                      "Thêm bạn bè"
                    )}
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Message />}
                    onClick={() => handleStartChat(user.id)}
                    disabled={messaging}
                    size="small"
                  >
                    {messaging ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Nhắn tin"
                    )}
                  </Button>
                )}
              </Box>
            </ListItem>
            {index < uniqueUsers.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default SearchResults;
