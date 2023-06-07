import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addOnsCardStyle } from './style';
import { Label } from '@atoms/label';
import { ButtonGroupDropdown } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';

export interface AddOnsCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  ListAddons?: any;
}

export const AddOnsCard = (props: AddOnsCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    value = '5',
    subTitle = '',
    countTitle = '',
    ListAddons,
    ...rest
  } = props;
  const Money = [{ label: '10' }, { label: '19' }];

  return (
    <Box
      // sx={[
      //   {
      //     ...addOnsCardStyle.rootSx,
      //   },
      //   ...(Array.isArray(sx) ? sx : [sx]),
      // ]}
      className={`${className}`}
      {...rest}
    >
      <>
        {ListAddons.map((x: any, index: any) => {
          return (
            <>
              <Box key={index} sx={addOnsCardStyle.rootSx}>
                <Box>
                  <Typography sx={addOnsCardStyle.firstTextdark}>{x.subTitle}</Typography>
                  <Label sx={addOnsCardStyle.labelSx} htmlFor="addTitle" isRequired>
                    Set price
                  </Label>
                </Box>

                <Box sx={addOnsCardStyle.align}>
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
                    <Typography sx={addOnsCardStyle.secondText}>{x.subTitle}</Typography>
                    <Box sx={{ ml: '80px' }}>
                      <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={addOnsCardStyle.borderLine} />
            </>
          );
        })}
      </>
    </Box>
  );
};
