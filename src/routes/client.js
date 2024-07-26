import Home from "../pages/Client/Home";
import Login from "../pages/Client/Login";
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
    }
];

export {pulicRouter, privateRouters};