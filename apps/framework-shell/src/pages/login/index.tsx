import { Login } from '@core/ui/components';
import { Box, Grid } from '@mui/material';

import crayond from '../../assets/crayond.svg';
import login from '../../assets/login.svg';
import toolkit from '../../assets/toolkit.svg';
import { loginStyle } from './style';
export default function LoginPage() {
  return (
    <Box
      sx={{
        ...loginStyle.rootSx,
      }}
    >
      <Box component={'img'} src={toolkit} />

      <Grid container>
        {/* <Hidden only={['xs', 'sm']}> */}
        <Grid item xs={12} sm={6} md={6} xl={6} justifyContent={'center'} sx={loginStyle?.imgSecSx}>
          <Box component={'img'} src={login} height={'315px'} width={'285px'} />
        </Grid>
        {/* </Hidden> */}
        <Grid item xs={12} sm={6} md={6} xl={6} sx={loginStyle?.formSx}>
          <Login />
        </Grid>
      </Grid>

      <Box component={'img'} src={crayond} sx={loginStyle.bottomImgSx} />
    </Box>
  );
}
