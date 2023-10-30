import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { modalAddPermissionStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { CustomDropdown } from '@atoms/customDropdown';
import { useEffect, useState } from 'react';

export interface ModalAddPermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: (key: string, value: string) => void;
  groupState?: any;
  formErrors?: any;
  modalForm?: boolean;
  dropdown?: boolean;
  title?: string;
  description?: string;
  permissionList?: any;
}

export const ModalAddPermission = (props: ModalAddPermissionProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    handleChange = () => false,
    modalForm = false,
    dropdown = false,
    title = '',
    description = '',
    groupState,
    formErrors,
    permissionList,
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...modalAddPermissionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={{ p: 3 }}>
        {modalForm && (
          <>
            <Box sx={modalAddPermissionStyle.inputGroupSx}>
              <Label sx={modalAddPermissionStyle.labelSx} htmlFor="addTitle" isRequired>
                {title}
              </Label>
              <Input
                size="small"
                placeholder=" Add Title"
                value={groupState?.name}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('name', e?.target?.value)
                }
                textFieldStyle={modalAddPermissionStyle.inputSx}
                // error={Boolean(errors.title)}
                // helperText={errors.title}
                isError={Boolean(formErrors.title)}
                errorMessage={formErrors.title}
              />
            </Box>
            <Box sx={modalAddPermissionStyle.inputGroupSx}>
              <Label sx={modalAddPermissionStyle.labelSx} htmlFor="description" isRequired>
                {description}
              </Label>
              <Input
                size="small"
                placeholder="Add description"
                value={groupState?.description}
                id="description"
                // textFieldStyle={{ height: '112px' }}
                rows={5}
                rowsMax={10}
                textFieldStyle={modalAddPermissionStyle.inputSx}
                isMulti={true}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('description', e.target.value)
                }
                // error={Boolean(errors.description)}
                // helperText={errors.description}
                isError={Boolean(formErrors.description)}
                errorMessage={formErrors.description}
              />
            </Box>
          </>
        )}
        {dropdown && (
          <Box>
            <Label sx={modalAddPermissionStyle.labelSx} htmlFor="description" isRequired>
              Select Permission
            </Label>
            <CustomDropdown
              placeholder="Select Role"
              options={groupState.permission}
              permissionList={permissionList}
              onChange={(value) => {
                handleChange('permission', value);
              }}
              value={groupState.permission.length > 0 ? groupState.permission : []}
              isError={Boolean(formErrors.permission)}
              errorMessage={formErrors.permission}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
