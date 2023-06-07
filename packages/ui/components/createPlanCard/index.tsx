import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { createPlanCardStyle } from './style';
import { CloseRedIcon } from '@atoms/icons';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import { Input } from '@atoms/input';
import { ButtonGroupDropdown } from '..';
import { Label } from '@atoms/label';

export interface CreatePlanCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  anAddOns?: boolean;
}

export const CreatePlanCard = (props: CreatePlanCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    value = '5',
    subTitle = '',
    countTitle = '',
    anAddOns = false,
    ...rest
  } = props;
  const Money = [{ label: '10' }, { label: '19' }];

  return (
    <Box
      sx={[
        {
          ...createPlanCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        {anAddOns ? (
          <Box>
            <Typography sx={createPlanCardStyle.firstTextdark}>{subTitle}</Typography>
            <Label sx={createPlanCardStyle.labelSx} htmlFor="addTitle" isRequired>
              Set price
            </Label>
          </Box>
        ) : (
          <Typography sx={createPlanCardStyle.title}>{title}</Typography>
        )}
        {anAddOns ? (
          <Box sx={createPlanCardStyle.align}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ButtonGroupDropdown permissionList={Money} BtnName={'Monthly'} />
              <ButtonGroupDropdown permissionList={Money} BtnName={'Yearly'} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Unlimited'} sx={{ ml: '10px' }} />
              <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Limited'} />
              <Input
                value={value}
                textFieldStyle={{
                  width: '75px',
                  height: '40px',
                  margin: '0px 12px',
                  backgroundColor: 'primary.contrastText',
                }}
              />
              <Typography sx={createPlanCardStyle.secondText}>{subTitle}</Typography>
              <Box sx={{ ml: '80px' }}>
                <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={createPlanCardStyle.align}>
            <Typography sx={createPlanCardStyle.firstText}>{subTitle}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Unlimited'} />
              <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Limited'} />
              <Input
                value={value}
                textFieldStyle={{
                  width: '75px',
                  height: '40px',
                  margin: '0px 12px',
                  backgroundColor: 'primary.contrastText',
                }}
              />
              <Typography sx={createPlanCardStyle.secondText}>{subTitle}</Typography>
              <Box sx={{ ml: '80px' }}>
                <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
