import { SignUp } from '@core/ui/components/signUp';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { signUpStyle } from './style';

export default function SignUpPage() {
  return (
    <Box
      sx={{
        ...signUpStyle.rootSx,
      }}
    >
      <Box
        component={'img'}
        //  src={toolkit}
      />
      <Grid container>
        <Grid item xs={1} sm={1} md={6} xl={6} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          <Box
            component={'img'}
            //   src={login}
            sx={signUpStyle.imgSecSx}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <SignUp />
        </Grid>
      </Grid>
    </Box>
  );
}
