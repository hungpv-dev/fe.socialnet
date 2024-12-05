import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { Home, People } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LeftSidebar() {
    const user = useSelector(state => state.user);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, paddingTop: '10px', bgcolor: 'background.paper' }}>
            <List component="nav">
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/profile/${user.id}`}>
                        <ListItemIcon>
                            <Avatar src={user?.avatar || "/user_default.png"} />
                        </ListItemIcon>
                        <ListItemText primary={user?.name || "Người dùng"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <Home sx={{ color: '#1976d2' }} />
                        </ListItemIcon>
                        <ListItemText primary="Trang chủ" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/friends">
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Bạn bè" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default LeftSidebar;