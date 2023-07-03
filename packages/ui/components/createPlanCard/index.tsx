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
import { useEffect, useState } from 'react';

export interface CreatePlanCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: any;
  countTitle?: string;
  anAddOns?: boolean;
  onChange: (inner_id: string, value: any) => void;
  onDelete: (feature_id: string, feature_mapping_id: string) => void;
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
    subTitle = [],
    countTitle = '',
    anAddOns = false,
    onChange = (inner_id: string, value: any) => false,
    onDelete = (feature_id: string, feature_mapping_id: string) => false,
    ...rest
  } = props;
  const Money = [{ label: '10' }, { label: '19' }];

  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const user_data: any = [];
    subTitle.map((x: any) => {
      user_data.push({
        id: x.id,
        name: x.name,
        limit_count: x.limit_count || 0,
      });
    });
    setUsers(user_data);
  }, []);

  const handleChange = (event: any, id: string, isUser = false) => {
    const user_data: any = users;
    user_data.map((user: any) => {
      if (user.id === id) {
        user.limit_count = 5;
      }
    });
    setUsers(user_data);
    onChange(id, event.target.value);
    // isUser ? setLimitedValue(event.target.value) : setUsers(event.target.value);
    // console.log(isUser, event.target.value, limitedValue);
    // onChange(id, event.target.value === 'limited' || event.target.value === 'unlimited' ? 0 : event.target.value);
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
        <Typography sx={createPlanCardStyle.title}>{title}</Typography>
      </Box>
      {subTitle.map((x: any, index: any) => {
        const count = subTitle?.filter((user: any) => user.id === x.id)?.[0]?.limit_count;
        return (
          <div key={index}>
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
                  <Typography sx={createPlanCardStyle.secondText}>{x.name}</Typography>
                  <Box sx={{ ml: '80px' }}>
                    <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={createPlanCardStyle.align}>
                <Typography sx={createPlanCardStyle.firstText}>{x.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl>
                    <RadioGroup
                      row
                      defaultValue="female"
                      // value={count > 0 ? 'limited' : 'unlimited'}
                      value={x.user_value}
                      name="radio-buttons-group"
                      onChange={(e) => handleChange(e, x.id, false)}
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
                  <Box sx={{ visibility: x.user_value === 'limited' ? 'visible' : 'hidden', display: 'contents' }}>
                    <Input
                      value={count}
                      type={'number'}
                      onChange={(e) => handleChange(e, x.id, true)}
                      textFieldStyle={{
                        width: '75px',
                        height: '40px',
                        margin: '0px 12px',
                        backgroundColor: 'primary.contrastText',
                      }}
                    />
                    <Typography sx={createPlanCardStyle.secondText}>{x.name}</Typography>
                  </Box>
                  <Box sx={{ ml: '80px' }}>
                    <CloseRedIcon
                      rootStyle={{ width: '17px', height: '17px', cursor: 'pointer' }}
                      onClick={() => {
                        onDelete(x.id, x.plan_feature_mapping_id);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {index !== subTitle.length - 1 && <Box sx={createPlanCardStyle.borderLine} />}
          </div>
        );
      })}
    </Box>
  );
};
