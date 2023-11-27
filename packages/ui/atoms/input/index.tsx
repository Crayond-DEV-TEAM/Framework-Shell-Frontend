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
  rowsMax?: any;
  rows?: number;
  rowMax?: number;
  rowMin?: number;
  value?: string;
  endAdornment?: any;
  startAdornment?: any;
  header?: string;
  onChange?:
    | (React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> &
        ((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | undefined))
    | undefined;
  textFieldStyle?: object | any;
  variant?: 'filled' | 'outlined' | 'standard';
  height?: string; // Add height prop
  width?: string;
};

export function Input(props: InputProps): JSX.Element {
  const {
    value = '',
    fullWidth = true,
    isReadOnly = false,
    helperText = '',
    isError = false,
    isMulti = false,
    rowsMax = 5,
    rowMax = 5,
    rowMin = 5,
    placeholder = '',
    size = 'small',
    onChange = () => false,
    rows,
    endAdornment,
    startAdornment,
    type = '',
    errorMessage = '',
    variant = 'outlined',
    textFieldStyle = {},
    className = '',
    header = '',
    height,
    width,
    ...rest
  } = props;
  const dynamicStyles: SxProps<Theme> = {
    height: height || undefined,
  };

  return (
    <>
      <TextField
        type={type}
        size={size}
        sx={{ ...inputStyle.textFieldSx, ...textFieldStyle, ...dynamicStyles }}
        variant={variant}
        value={value}
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={isReadOnly}
        multiline={isMulti}
        maxRows={rowsMax}
        minRows={rowMin}
        onChange={onChange}
        helperText={errorMessage}
        error={isError}
        rows={rows}
        className={`${className}`}
        InputProps={{
          startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
          endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
        }}
        {...rest}
        // height={'10px'}
      />
    </>
  );
}
