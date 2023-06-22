import * as React from 'react';
import type { FormControlLabelProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import type { SxProps, Theme } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { customRadioStyle } from './style';

export interface CustomRadioProps {
  className?: string;
  sx?: SxProps<Theme>;
  options: any;
  isRadio?: boolean;
  handleChange: (value: any) => void;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked?: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    display: 'block',
    width: '100%',
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    marginLeft: 0,
    borderBottom: '1px solid #EAEAEA',
    '.MuiFormControlLabel-label': {
      fontSize: '12px',
    },
  }),
);

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<Typography sx={customRadioStyle.selected}>{props.name}</Typography>}
      icon={<Typography sx={customRadioStyle.unselected}>{props.name}</Typography>}
      {...props}
    />
  );
}

function CustomRadioButton(props: any) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <label>{props.name}</label>
      {/* <input type="radio" checked={props.checked} /> */}

      <Radio
        disableRipple
        color="default"
        sx={{ padding: 0 }}
        checkedIcon={<CheckCircleIcon color="primary" fontSize="small" />}
        icon={<RadioButtonUncheckedRoundedIcon fontSize="small" />}
        {...props}
      />
    </Box>
  );
}

export const CustomizedRadios = (props: CustomRadioProps): JSX.Element => {
  const { handleChange } = props;
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };
  return (
    <FormControl>
      <RadioGroup
        onChange={handleRadioChange}
        sx={customRadioStyle.noPadding}
        row
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        {props.options?.map((x: any, index: any) => {
          return !props?.isRadio ? (
            <FormControlLabel key={index} value={x.value} control={<BpRadio name={x.key} />} label={''} />
          ) : (
            <StyledFormControlLabel
              key={index}
              value={x.value}
              control={<CustomRadioButton name={x.key} />}
              label={''}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
