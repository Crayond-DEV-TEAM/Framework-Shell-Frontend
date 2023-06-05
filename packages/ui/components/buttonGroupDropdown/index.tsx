import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { Box, Typography, ButtonGroup } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { buttonGroupDropdownStyle } from './style';
import { Button } from '@atoms/button';

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
            height: '40px',
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'flex-end',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            backgroundColor: 'transparent',
            color: '#000000',
            border: '1px solid #d2c1c1',
            boxShadow: 'none !important',
            '&.MuiButtonGroup-root.MuiButtonGroup-grouped:hover': {
              backgroundColor: 'transparent',
            },
          }}
          // onclick={saveLanguage}
          // loading={saving}
        >
          Save
        </Button>
        <Autocomplete
          defaultValue={value}
          // errorMessage={formErrors.permission}
          popupIcon={<AttachMoneyIcon />}
          options={permissionList}
          // options={name}
          // disableCloseOnSelect
          getOptionLabel={(options: any) => options?.label}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: '75px',
                height: '40px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  ml: '-1px',
                },
              }}
            />
          )}
          onChange={(option, value) => {
            onChange && onChange(value);
          }}
          sx={{
            // '& .MuiChip-root': { height: '28px', borderRadius: '8px', marginLeft: '4px', marginTop: '-7px' },
            '& .MuiAutocomplete-input': {
              marginTop: '-4px',
            },
          }}
        />
      </ButtonGroup>
    </Box>
  );
};
