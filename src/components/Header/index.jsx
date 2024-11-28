import notiService from "@/services/notificationService";
import { useState, useEffect } from "react";
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
  Groups,
  Apps,
  Chat,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { setNotifications } from "@/actions/notification";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  backgroundColor: "#F0F2F5",
  borderRadius: "50px",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header({ unseenCount, setUnseenCount }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const isNotificationsPage = location.pathname === "/notifications";
  const isFriendsPage = [
    "/friends",
    "/friends/request",
    "/friends/request/sent",
    "/friends/suggestions",
  ].includes(location.pathname);
  const isHomePage = location.pathname === "/";

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);


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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img src="/logo2.png" alt="logo" style={{ height: 40 }} />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery} // Gán giá trị từ state
              onChange={
              } // Cập nhật giá trị khi thay đổi
              onKeyDown={handleSearchKeyDown} // Kiểm tra phím Enter khi nhấn
            />
          </Search>
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
              <Badge badgeContent={4} color="error">
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
