import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminSectionStyle } from './style';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { AdminSecForm } from '..';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData, tableJson } from './utills';
import { Drawer } from '@atoms/drawer';
import { useAdminLanding, useMenu } from '@core/store';
import { FooterComponent } from '@atoms/footerComponent';
import { TableHeader } from '@components/commonComponents';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '@core/routes';
import { localStorageKeys } from '@core/utils';
export interface AdminSectionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AdminSection = (props: AdminSectionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const {
    getOrganisationMaster,
    OrganisationListMaster,
    OrganisationDetails,
    seteditOrganisationDetails,
    createAdmin,
    createEditAdmin,
    seteditAdmin,
    getServiceMasterByOrganisation,
    getUserMasterByOrganisation,
    clearAll,
    getAdminList,
    adminList,
    getAllProjectsEditData,
    deleteAdmin,
    editAdmin,
    getStatusList,
  } = useAdminLanding();
  const { getSideMenusFromProject } = useMenu();

  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const filteredMessageGroup = adminList.filter(
    (x: any) => x.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(filteredMessageGroup, 'filteredMessageGroup');
  

  const handleTableEdit = (id: string, data: any, e: any) => {
    getAllProjectsEditData(id);
    getServiceMasterByOrganisation();
    getUserMasterByOrganisation();
    setOpen(true);
  };
  const handleTableDelete = (id: string) => {
    deleteAdmin(id);
    console.log('');
  };
  const handleTableDetail = (id: string) => {
    debugger;
    // getMenu();
    getSideMenusFromProject(id);
    localStorage.setItem(localStorageKeys.projectId, id);
    navigate(webRoutes.root);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    clearAll();
  };
  const handleDrawerOpen = () => {
    getAdminList();
    getServiceMasterByOrganisation();
    getUserMasterByOrganisation();
    setOpen(true);
  };
  const handleChange = (key: string, value: string | number) => {
    seteditAdmin({ key, value });
  };

  useEffect(() => {
    getOrganisationMaster();
  }, []);
  const handleChangeOrganisationkey = (key: string, value: string | number) => {
    seteditOrganisationDetails({ key, value });
    getAdminList();
  };
  const handleChangeOrganisation = (value: any) => {
    debugger;
    handleChangeOrganisationkey('id', value.id);
    handleChangeOrganisationkey('name', value.name);
    handleChangeOrganisationkey('rolename', value.rolename);
  };
  const handleSave = () => {
    if (createEditAdmin.id) {
      editAdmin();
    } else {
      createAdmin();
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
    if (adminList?.length > 0) {
      const status = adminList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };
  useEffect(() => {
    handleStatus();
  }, [adminList]);
  return (
    <Box
      sx={[
        {
          ...adminSectionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IdmBackgroundCard
        title="Organisation"
        subTitle="Projects"
        optionList={OrganisationListMaster}
        handleChangeDropDown={handleChangeOrganisation}
        createEditState={OrganisationDetails}
        content={
          <Box sx={adminSectionStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={filteredMessageGroup}
              tableData={tableData(handleTableEdit, handleTableDelete, handleTableDetail)}
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
                    buttonName={'Add Projects'}
                    tableHeader={'Projects'}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    isBtnRequired={OrganisationDetails.rolename === 'TOOLKIT-ADMIN' ? true : false}
                    handleOpen={handleDrawerOpen}
                    // editTableMessage={addRole}
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
        drawerStyleSX={{ padding: '20px 20px 70px 20px' }}
        drawerRightClose
        header={createEditAdmin.id ? 'Edit Project' : 'Add New Project'}
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
            checked={createEditAdmin.is_active}
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
        <AdminSecForm createEditAdmin={createEditAdmin} handlechange={handleChange} />
      </Drawer>
    </Box>
  );
};