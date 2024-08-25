import QuanLy from "../pages/Admin/Quanly";
import Thongke from "../pages/Admin/Thongke";
import ThongkeCT from "../pages/Admin/ThongkeCT";

const adminRouters = [
  {
    path: "/admin/quanli",
    component: QuanLy,
  },
  {
    path: "/admin/thongke",
    component: Thongke,
  },
  {
    path: "/admin/thongkect",
    component: ThongkeCT,
  },
];

export default adminRouters;
