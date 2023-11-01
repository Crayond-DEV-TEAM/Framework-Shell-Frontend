import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { serviceStyle } from './style';
import { Drawer } from '@atoms/drawer';
import { ServiceForm, TableHeader } from '..';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData } from './utills';
import { FooterComponent } from '@atoms/footerComponent';
import { useOrganisation, useService } from '@core/store';

export interface ServiceProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Service = (props: ServiceProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { getOrganisationList, OrganisationList } = useOrganisation();
  const {
    getServiceList,
    ServiceList,
    seteditService,
    createEditService,
    editService,
    deleteService,
    createService,
    clearAll,
    updateEditData,
    getStatusList,
    seteditOrganisationDetails,
    OrganisationDetails,
    updateEditOrganisationData,
  } = useService();

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState();
  const [switchList, setSwitchList] = useState<any>([]);
  const filteredMessageGroup = ServiceList.filter((x: any) =>
    x.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(ServiceList, '');

  const handleTableEdit = (id: string, data: any, e: any) => {
    setOpen(true);
    const editData = {
      id: id,
      serviceName: data.serviceName,
      description: data.description,
      is_active: data.is_active,
      organisationId: data.organisationId,
      gitUrl: data.giturl,
    };
    const organisationIdData = {
      id: data.organisationId,
    };
    updateEditOrganisationData(organisationIdData);
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    deleteService(id);
    console.log('');
  };
  const handleDrawerClose = () => {
    setOpen(false);
    clearAll();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    getServiceList(OrganisationDetails.id);
    getOrganisationList();
  }, []);
  useEffect(() => {
    getServiceList(OrganisationDetails.id);
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
  const handleChange = (key: string, value: string | number) => {
    seteditService({ key, value });
  };
  const handleSave = () => {
    if (createEditService.id) {
      editService();
    } else {
      createService();
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
    if (ServiceList?.length > 0) {
      const status = ServiceList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };
  const handleChangeOrganisationkey = (key: string, value: string | number) => {
    seteditOrganisationDetails({ key, value });
  };

  const handleChangeOrganisation = (value: any) => {
    handleChangeOrganisationkey('id', value.id);
    handleChangeOrganisationkey('name', value.name);
  };

  useEffect(() => {
    handleStatus();
  }, [ServiceList]);

  useEffect(() => {
    optionList();
  }, [OrganisationList]);

  return (
    <Box
      sx={[
        {
          ...serviceStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IdmBackgroundCard
        title="Organisation"
        subTitle="Services"
        optionList={option}
        handleChangeDropDown={handleChangeOrganisation}
        createEditState={OrganisationDetails}
        content={
          <Box sx={serviceStyle.commonTable}>
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
                    buttonName={'Add Services'}
                    tableHeader={'Services'}
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
        header={createEditService.id ? 'Edit Service' : 'Add New Service'}
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
            checked={createEditService.is_active}
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
        <ServiceForm createEditService={createEditService} handlechange={handleChange} />
      </Drawer>
    </Box>
  );
};
