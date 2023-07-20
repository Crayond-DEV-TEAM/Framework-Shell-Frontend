import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { rolesStyle } from './style';
import { ModalAddMessage, ModalAddPermission, TableHeader } from '..';
import { Header, tableData, tableJson } from './utils';
import { useEffect, useState } from 'react';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { DeleteDailog } from '@atoms/deletedailog';
import { Button } from '@atoms/button';
import { dummyTableData } from '@core/store/utils';
import { usePermission, useRoles } from '@core/store';

export interface RolesProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Roles = (props: RolesProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  const {
    RolesList,
    getRolesList,
    setaddMessage,
    addRole,
    addRolesList,
    clearAll,
    updateEditData,
    deleteRoleList,
    getStatusList,
    editRoleList,
  } = useRoles();

  const { getPermissionList, PermissionList } = usePermission();

  const handleClose = () => {
    setValues(false);
    setFormErrors({});
    clearAll();
  };
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (addRole.name.length === 0) {
      errors.title = 'Title is required';
    }

    if (addRole.description.length === 0) {
      errors.description = 'Description is required';
    }

    if (addRole.permission.length === 0) {
      errors.permission = 'Permission is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleOpen = () => {
    setValues(true);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    debugger
    setValues(true);
    setaddMessage(data);
    // setIsEdit(id.length > 0 ? true : false);
    // onEditClicked(id);
    const editData = {
      id: id,
      permission: data.permission,
      name: data.name,
      description: data.description,
      is_active: data.is_active,
    };

    updateEditData(editData);
  };

  const handleEdit = () => {
    editRoleList();
    handleClose();
  };

  const [idrole, setidRole] = useState('');
  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    // clearAll()
    setSelected(false);
  };

  const handleTableDelete = (id: string) => {
    setSelected(true);
    setidRole(id);
  };
  const onDelete = () => {
    deleteRoleList(idrole);
    handlemodalClose();
  };

  const handleAddChange = (key: string, value: string) => {
    setaddMessage({ key, value });
  };
  const save = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      addRolesList();
      handleClose();
    }
  };
  const filteredMessageGroup = RolesList.filter((x: any) => x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()));
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
      // console.log(id);
      getStatusList(id, true);
    } else {
      // console.log(id);
      getStatusList(id, false);
    }
  };
  const handleStatus = () => {
    if (RolesList?.length > 0) {
      const status = RolesList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    getRolesList();
    getPermissionList();
  }, []);
  useEffect(() => {
    handleStatus();
  }, [RolesList]);
  return (
    <Box
      sx={[
        {
          ...rolesStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={rolesStyle.commonTable}>
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
                buttonName={'Add Role'}
                tableHeader={'Roles'}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                handleOpen={handleOpen}
                // editTableMessage={addRole}
              />
            ),
          }}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={`${addRole.id ? 'Edit Role' : 'Add Role'}`}
        Bodycomponent={
          <ModalAddPermission
            title={'Permission Name'}
            description="Description"
            modalForm={true}
            dropdown={true}
            handleChange={handleAddChange}
            groupState={addRole}
            formErrors={formErrors}
            permissionList={PermissionList}
          />
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check
            checked={addRole?.is_active}
            SwitchChange={(e: any) => handleAddChange('is_active', e.target.checked)}
            onSave={addRole.id ? handleEdit : save}
            onCancel={handleClose}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={rolesStyle.dialogSx}
      />
      <DeleteDailog
        isDialogOpened={selected}
        Bodycomponent={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this?</Typography>
            <Box sx={rolesStyle.totalFooterSx}>
              <Box sx={rolesStyle.btnSx}>
                <Box sx={rolesStyle.btnBg}>
                  <Button buttonStyle={rolesStyle.cancelbtnText} onClick={handlemodalClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={rolesStyle.savebtnBg}>
                  <Button buttonStyle={rolesStyle.savebtnText} onClick={onDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
