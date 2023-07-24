import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import ComplexStatisticsCard from '../layouts/examples/Cards/StatisticsCards/ComplexStatisticsCard';
import ReportsLineChart from '../layouts/examples/Charts/LineCharts/ReportsLineChart';
import reportsLineChartData from '../layouts/layouts/dashboard/data/reportsLineChartData';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LineWeightOutlinedIcon from '@mui/icons-material/LineWeightOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { useRouter } from 'next/router';

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
import MDTypography from '../layouts/components/MDTypography';
import TimeAgo from 'react-timeago';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home({ poolStats, poolBlockExplorer }) {
  const [stats, setStats] = useState(poolStats);
  const [blockExplorer, setBlockExplorer] = useState(poolBlockExplorer);
  const { sales, tasks } = reportsLineChartData;
  const { pathname } = useRouter();
  ///fetch fresh data every 1 seconds
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const url = `https://${process.env.NEXT_PUBLIC_API}/api/live_stats`;
        const res = await fetch(url);
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.log(e);
      }
    }

    const intervalId = setInterval(() => {
      fetchMyAPI();
    }, 3000); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<AddchartOutlinedIcon />}
                title="POOL HASHRATE"
                count={`${getReadableHashRateString(stats.pool.hashrate)} /sec`}
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
                title="BLOCKS FOUND"
                count={`${stats.pool.totalBlocks}`}
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
                title="BLOCKS FOUND EVERY"
                count={`${getReadableTime(stats.network.difficulty / stats.pool.hashrate)} `}
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
                title="CURRENT EFFORT"
                count={`${((stats.pool.roundHashes / stats.network.difficulty) * 100).toFixed(
                  1
                )} %`}
                percentage={{
                  color: 'success',
                  amount: '',
                  label: 'Just updated',
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon={<SignalCellularAltOutlinedIcon />}
                  title="NETWORK HASHRATE"
                  count={`${getReadableHashRateString(
                    stats.network.difficulty / stats.config.coinDifficultyTarget
                  )} /sec`}
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
                  icon={<LockOpenOutlinedIcon />}
                  title="DIFFICULTY (UPX)"
                  count={`${formatNumber(stats.network.difficulty.toString(), ' ')}`}
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
                  icon={<LineWeightOutlinedIcon />}
                  title="BLOCKCHAIN HEIGHT"
                  count={`${formatNumber(stats.network.height.toString(), ' ')}`}
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
                  icon={<AttachMoneyOutlinedIcon />}
                  title="LAST REWARD"
                  count={`${getReadableCoin(stats, stats.lastblock.reward)}`}
                  percentage={{
                    color: 'success',
                    amount: '',
                    label: 'Just updated',
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon={<PeopleAltOutlinedIcon />}
                  title="CONNECTED MINERS"
                  count={`${stats.pool.miners}/${stats.pool.minersSolo}`}
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
                  icon={<PercentOutlinedIcon />}
                  title="POOL FEE"
                  count={`${getFee(stats)}`}
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
                  icon={<MilitaryTechOutlinedIcon />}
                  title="FINDER REWARD"
                  count={`${stats.config.finderReward} %`}
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
                  icon={<PaidOutlinedIcon />}
                  title="MINIMUM PAYOUT"
                  count={`${getReadableCoin(stats, stats.config.minPaymentThreshold)}`}
                  percentage={{
                    color: 'success',
                    amount: '',
                    label: 'Just updated',
                  }}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon={<PaidOutlinedIcon />}
                  title="PAYMENT INTERVAL"
                  count={`${getReadableTime(stats.config.paymentsInterval)}`}
                  percentage={{
                    color: 'success',
                    amount: '',
                    label: 'Just updated',
                  }}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <MDBox sx={{ overflow: 'hidden' }}>
                    <MDTypography variant="h6" fontWeight={'9.9px'} gutterBottom>
                      LAST HASH
                    </MDTypography>
                    <Link
                      href={getBlockchainUrl(stats.lastblock.hash, stats, blockExplorer)}
                      variant="body2"
                      color={'info'}
                    >
                      {stats.lastblock.hash}
                    </Link>
                    <MDTypography variant="h6" fontWeight={'9.9px'} gutterBottom>
                      <Chip
                        variant="outlined"
                        color={'error'}
                        label={
                          <TimeAgo
                            date={`${new Date(stats.lastblock.timestamp * 1000).toISOString()}`}
                          />
                        }
                      />
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="inherit"
                  title="Hashrate"
                  description=""
                  date=""
                  chart={Chart(stats.charts.hashrate)}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="inherit"
                  title="Difficulty"
                  description=""
                  date=""
                  chart={Chart(stats.charts.difficulty)}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="inherit"
                  title="Miners"
                  description=""
                  date=""
                  chart={Chart(stats.charts.miners)}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="inherit"
                  title="Workers"
                  description=""
                  date=""
                  chart={Chart(stats.charts.workers)}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const url = `https://${process.env.NEXT_PUBLIC_API}/api/stats`;
    const url2 = `https://${process.env.NEXT_PUBLIC_API}/api/block_explorers`;

    // Fetch data from external API
    const res = await fetch(url);
    const data = await res.json();
    const result = await fetch(url2);
    const blockExplorer = await result.json();

    console.log(res);
    // Pass data to the page via props
    return {
      props: {
        poolStats: data,
        poolBlockExplorer: blockExplorer,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        poolStats: [],
        poolBlockExplorer: [],
      },
    };
  }
}
