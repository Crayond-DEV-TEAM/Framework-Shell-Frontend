import { ForgotPassword } from '@core/ui/components';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { forgotPasswordStyle } from './style';

export default function ForgotPasswordPage() {
  return (
    <Box
      sx={{
        ...forgotPasswordStyle.rootSx,
      }}
    >
      <Grid container>
        <Grid item xs={1} sm={1} md={6} xl={6} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          <Box
            component={'img'}
            //   src={login}
            sx={forgotPasswordStyle.imgSecSx}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <ForgotPassword />
        </Grid>
      </Grid>
    </Box>
  );
}
