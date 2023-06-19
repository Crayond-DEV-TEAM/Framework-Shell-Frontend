import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { customCheckboxWithLabelsStyle } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface CustomCheckboxWithLabelsProps {
  className?: string;
  sx?: SxProps<Theme>;
  label?: string;
  squareCheckbox?: boolean;
  circleCheckbox?: boolean;
  squareText?: string;
  circleText?: string;
  handleChanges?: (value: any) => void;
}

export const CustomCheckboxWithLabels = (props: CustomCheckboxWithLabelsProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    squareText = 'Make this a recommended plan',
    circleText = 'Make this a recommended plan',
    squareCheckbox = false,
    circleCheckbox = false,
    handleChanges = () => false,
    ...rest
  } = props;

  return (
    <Box
      // sx={[
      //   {
      //     ...customCheckboxWithLabelsStyle.rootSx,
      //   },
      //   ...(Array.isArray(sx) ? sx : [sx]),
      // ]}
      className={`${className}`}
      {...rest}
    >
      {squareCheckbox && (
        <Box sx={customCheckboxWithLabelsStyle.rootSx}>
          <Checkbox
            onChange={(e) => handleChanges(e.target.checked)}
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { width: '17px', height: '17px' } }}
          />
          <Typography sx={customCheckboxWithLabelsStyle.typographyTxt}>{squareText}</Typography>
        </Box>
      )}
      {circleCheckbox && (
        <Box sx={customCheckboxWithLabelsStyle.rootSx}>
          <Checkbox
            defaultChecked
            onChange={(e) => handleChanges(e.target.checked)}
            sx={{ '& .MuiSvgIcon-root': { width: '17px', height: '17px' } }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
          <Typography sx={customCheckboxWithLabelsStyle.typographyTxt}>{circleText}</Typography>
        </Box>
      )}
    </Box>
  );
};
