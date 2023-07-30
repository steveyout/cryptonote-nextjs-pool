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
import {
  getReadableHashRateString,
  getReadableTime,
  getReadableCoin,
  formatNumber,
  getFee,
  getBlockchainUrl,
  Chart,
} from 'functions';
import TimeAgo from 'react-timeago';

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
    { field: 'miner', headerName: 'Miner', flex: 1 },
    { field: 'hashrate', headerName: 'Hash Rate', flex: 1 },
    { field: 'lastshare', headerName: 'Last Share Submitted', flex: 1 },
    { field: 'totalhashes', headerName: 'Total Hashes Submitted', flex: 1 },
  ];
  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} md={12} lg={12}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
          ) : (
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={1.5}>
                <Chip label={`${stats.config.coin} (${stats.config.symbol})`} variant="outlined" />
              </MDBox>

              {stats && stats.config ? (
                <MDBox mb={1.5}>
                  <MDTypography sx={{ mb: 2 }}> Top 10 miners</MDTypography>
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
                </MDBox>
              ) : (
                ''
              )}
            </Grid>
          )}
        </Grid>
      </MDBox>
    </>
  );
}
