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
  id: string;
  // title: string;
  value: string;
  subTitle: string;
  price: any;
  limit_count: any;
}
export interface AddOnBackgroundCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  ListAddons?: ListObject[] | any;
  onChange: (key: any, value: any, innerkey: any) => void;
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
    ListAddons = {},
    onChange = (key: any, value: any, innerkey: any) => false,
    ...rest
  } = props;
  const Money = [{ label: 10 }, { label: 19 }];

  const [limits, setLimits] = useState<Limits>({});
  const [limitValues, setLimitValues] = useState<LimitValues>({});
  const [results, setResults] = useState<any>([]);

  console.log(ListAddons);

  useEffect(() => {
    const temp_limits: any = {};
    const temp_limit_values: any = {};
    // ListAddons.map((x: ListObject) => {
    //   temp_limits[x.id] = x.limit_count > 0 ? 'limited' : 'unlimited';
    //   temp_limit_values[x.id] = x.limit_count || 0;
    // });
    // setLimits(temp_limits);
    // setLimitValues(temp_limit_values);
  }, []);

  const handleChange = (event: string, x: string) => {
    // console.log(event, x);
    // const temp_limits = limits;
    // temp_limits[x] = event;
    // setLimits({ ...temp_limits });
    // onChange(x, event === 'unlimited' ? 0 : 5, 'limit_count', '');

    console.log(event, x);
    onChange(x, event, '');
  };

  const handleLimitChange = (event: string, x: string) => {
    console.log(event, x);
    onChange(x, event, '');
    // console.log(event, x);
    // const temp_limit_values = limitValues;
    // temp_limit_values[x] = event;
    // setLimitValues({ ...temp_limit_values });
    // onChange(x, event, 'limit_count', '');
  };

  const handleMoneyChange = (title: string, value: any, key: string) => {
    console.log(title, value, key);
    onChange(key, value, title);
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
      {/* <>
        {ListAddons.map((x: any, index: any) => {
          console.log(x.subTitle, x.price);
          const index_key: string = x.id;
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
                        handleMoneyChange('monthly', value.label, x.id);
                      }}
                      value={x.price.monthly}
                      permissionList={Money}
                      BtnName={'Monthly'}
                    />
                    <ButtonGroupDropdown
                      onChange={(value) => {
                        handleMoneyChange('yearly', value.label, x.id);
                      }}
                      value={x.price.yearly}
                      permissionList={Money}
                      BtnName={'Yearly'}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl>
                      <RadioGroup
                        row
                        defaultValue="unlimited"
                        value={x.value}
                        name="radio-buttons-group"
                        onChange={(e) => handleChange(e.target.value, x.id)}
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
                          value={x.limit_count.toString()}
                          textFieldStyle={{
                            width: '75px',
                            height: '40px',
                            margin: '0px 12px',
                            backgroundColor: 'primary.contrastText',
                          }}
                          onChange={(e) => handleLimitChange(e.target.value, x.id)}
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
      </> */}

      <Box sx={addOnBackgroundCardStyle.rootSx}>
        <Box>
          <Typography sx={addOnBackgroundCardStyle.firstTextdark}>{ListAddons.name}</Typography>
          <Label sx={addOnBackgroundCardStyle.labelSx} htmlFor="addTitle" isRequired>
            Set price
          </Label>
        </Box>

        <Box sx={addOnBackgroundCardStyle.align}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ButtonGroupDropdown
              onChange={(value) => {
                handleMoneyChange('monthly', value.label, ListAddons.id);
              }}
              value={ListAddons.price.monthly}
              permissionList={Money}
              BtnName={'Monthly'}
            />
            <ButtonGroupDropdown
              onChange={(value) => {
                handleMoneyChange('yearly', value.label, ListAddons.id);
              }}
              value={ListAddons.price.yearly}
              permissionList={Money}
              BtnName={'Yearly'}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl>
              <RadioGroup
                row
                defaultValue="unlimited"
                value={ListAddons.value}
                name="radio-buttons-group"
                onChange={(e) => handleChange(e.target.value, ListAddons.id)}
              >
                <StyledFormControlLabel
                  // sx={createPlanCardStyle.typographyTxt}
                  value="unlimited"
                  control={<Radio icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} size="small" />}
                  label="Unlimited"
                />
                <StyledFormControlLabel
                  // sx={createPlanCardStyle.typographyTxt}
                  value="limited"
                  control={<Radio icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} size="small" />}
                  label="Limited"
                />
              </RadioGroup>
            </FormControl>
            {ListAddons.value === 'limited' ? (
              <>
                <Input
                  value={ListAddons.limit_count.toString()}
                  textFieldStyle={{
                    width: '75px',
                    height: '40px',
                    margin: '0px 12px',
                    backgroundColor: 'primary.contrastText',
                  }}
                  onChange={(e) => handleLimitChange(e.target.value, ListAddons.id)}
                />
                <Typography sx={createPlanCardStyle.secondText}>{ListAddons.name}</Typography>
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
    </Box>
  );
};
