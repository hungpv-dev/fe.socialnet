import QuanLy from "../pages/Admin/Quanly";
import Thongke from "../pages/Admin/Thongke";
import ThongkeCT from "../pages/Admin/ThongkeCT";

const adminRouters = [
  {
    path: "/quanli",
    component: QuanLy,
  },
  {
    path: "/thongke",
    component: Thongke,
  },
  {
    path: "/thongkect",
    component: ThongkeCT,
  },
];



const adminRoutersPrefix =  adminRouters.map(route => ({
  ...route,
  path: `/admin${route.path}`
}));

export default adminRoutersPrefix;
