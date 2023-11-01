import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { userProfileFormStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface UserProfileFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  createEditUser?: any;
  handlechange?: (key: string, value: string | number) => void;
}

export const UserProfileForm = (props: UserProfileFormProps): JSX.Element => {
  const { className = '', sx = {}, handlechange = () => false, createEditUser, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...userProfileFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={userProfileFormStyle.inputGroupSx}>
        <Label sx={userProfileFormStyle.labelSx} htmlFor="addTitle" isRequired>
          User Name
        </Label>
        <Input
          size="small"
          placeholder="User Name"
          required
          value={createEditUser?.name}
          textFieldStyle={userProfileFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('name', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={userProfileFormStyle.inputGroupSx}>
        <Label sx={userProfileFormStyle.labelSx} htmlFor="addTitle" isRequired>
          EmailId
        </Label>
        <Input
          size="small"
          placeholder="Email"
          required
          value={createEditUser?.email}
          textFieldStyle={userProfileFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('email', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={userProfileFormStyle.inputGroupSx}>
        <Label sx={userProfileFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Designation
        </Label>
        <Input
          size="small"
          placeholder="Designation"
          required
          value={createEditUser?.designation}
          textFieldStyle={userProfileFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('designation', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
    </Box>
  );
};
