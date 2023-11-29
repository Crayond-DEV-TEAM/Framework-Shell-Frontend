import type { SxProps, Theme } from '@mui/system';
import { Box, Menu, MenuItem, Typography, Popover } from '@mui/material';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import React, { useEffect, useState } from 'react';
import {
  CutstomizedAutocomplete,
  DialogDrawer,
  FooterComponent,
  Input,
  Label,
  MappedAdminCard,
  MappedUserCard,
} from '..';

import { addChipMultipleDropdownStyle } from './style';
import { useAdminLanding, useSuperAdminLanding } from '@core/store';
import { SearchIcon } from '@atoms/icons';

interface AccessOption {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  name: string;
}

interface AccessOption {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  name: string;
}

export interface AddChipMultipleDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  dataList?: UserData[];
  optionList?: AccessOption[];
  handleChange?: (key: string, value: any) => void;
  createEditAdmin: any;
  accessMaster: any;
  inviteSection?: boolean;
  isSearchRequired?: boolean;
  // onSaveUserInvite?: () => void;
}

export const AddChipMultipleDropdown: React.FC<AddChipMultipleDropdownProps> = ({
  className = '',
  sx = {},
  dataList = [],
  handleChange = () => {},
  optionList = [],
  createEditAdmin,
  accessMaster,
  inviteSection = false,
  isSearchRequired = false,
  // onSaveUserInvite = () => false,
  ...rest
}: AddChipMultipleDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<UserData[]>([]);
  const [accessState, setAccessState] = useState(accessMaster?.[0]);
  const [values, setValues] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessageGroup = dataList.filter((x: any) => x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()));

  const roleOption = [
    {
      id: '4819fbb0-9dc3-4bbf-bf01-23b29ce2d198',
      name: 'TOOLKIT-ADMIN',
    },
    {
      id: '38667c3d-7cdc-48f8-9848-9b557a130728',
      name: 'TOOLKIT-USER',
    },
  ];

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
    // addUserInvite();
    addUserInvite(() => {
      getUserMasterByOrganisation();
    });
    handleCloseUserInvite();
    // getUserMasterByOrganisation();
    handleClose();
    // getAllUserList();
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
    const isSelected = selectedOptions.find((selected) => selected.id === option.id);
    if (isSelected?.id) {
      const isSelected = selectedOptions.filter((v: any) => v?.id !== option?.id);
      setSelectedOptions(isSelected);
      const setItemsUsers = selectedOptions.map((user) => ({
        id: user.id,
        name: user.name,
        access: accessState,
      }));
      handleChange('mapAdmin', isSelected);
      // handleChange('mapAdmin', isSelected);
      // createEditOrganisation.id ? deleteAdminmap() : '';
    } else {
      selectedOptions.push(option);
      setSelectedOptions(selectedOptions);
      const setItemsUsers = selectedOptions.map((user) => ({
        id: user.id,
        name: user.name,
        access: accessState,
      }));
      handleChange('mapAdmin', setItemsUsers);
      // handleChange('mapAdmin', values);
      // createEditOrganisation.id ? createAdminmap() : '';
    }
  };
  // const handleOptionToggle = (option: any) => {
  //   const isSelected = values.find((v: any) => v?.id === option?.id);
  //   if (isSelected?.id) {
  //     const isSelected = values.filter((v: any) => v?.id !== option?.id);
  //     setValues(isSelected);
  //     handleChange('mapAdmin', isSelected);
  //     createEditOrganisation.id ? deleteAdminmap() : '';
  //   } else {
  //     values.push(option);
  //     setValues(values);
  //     handleChange('mapAdmin', values);
  //     createEditOrganisation.id ? createAdminmap() : '';
  //   }
  // };

  const handleChangeAccess = (selectedAccess: AccessOption | null) => {
    setAccessState(selectedAccess);
  };

  const onSetChange = () => {
    if (selectedOptions.length > 0 && accessState) {
      const setItemsUsers = selectedOptions.map((user) => ({
        id: user.id,
        name: user.name,
        access: accessState,
      }));
      handleChange('mapAdmin', setItemsUsers);
    }
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
  }, [selectedOptions, accessState]);

  return (
    <Box sx={[addChipMultipleDropdownStyle.rootSx, ...(Array.isArray(sx) ? sx : [sx])]} className={className} {...rest}>
      <div>
        <Popover
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
          {isSearchRequired && (
            // <MenuItem>
            // <Box sx={{ pr: 1, pt: '3px' }}>
            //   <Input
            //     placeholder={'search'}
            //     value={createEditAdmin.searchName}
            //     onChange={(e) => handleChange('searchName', e.target.value)}
            //     startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
            //   />
            // </Box>
            // </MenuItem>
            <Box sx={{ m: '10px' }}>
              <Input
                // textFieldStyle={{ height: '25px', margin: '10px' }}
                // height="10px"
                width="10px"
                placeholder={'search'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <SearchIcon rootStyle={{ ml: 1, height: '10px', fontSize: '16px', color: '#818181' }} />
                }
              />
            </Box>
          )}
          {filteredMessageGroup.map((data) => {
            const test = createEditAdmin.mapAdmin;
            const isSelected = test?.filter((v: any) => v?.id === data?.id);
            return (
              <MenuItem
                sx={{
                  py: 0,
                  backgroundColor: isSelected?.length > 0 ? '#dce8e5' : '#fff',
                }}
                key={data.id}
                onClick={() => handleOptionToggle(data)}
              >
                <CheckBox style={{ marginRight: '8px' }} checked={isSelected?.length > 0} />
                <Box
                  sx={{ px: 1, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                >
                  <MappedAdminCard options={data} />
                  <CutstomizedAutocomplete
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline:focus-visible': {
                        border: 0,
                      },
                    }}
                    onChange={(e: AccessOption | null) => handleChangeAccess(e)}
                    permissionList={accessMaster}
                    value={accessState}
                  />
                </Box>
              </MenuItem>
            );
          })}

          {inviteSection && (
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
                  // p:'3px'
                }}
              />
              <Typography style={{ color: '#357968', fontSize: '14px', fontWeight: 600 }}>Invite User</Typography>
            </MenuItem>
          )}
        </Popover>

        <MappedUserCard dataMaster={createEditAdmin.mapAdmin} />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }} onClick={handleClick}>
          <GreenCloseCircleIcon
            rootStyle={{
              minWidth: '22px',
              height: '22px',
              borderRadius: '50% !important',
              marginRight: '10px',
              // p:'3px'
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
          <Box sx={addChipMultipleDropdownStyle.padd}>
            <Box sx={addChipMultipleDropdownStyle.inputGroupSx}>
              <Label sx={addChipMultipleDropdownStyle.labelSx} htmlFor="addTitle" isRequired>
                UserName
              </Label>
              <Input
                size="small"
                placeholder="Charge name"
                required
                value={userInviteEdit?.userName}
                textFieldStyle={addChipMultipleDropdownStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChangeUserInvite('userName', e.target.value)
                }
                // isError={Boolean(formErrors.name)}
                // errorMessage={formErrors.name}
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={addChipMultipleDropdownStyle.inputGroupSx}>
              <Label sx={addChipMultipleDropdownStyle.labelSx} htmlFor="addTitle" isRequired>
                Email
              </Label>
              <Input
                size="small"
                placeholder="Email Id"
                required
                value={userInviteEdit?.email}
                textFieldStyle={addChipMultipleDropdownStyle.inputSx}
                id="email"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChangeUserInvite('email', e.target.value)
                }
                // isError={Boolean(formErrors.description)}
                // errorMessage={formErrors.description}
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={addChipMultipleDropdownStyle.inputGroupSx}>
              <Label sx={addChipMultipleDropdownStyle.labelSx} htmlFor="addTitle" isRequired>
                Role
              </Label>
              <CutstomizedAutocomplete
                placeholder="Silver"
                permissionList={roleOption}
                onChange={(value) => {
                  handleChangeUserInvite('role', value);
                }}
                value={userInviteEdit.role && Object.keys(userInviteEdit.role).length > 0 ? userInviteEdit.role : null}
                // isError={Boolean(formErrors.role)}
                // errorMessage={formErrors.role}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={handleCloseUserInvite}
        dialogRootStyle={addChipMultipleDropdownStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            // check
            // SwitchChange={(e) => {
            //   handleAddEditStateChange('is_active', e.target.checked);
            // }}
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
