import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import type { SxProps, Theme } from '@mui/material';

import { atomButton_style } from './style';

export interface ButtonProps extends LoadingButtonProps {
  children?: string;
  sx?: SxProps<Theme>;
  className?: string;
  diable?: string;
  startIcon?: any;
  endIcon?: any;
  fullWidth?: boolean;
  buttonStyle?: any;
  onClick?: () => void;
}

function Button(props: ButtonProps): JSX.Element {
  const {
    children = '',
    variant = 'contained',
    disabled = false,
    startIcon = '',
    endIcon = '',
    loading = false,
    size = 'medium',
    fullWidth = true,
    buttonStyle = {},
    onClick = () => false,
    className = '',
    ...rest
  } = props;

  return (
    <LoadingButton
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      size={size}
      sx={{ ...atomButton_style.buttonSx, ...buttonStyle }}
      fullWidth={fullWidth}
      onClick={onClick}
      className={`${className}`}
      loading={loading}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
}

export { Button };
