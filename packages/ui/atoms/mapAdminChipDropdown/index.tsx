import type { SxProps, Theme } from '@mui/material';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';

import { mapAdminChipDropdownStyle } from './style';
import {
  CutstomizedAutocomplete,
  DialogDrawer,
  FooterComponent,
  Input,
  Label,
  MappedAdminCard,
  MappedUserCard,
} from '..';
import { useAdminLanding, useSuperAdminLanding } from '@core/store';
import React, { useEffect, useState } from 'react';

export interface MapAdminChipDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  dataList?: [];
  optionList?: [];
  handleChange?: (key: string, value: any) => void;
  createEditAdmin: any;
}

export const MapAdminChipDropdown = (props: MapAdminChipDropdownProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    dataList = [],
    handleChange = () => {},
    optionList = [],
    createEditAdmin,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<UserData[]>([]);
  const [values, setValues] = useState(false);

  const {
    emailChecker,
    userNameChecker,
    userInviteEdit,
    seteditUserInviteDetails,
    addUserInvite,
    getUserMasterByOrganisation,
  } = useAdminLanding();

  const { getAllUserList } = useSuperAdminLanding();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeUserInvite = (key: string, value: string) => {
    seteditUserInviteDetails({ key, value });
  };

  const onSaveUserInvite = () => {
    addUserInvite();
    handleCloseUserInvite();
    getAllUserList();
    setAnchorEl(null);
  };

  const handleOpenUserInvite = () => {
    setValues(true);
  };

  const handleCloseUserInvite = () => {
    setValues(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionToggle = (option: UserData) => {
    const isSelected = selectedOptions.some((selected) => selected.id === option.id);
    setSelectedOptions((prevOptions) =>
      isSelected ? prevOptions.filter((opt) => opt.id !== option.id) : [...prevOptions, option],
    );
  };

  const onSetChange = () => {
    handleChange('mapAdmin', selectedOptions);
  };

  useEffect(() => {
    if (userInviteEdit.userName !== '') {
      const getuserNameCheck = setTimeout(() => {
        userNameChecker();
      }, 1000);
      return () => clearTimeout(getuserNameCheck);
    }
  }, [userInviteEdit.userName]);

  useEffect(() => {
    if (userInviteEdit.email !== '') {
      const getemailCheck = setTimeout(() => {
        emailChecker();
      }, 1000);
      return () => clearTimeout(getemailCheck);
    }
  }, [userInviteEdit.email]);

  useEffect(() => {
    onSetChange();
  }, [selectedOptions]);
  console.log('createEditAdmincreateEditAdmincreateEditAdmin', createEditAdmin);

  return (
    <Box
      sx={[
        {
          ...mapAdminChipDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              width: '300px',
              height: '130px',
              marginTop: '16px',
              p: 0,
            },
          }}
        >
          {dataList.map((data) => (
            <MenuItem
              sx={{
                py: 0,
                backgroundColor: selectedOptions.some((opt) => opt.id === data.id) ? '#dce8e5' : '#fff',
              }}
              key={data.id}
              onClick={() => handleOptionToggle(data)}
            >
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.some((opt) => opt.id === data.id)} />
              <Box
                sx={{ px: 1, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
              >
                <MappedAdminCard options={data} />
              </Box>
            </MenuItem>
          ))}
          <MenuItem
            sx={{
              py: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#f0f0f0',
              px: 0,
              justifyItems: 'left', // Customize the background color as needed
            }}
            onClick={() => {
              handleOpenUserInvite();
            }}
          >
            <GreenCloseCircleIcon
              rootStyle={{
                minWidth: '22px',
                height: '22px',
                borderRadius: '50% !important',
                marginRight: '10px',
              }}
            />
            <Typography style={{ color: '#357968', fontSize: '14px', fontWeight: 600 }}>Invite User</Typography>
          </MenuItem>
        </Menu>
        <MappedUserCard dataMaster={createEditAdmin} />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }} onClick={handleClick}>
          <GreenCloseCircleIcon
            rootStyle={{
              minWidth: '22px',
              height: '22px',
              borderRadius: '50% !important',
              marginRight: '10px',
            }}
          />
          <Typography style={{ color: '#357968', fontSize: '14px', fontWeight: 600 }}>Add User</Typography>
        </Box>
      </div>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Invite a user'}
        Bodycomponent={
          <Box sx={mapAdminChipDropdownStyle.padd}>
            <Box sx={mapAdminChipDropdownStyle.inputGroupSx}>
              <Label sx={mapAdminChipDropdownStyle.labelSx} htmlFor="addTitle" isRequired>
                UserName
              </Label>
              <Input
                size="small"
                placeholder="Charge name"
                required
                value={userInviteEdit?.userName}
                textFieldStyle={mapAdminChipDropdownStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChangeUserInvite('userName', e.target.value)
                }
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={mapAdminChipDropdownStyle.inputGroupSx}>
              <Label sx={mapAdminChipDropdownStyle.labelSx} htmlFor="addTitle" isRequired>
                Email
              </Label>
              <Input
                size="small"
                placeholder="Email Id"
                required
                value={userInviteEdit?.email}
                textFieldStyle={mapAdminChipDropdownStyle.inputSx}
                id="email"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChangeUserInvite('email', e.target.value)
                }
              />
            </Box>
          </Box>
        }
        handleCloseDialog={handleCloseUserInvite}
        dialogRootStyle={mapAdminChipDropdownStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            disabled={userInviteEdit.userNameStatus === 200 && userInviteEdit.emailStatus === 200 ? false : true}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handleCloseUserInvite}
            onSave={onSaveUserInvite}
          />
        }
      />
    </Box>
  );
};
