import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addOnBackgroundCardStyle } from './style';
import { Label } from '@atoms/label';
import { ButtonGroupDropdown } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';

export interface AddOnBackgroundCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  ListAddons?: any;
}

export const AddOnBackgroundCard = (props: AddOnBackgroundCardProps): JSX.Element => {
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
      //     ...addOnBackgroundCardStyle.rootSx,
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
              <Box key={index} sx={addOnBackgroundCardStyle.rootSx}>
                <Box>
                  <Typography sx={addOnBackgroundCardStyle.firstTextdark}>{x.subTitle}</Typography>
                  <Label sx={addOnBackgroundCardStyle.labelSx} htmlFor="addTitle" isRequired>
                    Set price
                  </Label>
                </Box>

                <Box sx={addOnBackgroundCardStyle.align}>
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
                    <Typography sx={addOnBackgroundCardStyle.secondText}>{x.subTitle}</Typography>
                    <Box sx={{ ml: '80px' }}>
                      <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={addOnBackgroundCardStyle.borderLine} />
            </>
          );
        })}
      </>
    </Box>
  );
};
