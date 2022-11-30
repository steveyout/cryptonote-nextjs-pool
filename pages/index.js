import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import ComplexStatisticsCard from '../layouts/examples/Cards/StatisticsCards/ComplexStatisticsCard';
import ReportsBarChart from '../layouts/examples/Charts/BarCharts/ReportsBarChart';
import reportsBarChartData from '../layouts/layouts/dashboard/data/reportsBarChartData';
import ReportsLineChart from '../layouts/examples/Charts/LineCharts/ReportsLineChart';
import Projects from '../layouts/layouts/dashboard/components/Projects';
import OrdersOverview from '../layouts/layouts/dashboard/components/OrdersOverview';
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
} from 'functions';
import Typography from '@mui/material/Typography';
export default function Home({ pool, network, stats, lastblock, config }) {
  const { sales, tasks } = reportsLineChartData;
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
                count={`${getReadableHashRateString(pool.hashrate)} /sec`}
                percentage={{
                  color: 'success',
                  amount: '+55%',
                  label: 'than lask week',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<ViewInArOutlinedIcon />}
                title="BLOCKS FOUND"
                count={`${pool.totalBlocks}`}
                percentage={{
                  color: 'success',
                  amount: '+3%',
                  label: 'than last month',
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
                count={`${getReadableTime(network.difficulty / pool.hashrate)} `}
                percentage={{
                  color: 'success',
                  amount: '+1%',
                  label: 'than yesterday',
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
                count={`${((pool.roundHashes / network.difficulty) * 100).toFixed(1)} %`}
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
                    network.difficulty / config.coinDifficultyTarget
                  )} /sec`}
                  percentage={{
                    color: 'success',
                    amount: '+55%',
                    label: 'than lask week',
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon={<LockOpenOutlinedIcon />}
                  title="DIFFICULTY (UPX)"
                  count={`${formatNumber(network.difficulty.toString(), ' ')}`}
                  percentage={{
                    color: 'success',
                    amount: '+3%',
                    label: 'than last month',
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
                  count={`${formatNumber(network.height.toString(), ' ')}`}
                  percentage={{
                    color: 'success',
                    amount: '+1%',
                    label: 'than yesterday',
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
                  count={`${getReadableCoin(stats, lastblock.reward)}`}
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
                    amount: '+55%',
                    label: 'than lask week',
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
                    amount: '+3%',
                    label: 'than last month',
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
                    amount: '+1%',
                    label: 'than yesterday',
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
              <Typography variant={'subtitle1'}>LAST HASH</Typography>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Hashrate"
                  description=""
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Difficulty"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
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
                  color="dark"
                  title="Miners"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Miners"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  const pathname = resolvedUrl;
  const url =
    pathname === '/'
      ? `https://Uplexa.${process.env.NEXT_PUBLIC_HOST}/api/stats`
      : `https://${pathname}.${process.env.NEXT_PUBLIC_HOST}/api/stats`;
  // Fetch data from external API
  const res = await fetch(url);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      pool: data.pool,
      network: data.network,
      stats: data,
      lastblock: data.lastblock,
      config: data.config,
    },
  };
}
