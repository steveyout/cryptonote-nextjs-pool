import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import Input from 'components/MDInput';
import Typography from 'components/MDTypography';
import { CardContent, Chip, InputAdornment, Paper, Skeleton, Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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

  ////on search
  const [buttonLoading, setButtonLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  const searchData = async (event) => {
    setButtonLoading(true);
    if (!event) {
      return;
    }
    try {
      const url = `https://${process.env.NEXT_PUBLIC_API}/api/stats_address?address=${searchTerm}&longpoll=false`;
      const res = await fetch(url);
      const data = await res.json();
      setSearch(data);
      setButtonLoading(false);
      setRows2(data.workers);
    } catch (error) {
      setButtonLoading(false);
      console.error(error);
    }
  };
  const columns = [
    { field: 'Time Sent', headerName: 'Time Sent', flex: 1 },
    { field: 'Transaction Hash', headerName: 'Transaction Hash', flex: 1 },
    { field: 'Amount', headerName: 'Amount', flex: 1 },
    { field: 'Fee', headerName: 'Fee', flex: 1 },
    { field: 'Mixin', flex: 1 },
  ];

  const columns2 = [
    {
      field: 'hashrate2',
      headerName: 'Status',
      flex: 1,
      valueGetter: (params) => `${params.row.hashrate || ''}`,
      renderCell: (params) => {
        return (
          <Chip
            icon={params.value <= 0 ? <CancelIcon /> : <CheckCircleIcon />}
            label={params.value <= 0 ? 'Offline' : 'Online'}
            color={params.value <= 0 ? 'error' : 'success'}
          />
        );
      },
    },
    { field: 'name', headerName: 'Worker Name', flex: 1 },
    {
      field: 'hashrate',
      headerName: 'Hash Rate',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${getReadableHashRateString(params.value)} /sec`;
      },
    },
    {
      field: 'hashrate_1h',
      headerName: 'HR (1h)',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${getReadableHashRateString(params.value)} /sec`;
      },
    },
    {
      field: 'hashrate_6h',
      headerName: 'HR (6h)',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${getReadableHashRateString(params.value)} /sec`;
      },
    },
    {
      field: 'hashrate_24h',
      headerName: 'HR (24h)',
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${getReadableHashRateString(params.value)} /sec`;
      },
    },
    {
      field: 'lastShare',
      headerName: 'Last Share Submitted',
      flex: 1,
      renderCell: (params) => {
        if (params.value == null) {
          return '';
        }
        return <TimeAgo date={`${new Date(params.value * 1000).toISOString()}`} />;
      },
    },
    { field: 'hashes', headerName: 'Total Hashes Submitted', flex: 1 },
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
              <MDBox mb={1.5}>
                <Typography variant={'h6'}>Your Stats & Payment History</Typography>
              </MDBox>
              <MDBox mb={1.5}>
                <Input
                  variant={'outlined'}
                  label={'wallet address'}
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Look up address">
                          <LoadingButton
                            aria-label="look up"
                            color={'primary'}
                            variant={'contained'}
                            loading={buttonLoading}
                            startIcon={<SearchOutlinedIcon />}
                            onClick={(e) => searchData(e)}
                          >
                            Search
                          </LoadingButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </MDBox>

              {search && search.stats ? (
                <MDBox mb={1.5}>
                  <MDTypography sx={{ mb: 2 }}> Hashrate</MDTypography>
                  <Card sx={{ minWidth: 275, mb: 4 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <SpeedIcon />{' '}
                        </IconButton>
                        Current Hash Rate:({getReadableHashRateString(search.stats.hashrate)}/sec)
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <SpeedIcon />{' '}
                        </IconButton>
                        Average 1/6/24-hour Hash Rate: (
                        {getReadableHashRateString(search.stats.hashrate_1h)}/sec) (
                        {getReadableHashRateString(search.stats.hashrate_6h)}/sec) (
                        {getReadableHashRateString(search.stats.hashrate_24h)}/sec)
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <AccessTimeIcon />{' '}
                        </IconButton>
                        Last Share Submitted:
                        <TimeAgo
                          date={`${new Date(search.stats.lastShare * 1000).toISOString()}`}
                        />
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <CloudUploadIcon />{' '}
                        </IconButton>
                        Total Hashes Submitted: {search.stats.roundHashes}
                      </Typography>
                    </CardContent>
                  </Card>

                  <MDTypography sx={{ mb: 2 }}> Payments</MDTypography>
                  <Card sx={{ minWidth: 275, mb: 4 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <SpeedIcon />{' '}
                        </IconButton>
                        Pending Balance:({getReadableCoin(stats)})
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <SpeedIcon />{' '}
                        </IconButton>
                        Total Paid: ({getReadableCoin(stats)})
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <AccessTimeIcon />{' '}
                        </IconButton>
                        Last 24h Paid: ({getReadableCoin(stats)})
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <CloudUploadIcon />{' '}
                        </IconButton>
                        Last 7d Paid: ({getReadableCoin(stats)})
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <CloudUploadIcon />{' '}
                        </IconButton>
                        Round contribution:{' '}
                        {Math.round(
                          ((search.stats.roundHashes * 100) / stats.pool.roundHashes) * 1000
                        ) / 1000}{' '}
                        % (shares),
                        {Math.round(
                          ((search.stats.roundScore * 100) / stats.pool.roundScore) * 1000
                        ) / 1000}{' '}
                        % (score)
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <IconButton>
                          <CloudUploadIcon />{' '}
                        </IconButton>
                        Current Payout Estimate:{' '}
                        {getReadableCoin(
                          stats,
                          Math.round(
                            parseFloat(stats.lastblock.reward || 0) *
                              (parseFloat(
                                (search.stats.roundHashes * 100) / stats.pool.roundHashes
                              ) /
                                100)
                          )
                        )}
                      </Typography>
                    </CardContent>
                  </Card>

                  <MDTypography sx={{ mb: 2 }}> Worker Statistics</MDTypography>
                  <Paper sx={{ width: '100%', overflow: 'hidden', height: '400px' }}>
                    <DataGrid
                      getRowId={(row) => row.name}
                      rows={rows2}
                      columns={columns2}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </Paper>

                  <MDTypography sx={{ mb: 2, mt: 2 }}> Payments History</MDTypography>
                </MDBox>
              ) : search.error === 'Not found' ? (
                <Alert variant="filled" severity="error">
                  Not found
                </Alert>
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
