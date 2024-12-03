import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const Analytics = () => {
  const chartData = {
    xAxis: [
      {
        data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
      }
    ],
    series: [
      {
        data: [2400, 1398, 9800, 3908, 4800, 3800, 4300, 5300, 6200, 4100, 3500, 4800],
        label: 'Người dùng mới'
      }
    ]
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Thống kê</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Biểu đồ người dùng</Typography>
              <LineChart
                height={300}
                series={chartData.series}
                xAxis={chartData.xAxis}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;