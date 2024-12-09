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
  Collapse
} from '@mui/material';
import {
  Dashboard,
  Assessment,
  People,
  Report,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const menuItems = [
    { text: 'Tổng quan', icon: <Dashboard />, path: '/admin' },
    { text: 'Quản lý người dùng', icon: <People />, path: '/admin/users' },
    { 
      text: 'Quản lý báo cáo', 
      icon: <Report />, 
      path: '/admin/reports',
      subItems: [
        { text: 'Kiểu báo cáo', path: '/admin/reports/type' },
        { text: 'Đơn báo cáo', path: '/admin/reports' },
      ]
    },
    { text: 'Thống kê', icon: <Assessment />, path: '/admin/analytics' },
  ];

  const drawer = (
    <Box>
      <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
        <Typography variant="h6">
          ADMIN PANEL
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.subItems && item.subItems.some(sub => location.pathname === sub.path));

          return (
            <div key={item.text}>
              <ListItem
                button
                onClick={() => {
                  if (item.subItems) {
                    setOpenSubMenu(openSubMenu === item.text ? null : item.text);
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{
                  bgcolor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.2)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#1976d2' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    color: isActive ? '#1976d2' : 'inherit',
                  }}
                />
                {item.subItems && (
                  openSubMenu === item.text ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItem>
              {item.subItems && (
                <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        pl: 4,
                        bgcolor: location.pathname === subItem.path ? 'rgba(25, 118, 210, 0.1)' : 'inherit',
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        primaryTypographyProps={{
                          fontWeight: location.pathname === subItem.path ? 'bold' : 'normal',
                          color: location.pathname === subItem.path ? '#1976d2' : 'inherit',
                        }}
                      />
                    </ListItem>
                  ))}
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hệ thống quản trị
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <Drawer
          variant="permanent"
          sx={{
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
          width: `calc(100% - ${drawerWidth}px)`,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
