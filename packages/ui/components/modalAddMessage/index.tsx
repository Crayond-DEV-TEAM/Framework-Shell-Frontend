import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { modalAddMessageStyle } from './style';

export interface ModalAddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const ModalAddMessage = forwardRef((props: ModalAddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...modalAddMessageStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={modalAddMessageStyle.inputGroupSx}>
        <Label sx={modalAddMessageStyle.labelSx} htmlFor="username">
          Title
        </Label>
        <Input
          size="small"
          placeholder="username"
          value="Sign In"
          id="username"
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          //   handleChange('username', e.target.value)
          // }
          // isError={values?.error?.username ? true : false}
          // errorMessage={values?.error?.username ?? ''}
        />
      </Box>
      <Box sx={{ m: 2 }} />
      <Box sx={modalAddMessageStyle.inputGroupSx}>
        <Label sx={modalAddMessageStyle.labelSx} htmlFor="username">
          Description
        </Label>
        <Input
          size="small"
          placeholder="Add description"
          //value="Sign In"
          //id="username"
          textFieldStyle={{ height: '112px' }}
          rowMax={5}
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          //   handleChange('username', e.target.value)
          // }
          // isError={values?.error?.username ? true : false}
          // errorMessage={values?.error?.username ?? ''}
        />
      </Box>
      <Box sx={{ p: 4 }} />
    </Box>
  );
});

ModalAddMessage.displayName = 'ModalAddMessage';
