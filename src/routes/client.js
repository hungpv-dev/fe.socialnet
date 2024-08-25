import Home from "../pages/Client/Home";
import Login from "../pages/Client/Login";
import Messages from "../pages/Client/Messages";
import Register from "../pages/Client/Register";
import Repassword from "../pages/Client/Repassword";
import ForgotPassword from "../pages/Client/ForgotPassword";
import SettingPrivacy from "../pages/Client/SettingPrivacy";

// cài đặt

import Setting from "../pages/Client/Setting";
import SettingPassword from "../pages/Client/SettingPassword";
import SettingNewPass from "../pages/Client/SettingNewPass";


const pulicRouter = [
    {
        path: "/login", component: Login
    },
    {
        path: "/register", component: Register
    },
    {
        path: "/forgot", component: ForgotPassword
    },
    {
        path: "/repassword", component: Repassword
    },

    // cài đặt 
    {
        path: "/setting", component: Setting
    },
    {
        path: "/setting-privacy", component: SettingPrivacy
    },
    {
        path: "/setting-password", component: SettingPassword
    },
    {
        path: "/setting-newpass", component: SettingNewPass
    },
    
    
]

const privateRouters = [
    {
        path: "/", component: Home
    },
    {
        path: "/messages", component: Messages
    },
];

export {pulicRouter, privateRouters};