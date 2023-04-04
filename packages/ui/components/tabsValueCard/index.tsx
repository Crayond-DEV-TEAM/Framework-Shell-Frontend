import React from "react";
import { forwardRef, useState } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import type { SxProps, Theme } from '@mui/material';
import { tabsCardStyle } from "./style";
// import { TabsValueCard } from "./tabsValueCard";


export interface TabsValueCardProps {
  data?: any;
  val?: any;
  sx?: SxProps<Theme> | undefined
}

export const TabsValueCard = forwardRef((props: TabsValueCardProps): JSX.Element => {
  const { data } = props
  return (
    <Box sx={
      data?.data.value === "Sent" && tabsCardStyle.sent
      || data?.data.value === "Delivered" && tabsCardStyle.delivered
      || data?.data.value === "Not Delivered" && tabsCardStyle.notDelivered
      || data?.data.value === "Clicked" && tabsCardStyle.clicked
      || tabsCardStyle.sent}>
      <span>{data?.data?.number}</span>
      <Typography>{data?.data?.value}</Typography>
    </Box>
  );
});


