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
  isLast?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  value?: any;
  subTitle?: string;
  countTitle?: string;
  ListAddons?: ListObject[] | any;
  onChange: (key: any, value: any, innerkey: any) => void;
  handleDelete: () => void;
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
    isLast = false,
    onChange = (key: any, value: any, innerkey: any) => false,
    handleDelete = () => false,
    ...rest
  } = props;
  const Money = [
    { label: 10, value: 10 },
    { label: 19, value: 19 },
  ];

  const [limits, setLimits] = useState<Limits>({});
  const [limitValues, setLimitValues] = useState<LimitValues>({});
  const [results, setResults] = useState<any>([]);

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
      <Box sx={addOnBackgroundCardStyle.rootSx}>
        <Box>
          <Typography sx={addOnBackgroundCardStyle.firstTextdark}>{ListAddons.name}</Typography>
          <Label sx={addOnBackgroundCardStyle.labelSx} htmlFor="addTitle">
            Set price
          </Label>
        </Box>

        <Box sx={addOnBackgroundCardStyle.align}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ButtonGroupDropdown
              onChange={(e) => {
                handleMoneyChange('monthly', e.target.value, ListAddons.id);
              }}
              value={ListAddons.price.monthly}
              permissionList={Money}
              BtnName={'Monthly'}
            />
            <ButtonGroupDropdown
              onChange={(e) => {
                handleMoneyChange('yearly', e.target.value, ListAddons.id);
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
            <Box sx={{ visibility: ListAddons.value === 'limited' ? 'visible' : 'hidden', display: 'contents' }}>
              <Input
                value={ListAddons.limit_count}
                type={'number'}
                textFieldStyle={{
                  width: '75px',
                  height: '40px',
                  margin: '0px 12px',
                  backgroundColor: 'primary.contrastText',
                }}
                onChange={(e) => handleLimitChange(e.target.value, ListAddons.id)}
              />
              <Typography sx={createPlanCardStyle.secondText}>{ListAddons.name}</Typography>
            </Box>
            <Box sx={{ ml: '80px' }}>
              <CloseRedIcon onClick={handleDelete} rootStyle={{ width: '17px', height: '17px', cursor: 'pointer' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      {isLast && <Box sx={addOnBackgroundCardStyle.borderLine} />}
    </Box>
  );
};
