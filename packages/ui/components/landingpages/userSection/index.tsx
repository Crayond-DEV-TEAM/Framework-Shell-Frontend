import type { SxProps, Theme } from '@mui/material';
import { Box, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { userSectionStyle } from './style';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData, tableJson } from './utills';
import { Button } from '@atoms/button';
import { Drawer } from '@atoms/drawer';
import { AddChipDropdown } from '@atoms/addChipDropdown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MappedUserCard } from '@atoms/mappedUserCard';
import { TableHeader } from '@components/commonComponents';
import { useAdminLanding, useUserLanding } from '@core/store';
import { AddChipMultipleDropdown } from '@atoms/addChipMultipleDropdown';
import { FooterComponent } from '@atoms/footerComponent';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface UserSectionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const UserSection = (props: UserSectionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [values, setValues] = useState(false);
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = useState(false);

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

  const { OrganisationDetails } = useAdminLanding();
  const {
    UserList,
    createEditUserRoleList,
    UserListMasterBySearch,
    seteditUserList,
    getSearchOptionList,
    deleteUserlist,
    createUserList,
    clearAll,
    getAllUserProfileList,
    updateEditData,
    seteditRole,
    UserEditRoleData,
    editUserList,
    getStatusList,
  } = useUserLanding();

  const filteredMessageGroup = UserList.filter((x: any) => x.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleTableEdit = (id: string, data: any, e: any) => {
    const editData = {
      id: data.id,
      name: data.name,
      role: {
        id: data.data.role_id,
        name: data.data.role_name,
      },
      is_active: data.is_active,
    };
    updateEditData(editData);
    setValues(true);
  };
  const handleTableDelete = (id: string) => {
    deleteUserlist(id);
    // setOpen(tru);
  };

  const onSaveUserEdit = () => {
    editUserList();
    handleCloseUserEdit();
  };

  const handleSave = () => {
    if (createEditUserRoleList.mapAdmin.length > 0) {
      // If the length is greater than 0, do nothing or handle the case where it's greater than 0
      createUserList();
      handleDrawerClose();
      clearAll();
      setFormError(false);
    } else {
      setFormError(true);
      // If the length is not greater than 0, execute the following code
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setFormError(false);
    clearAll();
  };

  const handleCloseUserEdit = () => {
    setValues(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    getSearchOptionList(OrganisationDetails.id);
  };

  const handleChange = (key: string, value: any) => {
    seteditUserList({ key, value });
  };

  const handleRoleChange = (key: string, value: any) => {
    seteditRole({ key, value });
  };
  useEffect(() => {
    getAllUserProfileList();
  }, []);

  useEffect(() => {
    getSearchOptionList(OrganisationDetails.id);
  }, [createEditUserRoleList.searchName]);

  const handleSwitch = (id: any, data: any, e: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
    if (e.target.checked === true) {
      getStatusList(id, true);
    } else {
      getStatusList(id, false);
    }
  };
  const handleStatus = () => {
    if (UserList?.length > 0) {
      const status = UserList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };
  useEffect(() => {
    if (createEditUserRoleList.mapAdmin.length > 0) {
      setFormError(false);
    } else {
    }
  }, [createEditUserRoleList.mapAdmin]);
  useEffect(() => {
    handleStatus();
  }, [UserList]);


  return (
    <Box
      sx={[
        {
          ...userSectionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={userSectionStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={filteredMessageGroup}
          tableData={tableData(handleTableEdit, handleTableDelete)}
          switchList={switchList}
          handleSwitch={handleSwitch}
          headerOptions={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#818181',
            bgColor: '#EAEAEA',
            borderBottom: '0px',
            width: '100%',
            padding: '6px 16px 6px 7px',
          }}
          cellOptions={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#5A5A5A',
            borderBottom: '0px',
            // padding: '8px',
            padding: '3px 0px 3px 7px',
          }}
          rowOptions={{
            rowOddBgColor: '#fff',
            rowEvenBgColor: '#F7F7F7',
          }}
          paginationOption={{
            isEnable: true,
            rowPerPage: 10,
            rowsPerPageOptions: [5, 10, 25]
          }}
          tableMinWidth={'80px'}
          stickyOptions={{
            stickyHeader: true,
            stickyLeft: [],
            stickyRight: [],
          }}
          tableMinHeight={'calc(100vh - 308px)'}
          tableMaxHeight={'calc(100vh - 308px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          HeaderComponent={{
            variant: 'CUSTOM',
            component: (
              <TableHeader
                // onApply={false}
                isFilterRequired={false}
                buttonName={'Add User'}
                tableHeader={''}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                isBtnRequired={true}
                handleOpen={handleDrawerOpen}
              />
            ),
          }}
        />
      </Box>
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '0px 20px' }}
        drawerRightClose
        header={'Add New User'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        rootStyle={{
          '& .MuiDrawer-paperAnchorRight': {
            width: '340px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
        }}
        footer={<FooterComponent check={false} onSave={handleSave} onCancel={handleDrawerClose} />}
        footerStyle={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          pl: 0,
          pr: 0,
        }}
      >
        <div>
          <Accordion
            sx={{
              boxShadow: 'none',
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: 0 }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Add User</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              <AddChipMultipleDropdown
                createEditAdmin={createEditUserRoleList}
                dataList={UserListMasterBySearch}
                accessMaster={roleOption}
                handleChange={handleChange}
                inviteSection={true}
                isSearchRequired={true}
              />
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'red', mt: '10px' }}>
                {formError ? 'Please select the users and role map' : ''}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Drawer>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Edit user'}
        Bodycomponent={
          <Box sx={userSectionStyle.padd}>
            <Box sx={userSectionStyle.inputGroupSx}>
              <Label sx={userSectionStyle.labelSx} htmlFor="addTitle" isRequired>
                UserName
              </Label>
              <Input
                size="small"
                placeholder="User name"
                required
                isReadOnly={true}
                value={UserEditRoleData?.name}
                textFieldStyle={userSectionStyle.inputSx}
                id="title"
                // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                //   handleChangeUserInvite('userName', e.target.value)
                // }
                // isError={Boolean(formErrors.name)}
                // errorMessage={formErrors.name}
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={userSectionStyle.inputGroupSx}>
              <Label sx={userSectionStyle.labelSx} htmlFor="addTitle" isRequired>
                Role
              </Label>
              <CutstomizedAutocomplete
                placeholder="Silver"
                permissionList={roleOption}
                onChange={(value) => {
                  handleRoleChange('role', value);
                }}
                value={
                  UserEditRoleData.role && Object.keys(UserEditRoleData.role).length > 0 ? UserEditRoleData.role : null
                }
                // isError={Boolean(formErrors.role)}
                // errorMessage={formErrors.role}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={handleCloseUserEdit}
        dialogRootStyle={userSectionStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            // check
            // SwitchChange={(e) => {
            //   handleRoleChange('is_active', e.target.checked);
            // }}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handleCloseUserEdit}
            onSave={onSaveUserEdit}
            // checked={userSectionStyle.is_active}
          />
        }
      />
    </Box>
  );
};
