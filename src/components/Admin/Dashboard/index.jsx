import { Box, Grid, Paper, Typography } from '@mui/material';
import { PeopleAlt, Message, Report, TrendingUp } from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '1,234',
      icon: <PeopleAlt />,
      color: '#1976d2'
    },
    {
      title: 'Tin nhắn mới',
      value: '56', 
      icon: <Message />,
      color: '#2e7d32'
    },
    {
      title: 'Báo cáo vi phạm',
      value: '12',
      icon: <Report />,
      color: '#d32f2f'
    },
    {
      title: 'Tăng trưởng',
      value: '+15%',
      icon: <TrendingUp />,
      color: '#ed6c02'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Tổng quan</Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: stat.color }}>{stat.icon}</Box>
              <Box>
                <Typography color="text.secondary">{stat.title}</Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
