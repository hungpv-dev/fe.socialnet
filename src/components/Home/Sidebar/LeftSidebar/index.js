import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Divider } from '@mui/material';
import { Home, People, Groups, Storefront, OndemandVideo, History, Bookmark, Flag, Event, SportsEsports } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LeftSidebar() {
    const user = useSelector(state => state.user);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav">
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>
                            <Avatar src={user?.avatar || "/user_default.png"} />
                        </ListItemIcon>
                        <ListItemText primary={user?.fullName || "Người dùng"} />
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

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/groups">
                        <ListItemIcon>
                            <Groups />
                        </ListItemIcon>
                        <ListItemText primary="Nhóm" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/marketplace">
                        <ListItemIcon>
                            <Storefront />
                        </ListItemIcon>
                        <ListItemText primary="Marketplace" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/watch">
                        <ListItemIcon>
                            <OndemandVideo />
                        </ListItemIcon>
                        <ListItemText primary="Watch" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <History />
                        </ListItemIcon>
                        <ListItemText primary="Kỷ niệm" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Bookmark />
                        </ListItemIcon>
                        <ListItemText primary="Đã lưu" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Flag />
                        </ListItemIcon>
                        <ListItemText primary="Trang" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Event />
                        </ListItemIcon>
                        <ListItemText primary="Sự kiện" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SportsEsports />
                        </ListItemIcon>
                        <ListItemText primary="Chơi game" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default LeftSidebar;