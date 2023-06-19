import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addOnBackgroundCardStyle } from './style';
import { Label } from '@atoms/label';
import { ButtonGroupDropdown } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';
import { createPlanCardStyle } from '@components/createPlanCard/style';
import { useEffect, useState } from 'react';

interface Limits {
  [key: string]: string;
}

interface LimitValues {
  [key: string]: string;
}
interface ListObject {
  title: string;
  value: string;
  subTitle: string;
}
export interface AddOnBackgroundCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  ListAddons?: ListObject[] | any;
  onChange: (x: any) => void;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked?: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(() => ({
  '.MuiFormControlLabel-label': {
    fontSize: '12px',
  },
}));

export const AddOnBackgroundCard = (props: AddOnBackgroundCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    value = '5',
    subTitle = '',
    countTitle = '',
    ListAddons,
    onChange = (x: any) => false,
    ...rest
  } = props;
  const Money = [{ label: '10' }, { label: '19' }];

  const [limits, setLimits] = useState<Limits>({});
  const [limitValues, setLimitValues] = useState<LimitValues>({});
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const temp_obj: any = {};
    const temp_limits: any = {};
    let temp_ans: any = {};
    const temp_res: any = [];
    ListAddons.map((x: ListObject) => {
      temp_obj[x.title] = x.value;
      temp_limits[x.title] = 0;
      temp_ans = {
        name: x.title,
        price: {
          monthly: 0,
          yearly: 0,
        },
        limit_count: 0,
      };
      temp_res.push(temp_ans);
    });
    setLimits(temp_obj);
    setLimitValues(temp_limits);

    setResults(temp_res);
    onChange(temp_res);
  }, []);

  const handleChange = (event: string, x: string) => {
    const data: any = limits;
    data[x] = event;
    results.map((result: { name: string; price: any; limit_count: number }) => {
      if (result.name === x) {
        result.limit_count = 0;
      }
    });
    setResults(results);
    onChange(results);
    setLimits({ ...limits, [x]: event });
  };

  const handleLimitChange = (event: string, x: string) => {
    const data: any = limitValues;
    data[x] = event;
    results.map((result: { name: string; price: any; limit_count: number }) => {
      if (result.name === x) {
        result.limit_count = parseInt(event);
      }
    });
    setResults(results);
    onChange(results);
    setLimitValues({ ...limitValues, [x]: event });
  };

  const handleMoneyChange = (name: string, value: any, key: string) => {
    results.map((result: { name: string; price: any; limit_count: number }) => {
      if (result.name === key) {
        result.price[name] = parseInt(value);
      }
    });
    setResults(results);
    onChange(results);
  };

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
          const index_key: string = x.title;
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
                    <ButtonGroupDropdown
                      onChange={(value) => {
                        handleMoneyChange('monthly', value.label, index_key);
                      }}
                      permissionList={Money}
                      BtnName={'Monthly'}
                    />
                    <ButtonGroupDropdown
                      onChange={(value) => {
                        handleMoneyChange('yearly', value.label, index_key);
                      }}
                      permissionList={Money}
                      BtnName={'Yearly'}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <CustomCheckboxWithLabels circleCheckbox={true} circleText={'Unlimited'} sx={{ ml: '10px' }} />
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
                    <Typography sx={addOnBackgroundCardStyle.secondText}>{x.subTitle}</Typography> */}
                    <FormControl>
                      <RadioGroup
                        row
                        defaultValue="unlimited"
                        value={limits[index_key]}
                        name="radio-buttons-group"
                        onChange={(e) => handleChange(e.target.value, x.title)}
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
                    {limits[index_key] === 'limited' ? (
                      <>
                        <Input
                          value={limitValues[index_key]}
                          textFieldStyle={{
                            width: '75px',
                            height: '40px',
                            margin: '0px 12px',
                            backgroundColor: 'primary.contrastText',
                          }}
                          onChange={(e) => handleLimitChange(e.target.value, x.title)}
                        />
                        <Typography sx={createPlanCardStyle.secondText}>{x.subTitle}</Typography>
                      </>
                    ) : (
                      <></>
                    )}
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
