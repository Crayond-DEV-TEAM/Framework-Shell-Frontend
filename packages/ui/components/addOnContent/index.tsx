import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addOnContentStyle } from './style';
import { CustomDropdown } from '@atoms/customDropdown';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
export interface AddOnContentProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AddOnContent = (props: AddOnContentProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  return (
    <Box
      sx={[
        {
          ...addOnContentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box>
        <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
          Add-on name
        </Label>
        <Input
          size="small"
          placeholder=" Add-on name"
          required
          // value={addOnContentStyle?.title}
          textFieldStyle={addOnContentStyle.inputSx}
          id="title"
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          //   handleAddEditStateChange('title', e.target.value)
          // }
          // isError={addEditMessageState?.error?.title ? true : false}
          // errorMessage={addEditMessageState?.error?.title ?? ''}
        />
        <Box sx={{ m: '16px' }} />
        <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
          Description
        </Label>
        <Input
          required
          // value={addOnContentStyle?.title}
          textFieldStyle={addOnContentStyle.inputSx}
          id="description"
          rows={3}
          rowsMax={6}
          isMulti={true}
          placeholder="Description"
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          //   handleAddEditStateChange('title', e.target.value)
          // }
          // isError={addEditMessageState?.error?.title ? true : false}
          // errorMessage={addEditMessageState?.error?.title ?? ''}
        />
        <Box sx={{ m: '16px' }} />
        <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
          Choose feature group
        </Label>

        <CutstomizedAutocomplete placeholder={'Silver'} permissionList={options} />
        <Box sx={{ m: '16px' }} />
        <Label sx={addOnContentStyle.labelSx} htmlFor="addTitle" isRequired>
          Choose feature
        </Label>

        <CutstomizedAutocomplete placeholder={'Silver'} permissionList={options} />
      </Box>
    </Box>
  );
};
