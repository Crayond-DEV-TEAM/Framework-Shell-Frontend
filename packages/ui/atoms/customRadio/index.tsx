import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import type { SxProps, Theme } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { customRadioStyle } from './style';

export interface CustomRadioProps {
  className?: string;
  sx?: SxProps<Theme>;
  options: any;
  handleChange: (value: any) => void;
}

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
        {props.options.map((x: any, index: any) => {
          return <FormControlLabel key={index} value={x.value} control={<BpRadio name={x.value} />} label={''} />;
        })}
      </RadioGroup>
    </FormControl>
  );
};
