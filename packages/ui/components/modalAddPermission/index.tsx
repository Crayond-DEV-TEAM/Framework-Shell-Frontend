import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { modalAddPermissionStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { CustomDropdown } from '@atoms/customDropdown';

export interface ModalAddPermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleChange?: (key: string, value: string) => void;
  groupState?: any;
  modalForm?: boolean;
  dropdown?: boolean;
  title?: string;
  description?: string;
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
                value={groupState?.title}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('title', e?.target?.value)
                }
                textFieldStyle={modalAddPermissionStyle.inputSx}
                // isError={groupState?.error?.addTitle ? true : false}
                // errorMessage={groupState?.error?.addTitle ?? ''}
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
                // isError={groupState?.error?.addDescription ? true : false}
                // errorMessage={groupState?.error?.addDescription ?? ''}
              />
            </Box>
          </>
        )}
        {dropdown && (
          <Box>
            <Label sx={modalAddPermissionStyle.labelSx} htmlFor="description" isRequired>
              Select Permission
            </Label>
            <CustomDropdown placeholder="Select Role" />
          </Box>
        )}
      </Box>
    </Box>
  );
};
