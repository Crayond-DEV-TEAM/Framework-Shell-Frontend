import type { SxProps, Theme } from '@mui/material';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { usePermission, useRoles } from '@core/store';
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
  RepositoryList?: any;
  isPermission?: boolean;
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
    isPermission = false,
    RepositoryList,
    ...rest
  } = props;

  const [inherit, setInherit] = useState(false);
  const [inheritPermission, setInheritPermission] = useState(false);
  const { setaddMessage, RolesList } = useRoles();

  const { setaddPermission, addPermissionList } = usePermission();

  const permissionArry = RolesList?.filter((val: any) => {
    return groupState.id !== val.id ? { id: val.id, name: val.name, value: val.permission } : null;
  });

  const newpermissionList = permissionList?.map((val: any) => {
    return { id: val.id, name: val.name, value: val?.data?.data };
  });

  const handleSwitchChange = () => {
    setInherit(!inherit);
    if (inherit) {
      setaddMessage({ key: 'permission', value: '' });
    } else {
      setaddMessage({ key: 'inherit', value: '' });
    }
  };
  const handleSwitchPermissionChange = () => {
    setInheritPermission(!inheritPermission);
    if (inheritPermission) {
      setaddPermission({ key: 'permissionList', value: '' });
    }
  };

  const handlePermissionChange = (key, value) => {
    setaddPermission({ key, value });
  };

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Label sx={modalAddPermissionStyle.labelSx} htmlFor="description" isRequired>
                {!inherit ? 'Select Permission' : 'inherit Permission '}
              </Label>

              <FormControlLabel control={<Switch checked={inherit} onChange={handleSwitchChange} />} label="inherit" />

              {/*   */}
            </Box>
            {!inherit ? (
              <>
                <CustomDropdown
                  placeholder="Select Permission"
                  options={groupState.permission}
                  permissionList={permissionList}
                  onChange={(value) => {
                    handleChange('permission', value);
                  }}
                  value={groupState.permission.length > 0 ? groupState.permission : []}
                  // isError={Boolean(formErrors.permission)}
                  // errorMessage={formErrors.permission}
                />
              </>
            ) : (
              <>
                <CustomDropdown
                  placeholder="inherit Permission"
                  permissionList={permissionArry}
                  onChange={(value) => {
                    handleChange('inherit', value);
                  }}
                  value={groupState?.inherit?.length > 0 ? groupState.inherit : []}
                />
              </>
            )}
          </Box>
        )}
        {isPermission && (
          <Box>
            <FormControlLabel
              control={<Switch checked={inheritPermission} onChange={handleSwitchPermissionChange} />}
              label="inherit permission"
            />
            {inheritPermission && (
              <>
                <CustomDropdown
                  placeholder="inherit Permission"
                  permissionList={newpermissionList}
                  onChange={(value) => {
                    handlePermissionChange('permissionList', value);
                  }}
                  value={groupState?.permissionList?.length > 0 ? groupState.permissionList : []}
                />
              </>
            )}

            {/*   */}
          </Box>
        )}
      </Box>
    </Box>
  );
};
