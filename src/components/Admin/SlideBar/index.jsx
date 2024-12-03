import { useState } from 'react';
import { 
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Assessment,
  People,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Tổng quan', icon: <Dashboard />, path: '/admin' },
    { text: 'Thống kê', icon: <Assessment />, path: '/admin/analytics' },
    { text: 'Quản lý người dùng', icon: <People />, path: '/admin/users' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary">
          ADMIN PANEL
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hệ thống quản trị
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;