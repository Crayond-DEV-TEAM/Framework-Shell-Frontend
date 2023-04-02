import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { modalAddMessageStyle } from './style';

export interface ModalAddMessageProps {
  className?: string;
  handleChange?: (key: string, value: string) => void;
  groupState?: any;
  sx?: SxProps<Theme>;
}

export const ModalAddMessage = forwardRef((props: ModalAddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, handleChange = () => false, groupState, ...rest } = props;

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
      <Box sx={{ px: 3, py: 1 }}>
        <Box sx={modalAddMessageStyle.inputGroupSx}>
          <Label sx={modalAddMessageStyle.labelSx} htmlFor="username">
            Title
          </Label>
          <Input
            size="small"
            placeholder="username"
            value={groupState?.addTitle}
            id="username"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('addTitle', e.target.value)
            }
            textFieldStyle={modalAddMessageStyle.inputSx}
            // isError={values?.error?.username ? true : false}
            // errorMessage={values?.error?.username ?? ''}
          />
        </Box>
        <Box sx={modalAddMessageStyle.inputGroupSx}>
          <Label sx={modalAddMessageStyle.labelSx} htmlFor="username">
            Descriptionss
          </Label>
          <Input
            size="small"
            placeholder="Add description"
            value={groupState?.addDescription}
            id="username"
            // textFieldStyle={{ height: '112px' }}
            rows={5}
            rowsMax={10}
            textFieldStyle={modalAddMessageStyle.inputSx}
            isMulti={true}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('addDescription', e.target.value)
            }
            // isError={values?.error?.username ? true : false}
            // errorMessage={values?.error?.username ?? ''}
          />
        </Box>
      </Box>
    </Box>
  );
});

ModalAddMessage.displayName = 'ModalAddMessage';
