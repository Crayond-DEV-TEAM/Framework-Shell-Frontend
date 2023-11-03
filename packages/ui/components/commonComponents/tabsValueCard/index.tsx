import React from 'react';
import { forwardRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { tabsCardStyle } from './style';
// import { TabsValueCard } from "./tabsValueCard";

export interface TabsValueCardProps {
  data?: any;
  val?: any;
  sx?: SxProps<Theme> | undefined;
}

// eslint-disable-next-line react/display-name
export const TabsValueCard = forwardRef((props: TabsValueCardProps): JSX.Element => {
  const { data } = props;
  return (
    <Box
      sx={
        (data.value === 'Sent' && tabsCardStyle.sent) ||
        (data.value === 'Delivered' && tabsCardStyle.delivered) ||
        (data.value === 'Not Delivered' && tabsCardStyle.notDelivered) ||
        (data.value === 'Clicked' && tabsCardStyle.clicked) ||
        tabsCardStyle.sent
      }
    >
      <span>{data?.number}</span>
      <Typography sx={{ fontSize: { xs: '10px', sm: '11px' } }}>{data?.value}</Typography>
    </Box>
  );
});
