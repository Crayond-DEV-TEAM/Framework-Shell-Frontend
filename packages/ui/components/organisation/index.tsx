import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';

import { organisationStyle } from './style';
import { useEffect, useState } from 'react';
import { OrganisationForm, TableHeader } from '..';
import { Header, tableData } from './utills';
import { useOrganisation } from '@core/store';
import { Drawer } from '@atoms/drawer';
import { FooterComponent } from '@atoms/footerComponent';

export interface OrganisationProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Organisation = (props: OrganisationProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [switchList, setSwitchList] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const {
    getOrganisationList,
    OrganisationList,
    createEditOrganisation,
    seteditOrganisation,
    createOrganisation,
    clearAll,
    updateEditData,
    editOrganisation,
    deleteOrganisation,
    getStatusList,
  } = useOrganisation();

  // const filteredMessageGroup = OrganisationList?.filter((x: any) =>
  //   x.organisationName?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  // );

  const handlechange = (key: string, value: number | string) => {
    seteditOrganisation({ key, value });
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    setOpen(true);
    const editData = {
      id: id,
      organisationName: data.organisationName,
      description: data.description,
      is_active: data.is_active,
      emailId: data.email,
      mobile: data.mobileNumber,
      domainUrl: data.domain,
      address: data.data.address,
    };
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    deleteOrganisation(id);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    clearAll();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleSave = () => {
    if (createEditOrganisation.id) {
      editOrganisation();
    } else {
      createOrganisation();
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
      // console.log(id);
      getStatusList(id, true);
    } else {
      // console.log(id);
      getStatusList(id, false);
    }
  };
  const handleStatus = () => {
    if (OrganisationList?.length > 0) {
      const status = OrganisationList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    getOrganisationList();
  }, []);
  useEffect(() => {
    handleStatus();
  }, [OrganisationList]);

  console.log(OrganisationList, 'OrganisationListOrganisationList');
  return (
    <Box
      sx={[
        {
          ...organisationStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={organisationStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={OrganisationList}
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
        drawerStyleSX={{ padding: '20px', marginBottom: '50px' }}
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
            width: '370px',
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
              handlechange('is_active', e.target.checked);
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
        <OrganisationForm createEditOrganisation={createEditOrganisation} handlechange={handlechange} />
      </Drawer>
    </Box>
  );
};