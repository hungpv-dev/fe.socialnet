// Layout
import LayoutMessages from "../layouts/messages";
import LayoutSettings from "../layouts/settings";

// Trang chủ
import Home from "../pages/Client/Home";

// Xử lý xác thực
import Login from "../pages/Client/Auth/Login";
import Register from "../pages/Client/Auth/Register";
import Repassword from "../pages/Client/Auth/Repassword";
import ForgotPassword from "../pages/Client/Auth/ForgotPassword";

// Trang nhắn tin
import Messages from "../pages/Client/Messages";

// cài đặt

import Settings from "../pages/Client/Settings";
import Canhan from "../pages/Client/TrangCaNhan";

import SignOutDevices from "../pages/Client/Settings/SignOutDevices";
import ChangePassword from "../pages/Client/Settings/ChangePassword";
import FactorAuthen from "../pages/Client/Settings/FactorAuthen";
import ActivityLog from "../pages/Client/Settings/ActivityLog";
import BlockManagement from "../pages/Client/Settings/Block";
import PasswordAndSecurity from "../pages/Client/Settings/PasswordAndSecurity";


import Search from "../pages/Client/Search";
import Notification from "../pages/Client/Notification";
import New from "../pages/Client/New";

import FriendPage from '../pages/Client/FriendPage/FriendPage';
import PostDetail from "@/components/Posts/PostDetail";
import StoryDetail from "@/components/Stories/StoryDetail";
import VerifyCode from "@/pages/VerifyCode";
import ProfileUpdate from "@/pages/Client/TrangCaNhan/ProfileUpdate";
import ProfileUpdateAvatar from "@/pages/Client/TrangCaNhan/ProfileUpdateAvatar";
import ActivityLogPpage from "@/pages/Client/ActivityLog";
import BlockedUsersList from "@/pages/Client/TrangCaNhan/BlockList";
// Router không cần đăng nhập vẫn vô được
const pulicRouter = [
    {
        path: "/login", component: Login
    },
    {
        path: "/register", component: Register
    },
    {
        path: "/forgot-password", component: ForgotPassword
    },
    {
        path: "/repassword", component: Repassword
    },
    {
        path: "/verify-code", component: VerifyCode
    }
]


// Route cần đăng nhập mới vô được
const privateRouters = [
    // Trang chủ
    {
        path: "/", component: Home
    },

    // Trang nhắn tin
    {
        path: "/messages", component: Messages, layout: LayoutMessages
    },
    {
        path: "/messages/:id", component: Messages, layout: LayoutMessages
    },

    // Chi tiết bài viết
    {
        path: "/posts/:id", component: PostDetail
    },

    // Chi tiết bài viết
    {
        path: "/blocks", component: BlockedUsersList
    },

    // Chi tiết bài viết
    {
        path: "/story/:id", component: StoryDetail
    },

    // cài đặt 
    {
        path: "/setting", component: Settings, layout: LayoutSettings
    },
    // {
    //     path: "/setting/pirvacy", component: Privacy, layout: LayoutSettings  // quyền riêng tư
    // },
    {
        path: "/setting/password_and_security", component: PasswordAndSecurity, layout: LayoutSettings  // trang mk và bảo mật
    },
    {
        path: "/setting/Sign_out_devices", component: SignOutDevices, layout: LayoutSettings  // trang đăng xuất thiết bị 
    },
    {
        path: "/setting/change_password", component: ChangePassword, layout: LayoutSettings  // đổi mật khẩu
    },
    {
        path: "/setting/factor_authen", component: FactorAuthen, layout: LayoutSettings   // xác thực yếu tố
    },
    {
        path: "/setting/activity_log", component: ActivityLog, layout: LayoutSettings   // nhật ký hoạt động
    },
    {
        path: "/setting/block", component: BlockManagement, layout: LayoutSettings   // chặn
    },
    // trang ca nhan
    {
        path: "/profile/:id", component: Canhan
    },
    {
        path: "/profile-update", component: ProfileUpdate
    },
    {
        path: "/profile-avatar", component: ProfileUpdateAvatar
    },
    {
        path: "/search", component: Search
    },
    {
        path: "/notifications", component: Notification
    },
    {
        path: "/new", component: New
    },
    {
        path: "/friends", component: FriendPage
    },
    {
        path: "/friends/request", component: FriendPage
    },
    {
        path: "/friends/request/sent", component: FriendPage
    },
    {
        path: "/friends/suggestions", component: FriendPage
    },
    {
        path: "/activity/log", component: ActivityLogPpage
    },

];

export { pulicRouter, privateRouters };