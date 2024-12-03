import Dashboard from "@/components/Admin/Dashboard";
import AdminLayout from "../layouts/admin";
import UserManagement from "@/components/Admin/UserManagement";
import Analytics from "@/components/Admin/Analytics";

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
      }
    ]
  }
];

export default adminRoutes;
