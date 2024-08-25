import LayoutMessages from "../layouts/messages";
import Home from "../pages/Client/Home";
import Login from "../pages/Client/Login";
import Messages from "../pages/Client/Messages";
import Register from "../pages/Client/Register";

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
        path: "/messages", component: Messages, layout: LayoutMessages
    },
    {
        path: "/messages/:id", component: Messages, layout: LayoutMessages
    },
];

export {pulicRouter, privateRouters};