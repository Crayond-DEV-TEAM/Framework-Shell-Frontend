import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { Drawer } from '@atoms/drawer';
import { AdminSecForm, SuperAdminForm } from '..';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData, tableJson } from './utills';
import { useEffect, useState } from 'react';
import { superAdminStyle } from './style';
import { TableHeader } from '@components/commonComponents';
import { useAdminLanding, useProfileUserLanding, useSuperAdminLanding } from '@core/store';
import { FooterComponent } from '@atoms/footerComponent';
import { useNavigate } from 'react-router-dom';
import { webRoutes } from '@core/routes';
import { CustomSwitches } from '@atoms/customSwitches';
export interface SuperAdminProps {
  className?: string;
  sx?: SxProps<Theme>;
}
const CustomSwitch = ({ checked, onChange }) => {
  return (
    <Box sx={superAdminStyle.customSwitch}>
      <CustomSwitches label="" value={checked} onClick={onChange} />
      <Typography sx={superAdminStyle.customSwitchStatus}>{checked === true ? 'Active' : 'In-Active'}</Typography>
    </Box>
  );
};

export const SuperAdmin = (props: SuperAdminProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    getOrganisationList,
    getServiceList,
    ServiceList,
    createEditOrganisation,
    seteditOrganisation,
    clearAll,
    createOrganisation,
    OrganisationList,
    editGetDataOrganisation,
    getAllUserList,
    UserListMaster,
    deleteOrganisation,
    editOrganisation,
    getStatusList,
  } = useSuperAdminLanding();

  const { getOrganisationMaster, OrganisationListMaster, seteditOrganisationDetails } = useAdminLanding();

  const navigate = useNavigate();

  // const filteredMessageGroup = OrganisationList.filter(
  //   (x: any) => x.organisationTitle?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  // );
  const filteredMessageGroup = OrganisationList.filter(
    (x) => x.organisationTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  ).map((v) => {
    const handleSwitch = (id: any, data: any, e: any) => {
      debugger;
      e.stopPropagation();
      e.preventDefault();
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
    const customObj = {
      is_active: <CustomSwitch onChange={(checked) => handleSwitch(v.id, v, checked)} checked={v.is_active} />,
    };

    return {
      ...v,
      ...customObj,
    };
  });
  const handleTableEdit = (id: string, data: any, e: any) => {
    editGetDataOrganisation(id);
    handleDrawerOpen();
    e.preventDefault();
    e.stopPropagation();
    // console.log('');
  };
  const onRowClick = (data: any, e: any) => {
    debugger;
    console.log(data.id, 'id');
    const foundObject = OrganisationListMaster?.filter((item: any) => item.id === data.id);
    const handleChangeOrganisationkey = (key: string, value: string | number) => {
      seteditOrganisationDetails({ key, value });
    };
    foundObject?.forEach((x: any) => {
      handleChangeOrganisationkey('id', x.id);
      handleChangeOrganisationkey('name', x.name);
      handleChangeOrganisationkey('rolename', x.rolename);
    });
    navigate(webRoutes.admin);
    console.log(foundObject, ' hkajdshkaj');
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTableDelete = (id: string, data: any, e: any) => {
    deleteOrganisation(id);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleChange = (key: string, value: any) => {
    debugger;
    seteditOrganisation({ key, value });
  };

  const handleSave = () => {
    createEditOrganisation.id ? editOrganisation() : createOrganisation();
    handleDrawerClose();
    // clearAll
  };

  const handleDrawerClose = () => {
    setOpen(false);
    clearAll();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    getOrganisationList();
    getServiceList();
    getAllUserList();
    getOrganisationMaster();
  }, []);
  const handleStatus = () => {
    if (OrganisationList?.length > 0) {
      const status = OrganisationList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };
  useEffect(() => {
    handleStatus();
  }, [OrganisationList]);
  return (
    <Box
      sx={[
        {
          ...superAdminStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={superAdminStyle.commonTable}>
        <CommonTable
          onRowClick={(data: any, e: any) => {
            onRowClick(data, e);
            e.preventDefault();
            e.stopPropagation();
          }}
          Header={Header}
          dataList={filteredMessageGroup}
          tableData={tableData(handleTableEdit, handleTableDelete)}
          // switchList={switchList}
          // handleSwitch={handleSwitch}
          headerOptions={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#818181',
            bgColor: '#EAEAEA',
            borderBottom: '0px',
            // width: '100%',
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
                buttonName={'Add Organisation'}
                tableHeader={'Organisation'}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                isBtnRequired={true}
                handleOpen={handleDrawerOpen}
                // editTableMessage={addRole}
              />
            ),
          }}
        />
      </Box>
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '20px', pb: '50px' }}
        drawerRightClose
        header={createEditOrganisation.id ? 'Edit Organisation' : 'Add New Organisation'}
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
            checked={createEditOrganisation.is_active}
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
        <SuperAdminForm
          ServiceMaster={ServiceList}
          createEditOrganisation={createEditOrganisation}
          handleChange={handleChange}
          userMaster={UserListMaster}
        />
      </Drawer>
    </Box>
  );
};
