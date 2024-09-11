import { Autocomplete, Box, Checkbox, ListItemText, SxProps, TextField, Typography, Chip } from '@mui/material';
import { customDropdownStyle } from './style';
import { Theme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
export interface CustomDropdownProps {
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
  multiple?: boolean;
}

export const CustomDropdown = (props: CustomDropdownProps): JSX.Element => {
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
    multiple = true,
    ...rest
  } = props;
  
  return (
    <Box
      sx={[
        {
          ...customDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Autocomplete
        value={value}
        // defaultValue={value}
        // errorMessage={formErrors.permission}
        multiple={multiple}
        limitTags={2}
        popupIcon={<KeyboardArrowDownIcon />}
        options={permissionList}
        // options={name}
        disableCloseOnSelect
        getOptionLabel={(options: any) => options?.name}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              // backgroundColor: {value?.map((val: any) => val?.id)?.includes(option.id) && '#E2F0E6'},
              backgroundColor: multiple ? (value?.map((val: any) => val?.id)?.includes(option.id) ? "#E2F0E6" : "auto") : (value?.id === option.id) ? "#E2F0E6" : "auto",
            }}
          >
            <span
              style={{
                // fontWeight: value?.map((val: any) => val?.id)?.includes(option.id) && 600,
                fontWeight: multiple ? (value?.map((val: any) => val?.id)?.includes(option.id) ? 600 : "auto") : (value?.id === option.id) ? 600 : "auto",
              }}
            >
              {' '}
              {option?.name}
            </span>
            <CheckBox
              // defaultChecked={true}
              style={{ marginRight: 8 }}
              checked={multiple ? value?.map((val: any) => val?.id)?.includes(option.id) : (value?.id === option.id)}
              value={option?.name}
              onChange={(e) => {
                const newValue = e.target.checked ? [option] : value.filter((item: any) => item.id !== option.id);
                onChange && onChange(newValue);
              }}
            />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '40px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { height: '40px', borderRadius: '8px' },
            }}
            helperText={isError ? errorMessage : null}
            error={isError}
          />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: any, index: number) => <Chip key={option?.id} label={option?.name} />)
        }
        onChange={(option, value) => {
          onChange && onChange(Object.values(value.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})));
        }}
        sx={{
          '& .MuiChip-root': { height: '28px', borderRadius: '8px', marginLeft: '4px', marginTop: '-7px' },
          '& .MuiAutocomplete-input': {
            marginTop: '-8px',
          },
        }}
      />
    </Box>
  );
};
