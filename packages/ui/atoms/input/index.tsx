import { InputAdornment, StandardTextFieldProps, SxProps, Theme } from '@mui/material';
import { TextField, Typography } from '@mui/material';

import { inputStyle } from './style';

export type InputProps = StandardTextFieldProps & {
  className?: string;
  sx?: SxProps<Theme>;
  helperText?: string;
  errorMessage?: string;
  isReadOnly?: boolean;
  isError?: boolean;
  isMulti?: boolean;
  rowMax?: number;
  rowMin?: number;
  value?: string;
  endAdornment?: any;
  startAdornment?: string;
  textFieldStyle?: object;
  variant?: 'filled' | 'outlined' | 'standard';
};

export function Input(props: InputProps): JSX.Element {
  const {
    value = '',
    fullWidth = true,
    isReadOnly = false,
    helperText = '',
    isError = false,
    isMulti = false,
    rowMax = 5,
    rowMin = 5,
    placeholder = '',
    size = 'small',
    onChange = () => false,
    endAdornment,
    startAdornment,
    type = '',
    errorMessage = '',
    variant = 'outlined',
    textFieldStyle = {},
    className = '',
    ...rest
  } = props;

  console.log(props);
  return (
    <>
      <TextField
        type={type}
        size={size}
        sx={{ ...inputStyle.textFieldSx, ...textFieldStyle }}
        variant={variant}
        value={value}
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={isReadOnly}
        multiline={isMulti}
        maxRows={rowMax}
        minRows={rowMin}
        onChange={onChange}
        helperText={helperText}
        error={isError}
        className={`${className}`}
        InputProps={{
          startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
          endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
        }}
        {...rest}
      />
      {isError && (
        <Typography sx={{ mt: 0.5 }} variant="caption" color="error">
          {errorMessage}
        </Typography>
      )}
    </>
  );
}
