import PageNotFoundImage from '@assets/pageNotFound.png';
import { Button } from '@atoms/button';
// import { Button } from '@atoms';
import type { SxProps, Theme } from '@mui/material';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { pageNotFoundStyle } from './style';

export interface PageNotFoundProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export function PageNotFound(props: PageNotFoundProps): JSX.Element {
  const { className = '', sx = {}, ...rest } = props;

  const navigate = useNavigate();

  return (
    <Box
      sx={[
        {
          ...pageNotFoundStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} display="flex" justifyContent="center">
            <Box sx={pageNotFoundStyle.imageBoxSx}>
              <img src={PageNotFoundImage} alt="" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={4}>
            <Grid container display="flex" justifyContent="center">
              <Grid item xs={12} sm={12} md={12} display="flex" justifyContent="center">
                <Typography sx={pageNotFoundStyle.headerTextSx}>Page Not Found</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} display="flex" justifyContent="center" mt={1.8}>
                <Box sx={pageNotFoundStyle.bodyContentSx}>
                  <Typography sx={pageNotFoundStyle.bodyContentTextSx}>
                    We&lsquo;re Sorry, The Page You Requested Could Not Be Found!
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} display="flex" justifyContent="center" mt={4}>
                <Box>
                  <Button
                    variant="contained"
                    sx={pageNotFoundStyle.buttonSx}
                    onClick={() => navigate('/languageConfig')}
                  >
                    Go Home
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
