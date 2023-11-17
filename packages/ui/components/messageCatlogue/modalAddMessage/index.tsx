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
      <Box sx={{ p: 3 }}>
        <Box sx={modalAddMessageStyle.inputGroupSx}>
          <Label sx={modalAddMessageStyle.labelSx} htmlFor="addTitle" isRequired>
            Title
          </Label>
          <Input
            size="small"
            placeholder=" Add Title"
            value={groupState?.title}
            id="title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('title', e?.target?.value)
            }
            textFieldStyle={modalAddMessageStyle.inputSx}
            isError={groupState?.error?.title ? true : false}
            errorMessage={groupState?.error?.title ?? ''}
          />
        </Box>
        <Box sx={modalAddMessageStyle.inputGroupSx}>
          <Label sx={modalAddMessageStyle.labelSx} htmlFor="description" isRequired>
            Description
          </Label>
          <Input
            size="small"
            placeholder="Add description"
            value={groupState?.description}
            id="description"
            // textFieldStyle={{ height: '112px' }}
            rows={5}
            rowsMax={10}
            textFieldStyle={modalAddMessageStyle.inputSx}
            isMulti={true}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('description', e.target.value)
            }
            isError={groupState?.error?.description ? true : false}
            errorMessage={groupState?.error?.description ?? ''}
          />
        </Box>
      </Box>
    </Box>
  );
});

ModalAddMessage.displayName = 'ModalAddMessage';
