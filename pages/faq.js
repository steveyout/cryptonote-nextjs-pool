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
import { getReadableHashRateString, getReadableCoin } from 'functions';
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
                      <TimeAgo date={`${new Date(search.stats.lastShare * 1000).toISOString()}`} />
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
                            (parseFloat((search.stats.roundHashes * 100) / stats.pool.roundHashes) /
                              100)
                        )
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </MDBox>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </>
  );
}
