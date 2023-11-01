import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminSectionStyle } from './style';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { AdminSecForm, TableHeader } from '..';
import { CommonTable } from 'crayond-components-library-1';
import { Header, tableData, tableJson } from './utills';
import { Drawer } from '@atoms/drawer';
import { useAdmin, useOrganisation } from '@core/store';
import { FooterComponent } from '@atoms/footerComponent';

export interface AdminSectionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AdminSection = (props: AdminSectionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const {
    getAdminList,
    adminList,
    createEditAdmin,
    OrganisationDetails,
    seteditOrganisationDetails,
    seteditAdmin,
    editAdmin,
    deleteAdmin,
    createAdmin,
    clearAll,
  } = useAdmin();
  const { getOrganisationList, OrganisationList } = useOrganisation();

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState();

  const filteredMessageGroup = adminList.filter((x: any) =>
    x.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTableEdit = () => {
    setOpen(true);
  };
  const handleTableDelete = (id: string) => {
    deleteAdmin(id);
    console.log('');
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleChange = (key: string, value: string | number) => {
    seteditAdmin({ key, value });
  };

  useEffect(() => {
    getAdminList(OrganisationDetails.id);
    getOrganisationList();
  }, []);
  useEffect(() => {
    getAdminList(OrganisationDetails.id);
  }, [OrganisationDetails]);
  const handleChangeOrganisationkey = (key: string, value: string | number) => {
    seteditOrganisationDetails({ key, value });
  };
  const handleChangeOrganisation = (value: any) => {
    handleChangeOrganisationkey('id', value.id);
    handleChangeOrganisationkey('name', value.name);
  };
  const handleSave = () => {
    if (createEditAdmin.id) {
      // editAdmin();
    } else {
      createAdmin();
    }
    setOpen(false);
    clearAll();
  };

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
  useEffect(() => {
    optionList();
  }, [OrganisationList]);

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
        optionList={option}
        handleChangeDropDown={handleChangeOrganisation}
        createEditState={OrganisationDetails}
        content={
          <Box sx={adminSectionStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={filteredMessageGroup}
              tableData={tableData(handleTableEdit, handleTableDelete)}
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
                    isBtnRequired={true}
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
        header={'Add New Project'}
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
