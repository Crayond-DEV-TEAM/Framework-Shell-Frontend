import { MenuItem, Select, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { RiArrowDownSFill } from 'react-icons/ri';

import { dropDownStyle } from './style';
import { SelectDown } from '@atoms/icons';

export interface DropDownProps {
  className?: string;
  sx?: SxProps<Theme>;
  rootStyle?: object;
  value?: string | number | undefined;
  optionListStyle?: object;
  selectOption?: Array<any>;
  isError?: any;
  placeholder?: string;
  onchange?: any;
  header?: string;
  onClick?: any;
  onSelect?: any;
  isrequired?: boolean;
  // IconComponent: NodeJS;
}

export const DropDown = forwardRef((props: DropDownProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    rootStyle = {},
    value = '',
    optionListStyle = {},
    selectOption = [],
    isError,
    placeholder = '',
    onchange = () => false,
    onClick = () => false,
    onSelect = () => false,
    isrequired = false,
    header = '',
    ...rest
  } = props;

  const getLabel = (props: any) => {
    return (
      <Typography sx={{ ...dropDownStyle.Label }} noWrap>
        {props.header}
        {props.isrequired && (
          <Typography variant="caption" sx={{ ...dropDownStyle.required }}>
            *
          </Typography>
        )}
      </Typography>
    );
  };

  return (
    <Box>
      {getLabel(props)}
      <Select
        className={`${className}`}
        {...rest}
        sx={{ ...dropDownStyle.rootSx, ...rootStyle }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        fullWidth
        size="small"
        displayEmpty
        variant="outlined"
        error={isError}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={{
          sx: { ...dropDownStyle.optionListSx, ...optionListStyle },
        }}
        IconComponent={SelectDown}
      >
        {selectOption?.map((option: any, index: number) => (
          <MenuItem
            onClick={() => {
              onSelect(option, index);
            }}
            key={option?.value}
            value={option?.value}
          >
            {option?.label}
          </MenuItem>
        ))}
      </Select>
      {/* Field required Message */}
      {/* {helperText?.length > 0 && (
        <Typography sx={{ mt: 0.5 }} variant="caption" color="error">
          {helperText}
        </Typography>
      )} */}
    </Box>
  );
});

DropDown.displayName = 'DropDown';
