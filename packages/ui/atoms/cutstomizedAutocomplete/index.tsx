import { Autocomplete, Box, Checkbox, ListItemText, SxProps, TextField, Typography, Chip } from '@mui/material';
import { Done } from '@mui/icons-material';
import { Theme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
import { cutstomizedAutocompleteStyle } from './style';

export interface CutstomizedAutocompleteProps {
  className?: string;
  sx?: SxProps<Theme>;
  key?: string;
  value?: any;
  placeholder: string;
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

export const CutstomizedAutocomplete = (props: CutstomizedAutocompleteProps): JSX.Element => {
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
          ...cutstomizedAutocompleteStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Autocomplete
        defaultValue={value}
        // errorMessage={formErrors.permission}
        popupIcon={<KeyboardArrowDownIcon />}
        options={permissionList}
        // options={name}
        // disableCloseOnSelect
        getOptionLabel={(options: any) => options?.label}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '40px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { height: '40px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 },
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
    </Box>
  );
};
