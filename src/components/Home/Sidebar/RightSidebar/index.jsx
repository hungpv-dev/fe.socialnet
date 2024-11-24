import { Box, Typography, Divider, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Paper, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import classNames from "classnames/bind";
import styles from "./RightSidebar.module.scss";

const cx = classNames.bind(styles);

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function RightSidebar() {
    return (
        <Box component="aside" sx={{ width: 360, p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Được tài trợ
            </Typography>

            <Paper elevation={0} sx={{ p: 2, mb: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                <Link to="https://www.facebook.com/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box component="img" 
                            src="https://scontent.fhan14-1.fna.fbcdn.net/v/t45.1600-4/455023410_120210911267640561_7071954057481782306_n.png"
                            sx={{ width: 120, height: 120, borderRadius: 1, objectFit: 'cover' }}
                        />
                        <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>Facebook</Typography>
                    </Box>
                </Link>
            </Paper>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Lời mời kết bạn
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography color="primary" sx={{ fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
                            Xem tất cả
                        </Typography>
                    </Link>
                </Box>

                <Paper elevation={0} sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' } }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar src="/user_default.png" sx={{ width: 60, height: 60 }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Đinh Quang Hiến
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                6 bạn chung
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    sx={{ 
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        bgcolor: 'primary.main'
                                    }}
                                >
                                    Xác nhận
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="small"
                                    sx={{ 
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        color: 'text.primary'
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Người liên hệ
            </Typography>

            <List disablePadding>
                {[1, 2, 3, 4, 5].map((item) => (
                    <ListItem 
                        key={item} 
                        sx={{ 
                            px: 1, 
                            py: 0.5,
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                            cursor: 'pointer'
                        }}
                    >
                        <ListItemAvatar>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg" />
                            </StyledBadge>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Nguyễn Văn A" 
                            sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                        />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Nhóm chat
            </Typography>

            <List disablePadding>
                {[1, 2, 3, 4].map((item) => (
                    <ListItem 
                        key={item} 
                        sx={{ 
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                            cursor: 'pointer'
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/434652629_1573500140102284_8608022593889115644_n.jpg" />
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Nhóm A" 
                            sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default RightSidebar;