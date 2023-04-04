import { TabsValueCard } from "@core/ui/components/tabsValueCard";
import type { SxProps, Theme } from '@mui/material';
import { Box, Grid, Typography } from "@mui/material";
import { forwardRef, } from 'react';
import { tabsCardStyle } from "./style";


export interface TabsCardProps {
  data?: any;
  val?: any;
  sx?: SxProps<Theme>;
}

export const TabsCard = forwardRef((props: TabsCardProps): JSX.Element => {
  const { data } = props
  return (
    <Grid container>
      {data?.data?.map((val: any) => {
        return (
          <Grid item xs={4} sx={tabsCardStyle.boxCard}>
            <Box sx={tabsCardStyle.header}>
              <span>{val?.icon}</span>
              <Typography>
                {val?.header}
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {
                val?.cardDetails.map((ele: any) => {
                  return (
                    <Grid item xs={3}>
                      <TabsValueCard data={ele} />
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  );
});


