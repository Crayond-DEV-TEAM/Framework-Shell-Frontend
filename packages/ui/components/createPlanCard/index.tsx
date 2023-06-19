import type { FormControlLabelProps, SxProps, Theme } from '@mui/material';
import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createPlanCardStyle } from './style';
import { CloseRedIcon } from '@atoms/icons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import { Input } from '@atoms/input';
import { ButtonGroupDropdown } from '..';
import { Label } from '@atoms/label';
import { useState } from 'react';

export interface CreatePlanCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  anAddOns?: boolean;
  onChange: (value: any) => void;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked?: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    '.MuiFormControlLabel-label': {
      fontSize: '12px',
    },
  }),
);

export const CreatePlanCard = (props: CreatePlanCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    value = 0,
    subTitle = '',
    countTitle = '',
    anAddOns = false,
    onChange = () => false,
    ...rest
  } = props;
  const Money = [{ label: '10' }, { label: '19' }];

  const [users, setUsers] = useState('unlimited');
  const [limitedValue, setLimitedValue] = useState(value);

  const handleChange = (event: any, isUser = false) => {
    // console.log(event.target.value, isUser);
    isUser ? setLimitedValue(event.target.value) : setUsers(event.target.value);
    // console.log(isUser, event.target.value, limitedValue);
    onChange([
      {
        id: isUser ? 'limited' : 'unlimited',
        limit_count: isUser ? event.target.value : 0,
      },
    ]);
  };

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
              {/* <CustomCheckboxWithLabels
                label={'Unlimited'}
                value={value.length > 0 ? false : true}
                circleCheckbox={true}
                circleText={'Unlimited'}
              />
              <CustomCheckboxWithLabels
                label={'Limited'}
                value={value.length > 0 ? true : false}
                circleCheckbox={true}
                circleText={'Limited'}
              /> */}

              <FormControl>
                <RadioGroup
                  row
                  defaultValue="female"
                  value={users}
                  name="radio-buttons-group"
                  onChange={(e) => handleChange(e, false)}
                >
                  <StyledFormControlLabel
                    // sx={createPlanCardStyle.typographyTxt}
                    value="unlimited"
                    control={
                      <Radio icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} size="small" />
                    }
                    label="Unlimited"
                  />
                  <StyledFormControlLabel
                    // sx={createPlanCardStyle.typographyTxt}
                    value="limited"
                    control={
                      <Radio icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} size="small" />
                    }
                    label="Limited"
                  />
                </RadioGroup>
              </FormControl>
              {users === 'limited' ? (
                <>
                  <Input
                    value={limitedValue}
                    onChange={(e) => handleChange(e, true)}
                    textFieldStyle={{
                      width: '75px',
                      height: '40px',
                      margin: '0px 12px',
                      backgroundColor: 'primary.contrastText',
                    }}
                  />
                  <Typography sx={createPlanCardStyle.secondText}>{subTitle}</Typography>
                </>
              ) : (
                <></>
              )}
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
