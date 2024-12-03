import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/SlideBar';
import { Box } from '@mui/material';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
