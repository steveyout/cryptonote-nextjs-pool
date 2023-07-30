import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import Input from 'components/MDInput';
import Typography from 'components/MDTypography';
import { CardContent, Chip, InputAdornment, Paper, Skeleton, Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DataGrid } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//functions
import { formatLuck, Chart } from 'functions';
import TimeAgo from 'react-timeago';
import ComplexStatisticsCard from '../layouts/examples/Cards/StatisticsCards/ComplexStatisticsCard';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ReportsLineChart from '../layouts/examples/Charts/LineCharts/ReportsLineChart';

export default function Workers() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const url = `https://${process.env.NEXT_PUBLIC_API}/api/stats`;
        const res = await fetch(url);
        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchMyAPI();
  }, []);

  const columns = [
    { field: 'time', headerName: 'Time Found', flex: 1 },
    { field: 'reward', headerName: 'Reward', flex: 1 },
    { field: 'height', headerName: 'Height', flex: 1 },
    { field: 'difficulty', headerName: 'Difficulty', flex: 1 },
    { field: 'hash', headerName: 'Block Hash', flex: 1 },
    { field: 'miner', headerName: 'Miner Address', flex: 1 },
    { field: 'effort', headerName: 'Effort', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];
  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} md={12} lg={12}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon={<AddchartOutlinedIcon />}
                    title="BLOCKS FOUND"
                    count={stats.pool.totalBlocks}
                    percentage={{
                      color: 'success',
                      amount: '',
                      label: 'just updated',
                    }}
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={<ViewInArOutlinedIcon />}
                    title="TOTAL SOLO BLOCKS"
                    count={`${stats.pool.totalBlocksSolo}`}
                    percentage={{
                      color: 'success',
                      amount: '',
                      label: 'just updated',
                    }}
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon={<AccessTimeOutlinedIcon />}
                    title="MATURITY"
                    count={stats.config.depth}
                    percentage={{
                      color: 'success',
                      amount: '',
                      label: 'just updated',
                    }}
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon={<TrendingUpOutlinedIcon />}
                    title="AVERAGE LUCK"
                    count={formatLuck(stats,stats.pool.totalDiff, stats.pool.totalShares)}
                    percentage={{
                      color: 'success',
                      amount: '',
                      label: 'Just updated',
                    }}
                  />
                </MDBox>
              </Grid>
            </>
          )}
        </Grid>

        {loading ? (
          <Grid item xs={12} md={12} lg={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ) : (
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="inherit"
                    title="Blocks found in the last 30 days"
                    description=""
                    date=""
                    chart={Chart(stats.charts.hashrate)}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        )}

        {loading ? (
          <Grid item xs={12} md={12} lg={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ) : (
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden', height: '400px' }}>
                  <DataGrid
                    getRowId={(row) => row.port}
                    rows={[]}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                </Paper>
              </Grid>
            </Grid>
          </MDBox>
        )}
      </MDBox>
    </>
  );
}
