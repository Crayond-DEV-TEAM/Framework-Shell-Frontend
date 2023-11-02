import type { SxProps, Theme } from '@mui/material';
import { Box, Grid, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { tabsCardStyle } from './style';
import { TabsValueCard } from '../tabsValueCard';
export interface TabsCardProps {
  data?: any;
  sx?: SxProps<Theme>;
}

// eslint-disable-next-line react/display-name
export const TabsCard = forwardRef((props: TabsCardProps): JSX.Element => {
  const { data } = props;

  return (
    <Grid container sx={{ rowGap: '25px' }}>
      {data?.map((val: any, index: any) => {
        return (
          <Grid key={index} item xs={4} sx={tabsCardStyle.boxCard}>
            <Box sx={tabsCardStyle.header}>
              <span>{val?.icon}</span>
              <Typography sx={{ fontSize: { xs: '10px', md: '16px' } }}>{val?.header}</Typography>
            </Box>
            <Grid container spacing={1}>
              {val?.cardDetails.map((ele: any, index: any) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                    <TabsValueCard data={ele} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
});
