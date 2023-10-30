import SearchIMG from '@core/ui/assets/svgIcons/searchIcon';
import { Box, SxProps, TextField, Theme, Typography } from '@mui/material';
// import { searchTextField_Style } from "./style";
import { searchTextField_Style } from './style';

export interface SearchTextFieldProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: any;
  value?: any;
  placeholder?: string;
  color?: boolean;
  isReadonly?: boolean;
  label?: string;
}

export function SearchTextField(props: SearchTextFieldProps): JSX.Element {
  const {
    handleChange = () => false,
    value = '',
    placeholder = '',
    color = false,
    isReadonly = false,
    label = '',
  } = props;

  const getLabel = (label = '') => {
    return (
      <Typography sx={searchTextField_Style.Label} noWrap>
        {label}
      </Typography>
    );
  };

  return (
    <Box sx={searchTextField_Style.root}>
      <Box>
        {getLabel(label)}
        <Box sx={searchTextField_Style.search}>
          <TextField
            autoComplete="off"
            InputProps={{
              startAdornment: <SearchIMG color="#a4b2c1" style={{ margin: 8, marginLeft: '3px', color: '#999999' }} />,
            }}
            placeholder={placeholder ? placeholder : 'Search'}
            onChange={(e) => handleChange(e.target.value)}
            value={value}
            disabled={isReadonly}
            size={'small'}
            fullWidth
            sx={searchTextField_Style.textfield}
          />
        </Box>
      </Box>
    </Box>
  );
}
