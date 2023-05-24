import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { buttonGroupSelectStyle } from './style';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export interface ButtonGroupSelectProps {
  className?: string;
  sx?: SxProps<Theme>;
}
export interface Option {
  group: string;
  value: string;
}

const options: Option[] = [
  { group: 'Group 1', value: 'Option 1' },
  { group: 'Group 1', value: 'Option 2' },
  { group: 'Group 2', value: 'Option 3' },
  { group: 'Group 2', value: 'Option 4' },
];

export const ButtonGroupSelect = (props: ButtonGroupSelectProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const renderOptions = () => {
    let currentGroup: string | null = null;

    return options.map((option, index) => {
      if (option.group !== currentGroup) {
        currentGroup = option.group;
        return (
          <MenuItem key={`group-${index}`} disabled>
            {option.group}
          </MenuItem>
        );
      }

      return (
        <MenuItem key={`option-${index}`} value={option.value}>
          {option.value}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl>
      <InputLabel>Options</InputLabel>
      <Select>{renderOptions()}</Select>
    </FormControl>
  );
};
