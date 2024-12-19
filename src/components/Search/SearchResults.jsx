import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Grid
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
    return (
      <Grid container spacing={1} alignItems="center">
        {user.button.includes("friend") && (
          <Grid item>
            <Chip size="small" label="Bạn bè" color="primary" />
          </Grid>
        )}

        {user.friend_commons.length > 0 && (
          <Grid item>
            <Typography variant="body2">
              <People fontSize="small" /> {user.friend_commons.length} bạn chung
            </Typography>
          </Grid>
        )}

        {user.address && (
          <Grid item>
            <Typography variant="body2">
              <LocationOn fontSize="small" /> {user.address}
            </Typography>
          </Grid>
        )}

        {user.hometown && (
          <Grid item>
            <Typography variant="body2">
              <Home fontSize="small" /> {user.hometown}
            </Typography>
          </Grid>
        )}

        {user.friend_counts > 0 && (
          <Grid item>
            <Typography variant="body2">
              <People fontSize="small" /> {user.friend_counts} bạn bè
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {uniqueUsers.map((user) => {
          const { adding, added } = addStates[user.id] || {};
          const { removing } = removeStates[user.id] || {};
          const { messaging } = messageStates[user.id] || {};

          return (
            <React.Fragment key={user.id}>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 2,
                  padding: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={user.avatar || "/user_default.png"}
                    alt={user.name}
                    sx={{ width: 64, height: 64 }}
                  />
                </ListItemAvatar>

                <Box flex={1}>
                  <Typography
                    component={Link}
                    to={`/profile/${user.id}`}
                    variant="h6"
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    {user.name}
                  </Typography>
                  {renderUserInfo(user)}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'column' },
                    gap: 1,
                    minWidth: 120
                  }}
                >
                  {user.button.includes("add") ? (
                    <Button
                      variant="contained"
                      color={added ? "error" : "primary"}
                      startIcon={adding || added ? <PersonRemove /> : <PersonAdd />}
                      onClick={() => added ? handleRemoveFriend(user.id) : handleAddfriend(user.id)}
                      disabled={adding || removing}
                    >
                      {adding ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : added ? (
                        "Gỡ bạn bè"
                      ) : (
                        "Thêm bạn"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<Message />}
                      onClick={() => handleStartChat(user.id)}
                      disabled={messaging}
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
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default SearchResults;
