import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { modalAddServicesStyle } from './style';

export interface ModalAddServicesProps {
  className?: string;
  handleChange?: (key: string, value: string) => void;
  groupState?: any;
  sx?: SxProps<Theme>;
}

export const ModalAddServices = forwardRef((props: ModalAddServicesProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, handleChange = () => false, groupState, ...rest } = props;
  console.log(groupState, 'GroupState');
  return (
    <Box
      sx={[
        {
          ...modalAddServicesStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={modalAddServicesStyle.inputGroupSx}>
          <Label sx={modalAddServicesStyle.labelSx} htmlFor="addTitle" isRequired>
            Name
          </Label>
          <Input
            size="small"
            placeholder=" Add Name"
            value={groupState?.title}
            id="Name"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('name', e?.target?.value)
            }
            textFieldStyle={modalAddServicesStyle.inputSx}
            // isError={groupState?.error?.addTitle ? true : false}
            // errorMessage={groupState?.error?.addTitle ?? ''}
          />
        </Box>
        <Box sx={modalAddServicesStyle.inputGroupSx}>
          <Label sx={modalAddServicesStyle.labelSx} htmlFor="description" isRequired>
            Repository Url
          </Label>
          <Input
            size="small"
            placeholder="Add Repository Url"
            value={groupState?.description}
            id="repository_url"
            // textFieldStyle={{ height: '112px' }}
            textFieldStyle={modalAddServicesStyle.inputSx}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('repository_url', e.target.value)
            }
            // isError={groupState?.error?.addDescription ? true : false}
            // errorMessage={groupState?.error?.addDescription ?? ''}
          />
        </Box>
      </Box>
    </Box>
  );
});

ModalAddServices.displayName = 'ModalAddServices';
