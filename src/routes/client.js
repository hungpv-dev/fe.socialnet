import Home from "../pages/Client/Home";
import Login from "../pages/Client/Login";
import Messages from "../pages/Client/Messages";
import Register from "../pages/Client/Register";
import Search from "../pages/Client/Search";

const pulicRouter = [
    {
        path: "/login", component: Login
    },
    {
        path: "/register", component: Register
    },
]

const privateRouters = [
    {
        path: "/", component: Home
    },
    {
        path: "/messages", component: Messages
    },
    // {
    //     path:"/search", component: <Search/>
    // }
];

export {pulicRouter, privateRouters};