import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { Box, Typography, ButtonGroup } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { buttonGroupDropdownStyle } from './style';
import { Button } from '@atoms/button';
import { Label } from '@atoms/label';

export interface ButtonGroupDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  key?: string;
  value?: any;
  placeholder?: string;
  loadOptions?: () => Promise<any[]>;
  onChange?: (value: any) => void;
  options?: any[];
  loading?: boolean;
  isReadOnly?: boolean;
  isMulti?: boolean;
  debounceTimeout?: number;
  reduceOptions?: any;
  isClearable?: boolean;
  styles?: any;
  isPaginate?: boolean;
  label?: string;
  noBorder?: boolean;
  noSearch?: boolean;
  prefix?: boolean;
  labelColor?: string | null;
  labelSize?: string | null;
  fontFamily?: string | null;
  selectHeight?: string;
  padding?: string;
  isDeletedValue?: boolean;
  errorMessage?: any;
  permissionList?: any;
  isError?: boolean;
  deletedValue?: (value: any, updateValue: any) => void | undefined;
  BtnName?: string;
}

export const ButtonGroupDropdown = (props: ButtonGroupDropdownProps): JSX.Element => {
  const {
    className = '',
    key,
    value,
    placeholder,
    loadOptions,
    permissionList,
    onChange,
    options,
    loading,
    isReadOnly,
    isMulti,
    debounceTimeout,
    reduceOptions,
    isClearable = false,
    styles = {},
    isPaginate = false,
    label = '',
    noBorder = false,
    noSearch = false,
    prefix = false,
    labelColor = null,
    labelSize = null,
    fontFamily = null,
    selectHeight = '',
    padding,
    isDeletedValue,
    deletedValue,
    errorMessage,
    isError = false,
    sx = {},
    BtnName = 'Monthly',
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...buttonGroupDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <ButtonGroup aria-label="device">
        <Button
          buttonStyle={{
            width: '70px',
            height: '35px',
            textTransform: 'capitalize',
            // display: 'flex',
            // justifyContent: 'flex-end',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            backgroundColor: 'transparent',
            color: '#000000',
            border: '1px solid #c2c2c2',
            boxShadow: 'none !important',
            '&.MuiButtonBase-root.MuiButton-root.MuiLoadingButton-root:hover': {
              backgroundColor: 'transparent',
            },
            fontSize: '14px',
            fontWeight: 600,
          }}
          // onclick={saveLanguage}
          // loading={saving}
        >
          {BtnName}
        </Button>

        <TextField
          // {...props}
          defaultValue={value}
          value={value}
          InputProps={{
            endAdornment: <AttachMoneyIcon fontSize="small" />,
          }}
          type={'number'}
          onChange={onChange}
          error={isError}
          sx={{
            width: '75px',
            height: '30px',
            paddingX: '1px',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              height: '35px',
              borderRadius: '8px',
              fontSize: '14px',
              // fontWeight: 600,
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              ml: '-1px',
              mb: '10px',
              p: '3.5px 4px 4.5px 6px',
            },
            '& .MuiSvgIcon-root': {
              width: '25px',
              height: '20px',
              color: '#000000',
            },
          }}
        />
      </ButtonGroup>
      <Label sx={{ color: 'red', paddingTop: 1 }}>{isError ? errorMessage : ' '}</Label>
    </Box>
  );
};
