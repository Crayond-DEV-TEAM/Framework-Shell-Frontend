import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { planModalCardStyle } from './style';
import { useEffect } from 'react';

export interface PlanModalCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  planCard?: any;
  planName?: string;
  planUser?: boolean;
  billingType?: string[];
  addOnsCount?: any;
  planCost?: number;
  billingPeriod?: string;
  addOnState?: any;
  handleChangeEvent?: (key: string, value: any) => void;
  createEditSubscription: any;
  charges?: number;
}

export const PlanModalCard = (props: PlanModalCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    planCard,
    planName = '',
    planUser = false,
    billingType = '',
    billingPeriod = '',
    addOnsCount,
    planCost = 0,
    addOnState,
    createEditSubscription,
    handleChangeEvent = (key, value) => false,
    charges = 0,
    ...rest
  } = props;
  const monthlyTotal = Array.isArray(createEditSubscription.add_on)
    ? createEditSubscription.add_on.reduce((accumulator: number, obj: any) => {
        const monthlyPrice =
          createEditSubscription.billing_type.name === 'Monthly'
            ? obj?.price?.monthly
            : createEditSubscription.billing_type.name === 'Yearly'
            ? obj?.price?.yearly
            : null;
        return accumulator + (monthlyPrice || 0);
      }, 0)
    : 0;
  const Total = planCost + monthlyTotal + charges;
  console.log(planName, 'planNameplanNameplanName');
  const planBlur = planName.length === 0 ? 'blur(4px)' : '';
  return (
    <Box
      sx={[
        {
          ...planModalCardStyle.rootSx,
          filter: planBlur,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={planModalCardStyle.title}>{planName}</Typography>
      <Box sx={planModalCardStyle.align}>
        <Box sx={planModalCardStyle.bottomAlign}>
          <Typography sx={planModalCardStyle.bottomText}>Silver plan</Typography>
          <Box sx={planModalCardStyle.dot} />
          <Typography sx={planModalCardStyle.bottomText}>{planUser ? 'Per user' : 'FlatFee'}</Typography>
          <Box sx={planModalCardStyle.dot} />
          <Typography sx={planModalCardStyle.bottomText}>{billingPeriod}</Typography>
        </Box>
        {Number.isNaN(planCost) ? '-' : <Typography sx={planModalCardStyle.rate}>${planCost}</Typography>}
      </Box>
      <Box sx={planModalCardStyle.line} />
      <Typography sx={planModalCardStyle.title}>Add ons ({addOnState?.length})</Typography>
      {/* {JSON.stringify(addOnState)} */}
      {Array.isArray(addOnState) &&
        addOnState.map((x: any, index: number) => {
          return (
            <Box key={index}>
              <Box sx={planModalCardStyle.align}>
                <Typography sx={planModalCardStyle.bottomText}>{x?.add_on?.name}</Typography>
                <Typography sx={planModalCardStyle.rate}>
                  $
                  {billingPeriod === 'Monthly'
                    ? Number.isNaN(x?.price?.monthly)
                      ? '-'
                      : x?.price?.monthly
                    : billingPeriod === 'Yearly'
                    ? Number.isNaN(x?.price?.yearly)
                      ? '-'
                      : x?.price?.yearly
                    : null}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }} />
            </Box>
          );
        })}
      <Box sx={planModalCardStyle.line} />
      {charges === 0 ? (
        ''
      ) : (
        <Box>
          <Box sx={planModalCardStyle.align}>
            <Typography sx={planModalCardStyle.title}>Charges</Typography>
            <Typography sx={planModalCardStyle.rate}>$ {charges}</Typography>
          </Box>
          <Box sx={planModalCardStyle.line} />
        </Box>
      )}
      <Box
        sx={planModalCardStyle.align}
        // onChange={(e) => {
        //   debugger;
        //   console.log(e,'checkinge')
        //   // handleChangeEvent('actual_price', e);
        // }}
      >
        <Typography sx={planModalCardStyle.title}>Total</Typography>
        {Number.isNaN(Total) ? '-' : <Typography sx={planModalCardStyle.rate}>${Total}</Typography>}
      </Box>
    </Box>
  );
};
