import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { userProfileStyle } from './style';
import { Drawer } from '@atoms/drawer';
import { useEffect, useState } from 'react';
import { useOrganisation, useProfileUser, useRoles } from '@core/store';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData } from './utills';
import { TableHeader, UserProfileForm } from '..';
import { FooterComponent } from '@atoms/footerComponent';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Label } from '@atoms/label';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { DeleteIcon } from '@atoms/icons';
import { organisationStyle } from '@components/organisation/style';

export interface UserProfileProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { getOrganisationList, OrganisationList } = useOrganisation();
  const { getRolesList, RolesList } = useRoles();
  const {
    getUserList,
    UserList,
    getStatusList,
    createEditUser,
    createUser,
    editUser,
    updateEditData,
    deleteUser,
    clearAll,
    seteditUser,
    OrganisationDetails,
    seteditOrganisationDetails,
    createUserRollMap,
    editUserRollMap,
    updateEditOrganisationData,
    deleteUserRollMap,
  } = useProfileUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState();
  const [roleOption, setRoleOption] = useState();
  const [values, setValues] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  const [selectedrole, setSelectedrole] = useState();
  // console.log(UserList, 'filteredMessageGroup');
  console.log(OrganisationDetails, 'filteredMessageGroup');

  const filteredMessageGroup = UserList.filter((x: any) =>
    x.userName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleClose = () => {
    setValues(false);
  };

  const handleTableEdit = (id: string, data: any, e: any) => {
    // debugger;
    setOpen(true);
    const editData = {
      id: id,
      name: data.userName,
      designation: data.designation,
      is_active: data.is_active,
      organisationId: data.organisationId,
      email: data.emailId,
    };
    const organisationIdData = {
      id: data.organisationId,
    };
    updateEditOrganisationData(organisationIdData);
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    deleteUser(id);
  };

  const handleClickDetail = (id: string, data: any, e: any) => {
    const editData = {
      id: id,
      userprofileMap_id: data.data.user_role_mappings.id,
      userprofileMap_Rolename: data.data.user_role_mappings.role_name,
      userprofileMap_Roleid: data.data.user_role_mappings.role_id,
    };
    updateEditData(editData);
    setValues(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    clearAll();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleChangeRoleDrop = (e: any) => {
    handleChange('userprofileMap_Roleid', e.id);
    handleChange('userprofileMap_Rolename', e.name);
  };

  useEffect(() => {
    getUserList(OrganisationDetails.id);
    getOrganisationList();
    getRolesList();
  }, []);

  useEffect(() => {
    getUserList(OrganisationDetails.id);
  }, [OrganisationDetails]);

  const optionList = () => {
    const dataTable: any = [];
    if (OrganisationList) {
      OrganisationList.map((tableData: any, i: any) =>
        dataTable.push({
          id: tableData.id,
          name: tableData.organisationName,
        }),
      );
      setOption(dataTable);
    }
  };

  const roleList = () => {
    const dataTable: any = [];
    // debugger;
    if (RolesList) {
      RolesList.map((tableData: any, i: any) =>
        dataTable.push({
          id: tableData.id,
          name: tableData.name,
        }),
      );
      setRoleOption(dataTable);
    }
  };

  const handleChangeOrganisationkey = (key: string, value: string | number) => {
    seteditOrganisationDetails({ key, value });
  };

  const handleChangeOrganisation = (value: any) => {
    handleChangeOrganisationkey('id', value.id);
    handleChangeOrganisationkey('name', value.name);
  };
  const handleChange = (key: string, value: string | number) => {
    seteditUser({ key, value });
  };
  const handleSave = () => {
    if (createEditUser.id) {
      editUser();
    } else {
      createUser();
    }
    setOpen(false);
    clearAll();
  };
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
  const onRoleDelete = () => {
    deleteUserRollMap();
    setValues(false);
  };
  const handleSaveRoleMap = () => {
    // createUserRollMap();\
    createEditUser.userprofileMap_id ? createUserRollMap() : editUserRollMap();
    setValues(false);
  };
  console.log(createEditUser.userprofileMap_id, 'userprofileid');
  useEffect(() => {
    handleStatus();
  }, [UserList]);
  useEffect(() => {
    optionList();
  }, [OrganisationList]);
  useEffect(() => {
    roleList();
  }, [RolesList]);

  return (
    <Box
      sx={[
        {
          ...userProfileStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IdmBackgroundCard
        title="Organisation"
        subTitle="User Profiles"
        optionList={option}
        handleChangeDropDown={handleChangeOrganisation}
        createEditState={OrganisationDetails}
        content={
          <Box sx={userProfileStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={filteredMessageGroup}
              tableData={tableData(handleTableEdit, handleTableDelete, handleClickDetail)}
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
                padding: '3px 0px 3px 7px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
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
                    isFilterRequired={false}
                    buttonName={'Add User'}
                    tableHeader={'User Profiles'}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    isBtnRequired={true}
                    handleOpen={handleDrawerOpen}
                  />
                ),
              }}
            />
          </Box>
        }
      />
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '20px' }}
        drawerRightClose
        header={createEditUser.id ? 'Edit Service' : 'Add New Service'}
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
        footer={
          <FooterComponent
            check={true}
            onSave={handleSave}
            onCancel={handleDrawerClose}
            SwitchChange={(e) => {
              handleChange('is_active', e.target.checked);
            }}
            checked={createEditUser.is_active}
          />
        }
        footerStyle={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          pl: 0,
          pr: 0,
        }}
      >
        <UserProfileForm createEditUser={createEditUser} handlechange={handleChange} />
      </Drawer>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={createEditUser.userprofileMap_id ? 'Add Role Mapping' : 'Edit Role Mapping'}
        // title="Checking"
        Bodycomponent={
          <Box sx={userProfileStyle.inputGroupSx}>
            <Label htmlFor="addTitle" isRequired sx={userProfileStyle.labelSx}>
              Map Role
            </Label>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CutstomizedAutocomplete
                sx={{
                  '& .MuiOutlinedInput-root': {
                    width: '325px',
                  },
                }}
                // value={organisationStyle}
                // value={organisationStyle === '' ? createEditUser.userprofileMap_Rolename : []}
                permissionList={roleOption}
                onChange={(e: any) => handleChangeRoleDrop(e)}
              />
              <Box sx={userProfileStyle.deleteSection} onClick={onRoleDelete}>
                <DeleteIcon rootStyle={{ mt: '5px' }} />
              </Box>
            </Box>
            <p>{createEditUser.userprofileMap_Rolename}</p>
          </Box>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={userProfileStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            saveButtonStyle={{ minWidth: '90px', height: '22px', borderRadius: '4px' }}
            onCancel={handleClose}
            onSave={handleSaveRoleMap}
          />
        }
      />
    </Box>
  );
};
