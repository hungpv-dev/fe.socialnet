import QuanLy from "../pages/Admin/Quanly";
import Thongke from "../pages/Admin/Thongke";
import ThongkeCT from "../pages/Admin/ThongkeCT";
import ToCao from "../pages/Admin/Tocao";
// import ToCao from "../pages/Admin/Tocao";

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
  {
    path: "/tocao",
    component: ToCao,
  },
];

export default adminRouters;
