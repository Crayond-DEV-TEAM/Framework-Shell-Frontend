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
import { useRoles } from '@core/store';

export interface RolesProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Roles = (props: RolesProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [values, setValues] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  const { RolesList, getRolesList, setaddMessage, addRole, addRolesList, clearAll } = useRoles();
  const handleClose = () => {
    setValues(false);
    clearAll();
  };
  const handleOpen = () => {
    setValues(true);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    // debugger;
    setValues(true);
    setaddMessage(data);
    // setIsEdit(true);
    // onEditClicked(id);
  };
  console.log(addRole, 'setaddMessage');
  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };

  const handleTableDelete = (id: string) => {
    setSelected(true);
  };

  const handleAddChange = (key: string, value: string) => {
    setaddMessage({ key, value });
  };
  const save = () => {
    addRolesList();
    handleClose();
  };
  // debugger;
  const filteredMessageGroup = RolesList.filter((x: any) => x.title?.toLowerCase()?.includes(searchTerm.toLowerCase()));

  const handleSwitch = (id: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
  };

  useEffect(() => {
    getRolesList();
  }, []);

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
          tableMinHeight={'210px'}
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
        title={'Add Role'}
        Bodycomponent={
          <ModalAddPermission
            title={'Permission Name'}
            description="Description"
            modalForm={true}
            dropdown={true}
            handleChange={handleAddChange}
            groupState={addRole}
          />
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check
            checked={addRole?.status}
            SwitchChange={(e: any) => handleAddChange('status', e.target.checked)}
            onSave={save}
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
                  <Button buttonStyle={rolesStyle.savebtnText}>Delete</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
