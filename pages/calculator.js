import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import Input from 'components/MDInput';
import Typography from 'components/MDTypography';
import { MenuItem, Chip, InputAdornment, Select, Skeleton,Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
//functions
import { getReadableCoin } from 'functions';

export default function Workers() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [power, setPower] = useState(0);
  const [profits, setProfits] = useState(0);
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
  function handleChange(event) {
    setPower(event.target.value);
  }

  function handleInputChange(event) {
    let rateUnit = Math.pow(1000, parseInt(power));
    let hashRate = parseFloat(event.target.value) * rateUnit;
    let profit = ((hashRate * 86400) / stats.network.difficulty) * stats.lastblock.reward;
    setProfits(profit);
  }
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
                <Typography variant={'h6'}>Estimate Mining Profits</Typography>
              </MDBox>
              <MDBox mb={1.5}>
                <Input
                  variant={'outlined'}
                  label={'Hash Rate'}
                  fullWidth
                  onChange={handleInputChange}
                  InputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={power}
                          label="hashpower"
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>H/s</MenuItem>
                          <MenuItem value={1}>KH/s</MenuItem>
                          <MenuItem value={2}>MH/s</MenuItem>
                        </Select>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack sx={{ width: '100%' }} spacing={2} mt={2}>
                  <Alert variant="filled" severity="info">
                    Estimated profit: {getReadableCoin(stats, profits)} per day
                  </Alert>
                </Stack>
              </MDBox>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </>
  );
}
