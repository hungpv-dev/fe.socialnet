import Dashboard from "@/components/Admin/Dashboard";
import AdminLayout from "../layouts/admin";
import UserManagement from "@/components/Admin/UserManagement";
import ReportManagement from "@/components/Admin/ReportManagement";
import Analytics from "@/components/Admin/Analytics";
import ReportTypeManagement from "@/components/Admin/ReportTypeManagement";

const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <UserManagement />
      },
      {
        path: "analytics", 
        element: <Analytics />
      },
      {
        path: "reports", 
        element: <ReportManagement />
      },
      {
        path: "reports/type", 
        element: <ReportTypeManagement />
      },
    ]
  }
];

export default adminRoutes;
