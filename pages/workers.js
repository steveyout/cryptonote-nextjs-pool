import MDBox from '../layouts/components/MDBox';
import Grid from '@mui/material/Grid';
import Input from 'components/MDInput';
import Typography from 'components/MDTypography';
import { Chip, InputAdornment, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
export default function Workers({}) {
  const [stats,setStats]=useState([]);
  const columns = [
    { field: 'Time Sent', headerName: 'Time Sent', flex: 1 },
    { field: 'Transaction Hash', headerName: 'Transaction Hash', flex: 1 },
    { field: 'Amount', headerName: 'Amount', flex: 1 },
    { field: 'Fee', headerName: 'Fee', flex: 1 },
    { field: 'Mixin', flex: 1 },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  ];
  return (
    <>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <Chip label="Chip Outlined" variant="outlined" />
            </MDBox>
            <MDBox mb={1.5}>
              <Typography variant={'h6'}>Your Stats & Payment History</Typography>
            </MDBox>
            <MDBox mb={1.5}>
              <Input
                variant={'outlined'}
                label={'wallet address'}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Look up address">
                        <IconButton aria-label="look up" color={'info'}>
                          <SearchOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>

            <MDBox mb={1.5}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
              </div>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export async function getServerSideProps() {
  // Pass data to the page via props
  return {
    props: {
      poolStats: [],
      poolBlockExplorer: [],
    },
  };
}
