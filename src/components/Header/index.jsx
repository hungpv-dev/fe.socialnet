import notiService from "@/services/notificationService";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Tooltip,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home,
  People,
  Chat,
  Notifications,
  Logout,
  AdminPanelSettingsTwoTone,
} from "@mui/icons-material";
import { styled, alpha, keyframes } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { setNotifications } from "@/actions/notification";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/axios";
import echo from "@/components/EchoComponent";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const SearchMobile = styled("div")(({ theme }) => ({
  position: "fixed", // Vị trí cố định
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[2],
  borderBottom: `1px solid ${theme.palette.divider}`,

  // Hiệu ứng xuất hiện
  animation: `${slideDown} 0.3s ease-out`,

  // Responsive cho thiết bị nhỏ
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1),
  },
}));

const SearchButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(1),
  border: "none",
  outline: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.8, 1.5),
    fontSize: "0.9rem",
  },
}));

const StyledInputBaseMobile = styled("input")(({ theme }) => ({
  flex: 1, // Chiếm toàn bộ không gian còn lại
  border: "none",
  outline: "none",
  fontSize: "1.2rem", // Tăng kích thước font chữ
  padding: theme.spacing(1, 2), // Tăng khoảng cách bên trong
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius, // Thêm bo góc
  boxShadow: theme.shadows[1], // Đổ bóng nhẹ
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem", // Kích thước phù hợp với màn hình nhỏ
    padding: theme.spacing(0.8, 1.5),
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F0F2F5',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

function Header({ idRoomAdd, setIdRoomAdd, unseenCount, setUnseenCount }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const searchMobileRef = useRef(null);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [showSearch, setShowSearch] = useState(false); // Thêm trạng thái để điều khiển hiển thị ô tìm kiếm
  const [chatNone, setChatNone] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);

  const location = useLocation();
  const isFriendsPage = [
    "/friends",
    "/friends/request",
    "/friends/request/sent",
    "/friends/suggestions",
  ].includes(location.pathname);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");

    // Kiểm tra nếu không có query trên đường dẫn, set giá trị searchQuery về null
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery(''); // Set về null nếu không có query
    }
  }, [location.search]); // Lắng nghe thay đổi của query trên đường dẫn

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleSearchSubmit = (event) => {
    navigate(`/search?query=${searchQuery}`);
    setShowSearch(false)
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function seenAll() {
    try {
      await notiService.markAllAsSeen();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchChatNone = async () => {
    try {
      const response = await axiosInstance.get("/chat-room").then(res => res.data);
      let data = []
      response.data.forEach(item => {
        if (item.last_message && !item.last_message.is_seen) {
          if (!item.outs?.includes('user_' + user.id) && !item.block?.includes('user_' + user.id)) {
            data.push({
              id: item.chat_room_id,
            })
          }
        }
      });
      setChatNone(data);
    } catch (error) {
      console.error("Lỗi khi lấy chatNone:", error);
    }
  };
  useEffect(() => {
    if (idRoomAdd > 0) {
      const exists = chatNone.some(item => item.id === idRoomAdd);
      if (!exists) {
        setChatNone(s => [...s, { id: idRoomAdd }]);
      }
    }
    if (typeof setIdRoomAdd === 'function') {
      setIdRoomAdd(0);
    }
  }, [idRoomAdd, chatNone]);

  useEffect(() => {
    fetchChatNone();
  }, []);
  const handleOpenNotifMenu = async (event) => {
    setAnchorElNotif(event.currentTarget);
    setUnseenCount(0);
    seenAll();
  };

  const handleCloseNotifMenu = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      is_seen: true,
    }));
    dispatch(setNotifications(updatedNotifications));
    setAnchorElNotif(null);
  };

  const handleLogout = async () => {
    try {
      // Ngắt kết nối WebSocket trước khi đăng xuất
      echo.disconnect();
      await auth.logout();
      navigate("/login");
    } catch (e) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
      <Toolbar>
        {/* Left section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link to="/">
            <img src="/logo2.png" alt="logo" style={{ height: 40 }} />
          </Link>
          <Search sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery} // Gán giá trị từ state
              onChange={handleSearchChange} // Cập nhật giá trị khi thay đổi
              onKeyDown={handleSearchKeyDown} // Kiểm tra phím Enter khi nhấn
            />
          </Search>
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' }, bgcolor: 'primary.main', borderRadius: '50%', '&:hover': { bgcolor: 'primary.dark' } }}
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
          {showSearch && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền bóng
                  zIndex: 999, // Đảm bảo overlay ở trên các phần tử khác
                }}
                onClick={() => setShowSearch(false)} // Đóng search khi click vào nền
              />
              <SearchMobile
                ref={searchMobileRef}
                onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click để không đóng search
              >
                <StyledInputBaseMobile
                  placeholder="Tìm kiếm..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
                <SearchButton onClick={handleSearchSubmit}>Tìm kiếm</SearchButton>
              </SearchMobile>
            </>
          )}
        </Box>

        {/* Center section */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Tooltip title="Trang chủ">
            <IconButton
              component={Link}
              to="/"
              sx={{
                color: isHomePage && "#1976d2",
              }}
            >
              <Home />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bạn bè">
            <IconButton
              component={Link}
              to="/friends"
              sx={{
                color: isFriendsPage && "#1976d2",
              }}
            >
              <People />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="SocialChat">
            <IconButton component={Link} to="/messages">
              <Badge badgeContent={chatNone.length} color="error">
                <Chat />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Thông báo">
            <IconButton onClick={handleOpenNotifMenu}>
              <Badge badgeContent={unseenCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElNotif}
            open={Boolean(anchorElNotif)}
            onClose={handleCloseNotifMenu}
            sx={{ mt: "45px" }}
          >
            <Notification
              seenAll={seenAll}
              unseenCount={unseenCount}
              setUnseenCount={setUnseenCount}
              onClose={handleCloseNotifMenu}
            />
          </Menu>
          <Tooltip title="Tài khoản">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                src={user?.avatar || "/user_default.png"}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: "45px" }}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to={`/profile/${user.id}`}
            >
              <Avatar
                src={user?.avatar || "/user_default.png"}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography>{user?.name || "Trang cá nhân"}</Typography>
            </MenuItem>
            {user.is_admin && (
              <MenuItem
                component={Link}
                to='/admin'
              >
                <AdminPanelSettingsTwoTone sx={{ mr: 1 }} />
                <Typography>Trang quản trị</Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              <Typography>Đăng xuất</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
