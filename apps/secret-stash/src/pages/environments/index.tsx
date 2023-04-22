/* eslint-disable react/jsx-key */
import { EnvironmentTabs, ModalAddEnvironmentKey, ServicesListing, TableHeader } from '@core/ui/components';
import { Box, Grid, Stack, Typography } from '@mui/material';
// import { MessageTable } from '..';
import { useServices } from '@core/store';
import { dummyTableData } from '@core/store/utils';
import { Button, FooterComponent } from '@core/ui/atoms';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
import { CommonTable } from 'crayond-components-library-1';
import React, { useEffect, useState } from 'react';
import { EnvironmentsStyle } from './style';
import { Header, tableData } from './tableUtils';

export default function Environments() {
  const {
    getServices,
    getEnvironment,
    getKeys,
    editKey,
    addEnvironment,
    services,
    setHandleChangefn,
    editServices,
    handleEdit,
    environment,
    keys,
    handleChange,
    handleKeyChange,
    editEnvironment,
  } = useServices();

  console.log(editKey, 'editKey==');

  const [open, setOpen] = useState(false);
  const [secretStashOpen, setSecretStashOpen] = useState(false);
  const [addKey, setAddkey] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = React.useState(0);
  const [switchList, setSwitchList] = useState<any>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEnvironment = (addEnvironment: string) => {
    debugger;
    if (addEnvironment === 'environment') {
      setAddkey(false);
    } else {
      setAddkey(true);
    }

    // if (addEnvironment === 'key') {

    // }
    setSecretStashOpen(true);
  };

  const components = (editState: boolean) => [
    {
      title: 'services',
      edit: editState ? true : false,
      fn: (e: any) => handleAddEnvironment('services'),
    },
    {
      title: 'environment',
      edit: editState ? true : false,
      fn: (e: any) => handleAddEnvironment('environment'),
    },
    {
      title: 'key',
      edit: editState ? true : false,
      fn: (e: any) => handleAddEnvironment('key'),
    },
  ];

  const handleEnvironmentClose = (addEnvironment: string) => {
    if (addEnvironment) {
      setSecretStashOpen(false);
    } else {
      setSecretStashOpen(false);
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const onChange = (e: any, i: any) => {
    // eslint-disable-next-line no-debugger
    debugger;
    setSelected(i);
  };

  const handleTabEdit = (event: any, e: string) => {
    // eslint-disable-next-line no-debugger
    debugger;
    handleAddEnvironment('addEnvironment');
    handleEdit(e);
  };

  const handleSwitch = (id: string, data: any, e: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
    if (e.target.checked) {
      console.log(id);
      // getStatus(id, true);
    } else {
      console.log(id);
      // getStatus(id, false);
    }
  };

  const handleTableEdit = (e: any) => {
    debugger;
    handleAddEnvironment('');
  };
  const handleTableDelete = () => {};

  const makeGetkeyRequest = (environment: string, slug: string) => {
    getKeys(environment, slug);
  };

  const makeGetEnvironmentRequest = async (slug: any) => {
    const environmentResponse = await getEnvironment(slug);
    makeGetkeyRequest(environmentResponse?.[0]?.name, slug);
  };

  const makeGetServicesRequest = async () => {
    const response = await getServices();
    makeGetEnvironmentRequest(response?.[0]?.slug);
  };

  const addEnvironmentFn = () => {
    debugger;
    addEnvironment(editKey?.key, services?.[0]?.slug);
  };

  useEffect(() => {
    makeGetServicesRequest();
    // getEnvironment(services?.[0]?.slug);
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={EnvironmentsStyle.rootSx}>
      <Grid container display="flex" sx={EnvironmentsStyle.totalTableSx} spacing={3}>
        {/* Message Group */}
        <Grid item xs={12} sm={4} md={2.25}>
          <ServicesListing
            services={services}
            // handleOpen={() => handleAddEnvironment('services')}
            handleOpen={components(false)[0]?.fn}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            environment={environment}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9.75}>
          <Box sx={EnvironmentsStyle.commonTable}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
              <Typography sx={EnvironmentsStyle.environmentHeading}>Environment</Typography>
              <Button onClick={components(false)[1]?.fn} sx={EnvironmentsStyle.addEnvironmentSx}>
                {'Add Environment'}
              </Button>
            </Stack>
            <EnvironmentTabs
              handleAddEnvironment={handleAddEnvironment}
              handleEnvironmentClose={handleEnvironmentClose}
              handleTabEdit={components(false)[0]?.fn}
              onChange={onChange}
              selected={selected}
              environments={environment}
            />

            <CommonTable
              Header={Header}
              dataList={keys}
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
                padding: '8px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              tableMinWidth={'1500px'}
              tableMinHeight={'20vh'}
              paddingAll={'0px'}
              marginAll={'16px 0px 0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    // filterContent={filterContent}
                    // filterChange={handleFilterChange}
                    // onChange={isEdit ? handleeditChange : handleAddChange}
                    // status={StatusList}
                    tableHeader={'Keys'}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open}
                    handleOpen={components(false)[2]?.fn}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    // onApply={onApply}
                    // editTableMessage={isEdit ? editMessageList : addMessageList}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* secret-stash add environment and key */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={secretStashOpen}
        handleCloseDialog={() => handleEnvironmentClose('')}
        title={addKey ? 'Add Key' : 'Add Environment'}
        Bodycomponent={
          addKey ? (
            <ModalAddEnvironmentKey
              handleChange={handleChange}
              title={'Name'}
              description={'Webhook Url'}
              groupState={editEnvironment}
            />
          ) : (
            <ModalAddEnvironmentKey
              groupState={editKey}
              handleChange={handleKeyChange}
              title={'Key'}
              description={'Value'}
            />
          )
        }
        Footercomponent={
          <FooterComponent
            check
            checked={editEnvironment.isActive}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => {
              debugger;
              addEnvironmentFn();
            }}
            onCancel={handleClose}
            // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />
    </Box>
  );
}
function getKeys(environment: string, slug: string) {
  throw new Error('Function not implemented.');
}
