/* eslint-disable react/jsx-key */
import {
  EnvironmentTabs,
  ModalAddEnvironmentKey,
  ServicesListing,
  TableHeader,
  SingleFileComponent,
} from '@core/ui/components';
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
    createEnvironment,
    addServices,
    addKeys,
    services,
    editServices,
    handleEditKeysState,
    environment,
    keys,
    handleChange,
    setHandleServices,
    handleEditServicesState,
    editEnvironment,
    Servicefetching,
    editKeysAPI,
    clearAll,
    environmentFetching,
    handleKeyChange,
  } = useServices();

  const [open, setOpen] = useState({
    services: false,
    environment: false,
    key: false,
  });
  const [isEdit, setIsEdit] = useState({
    services: false,
    environment: false,
    key: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = React.useState(0);
  const [slugIndex, setSlugIndex] = React.useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  // const handleClose = () => setOpen(false);

  console.log(editKey, 'editKey==');

  const handleAddEnvironment = (addEnvironment: string) => {
    debugger;
    if (addEnvironment === 'services') {
      setOpen({
        ...open,
        services: true,
      });
    } else if (addEnvironment === 'environment') {
      setOpen({
        ...open,
        environment: true,
      });
    } else {
      setOpen({
        ...open,
        key: true,
      });
    }
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
    clearAll();
    if (addEnvironment === 'services') {
      setOpen({
        ...open,
        services: false,
      });
    } else if (addEnvironment === 'environment') {
      setOpen({
        ...open,
        environment: false,
      });
    } else {
      setOpen({
        ...open,
        key: false,
      });
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const onChange = (e: any, i: any) => {
    // eslint-disable-next-line no-debugger
    debugger;
    setSelected(i);
    console.log(slugIndex);

    makeGetkeyRequest(environment?.[i]?.name, services[slugIndex].slug);
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
  console.log(editKey, 'editKey');

  const handleTableEdit = (e: any) => {
    debugger;
    setIsEdit({
      ...isEdit,
      key: true,
    });
    const filterKey = keys.find((x) => x?.id === e);
    handleAddEnvironment('key');
    handleEditKeysState(filterKey);
  };
  const handleTableDelete = () => {};

  const makeGetkeyRequest = async (environment: string, slug: string) => {
    await getKeys(environment, slug);
  };

  const makeGetEnvironmentRequest = async (slug: any) => {
    const environmentResponse = await getEnvironment(slug);
    await makeGetkeyRequest(environmentResponse?.[0]?.name, slug);
  };

  const makeGetServicesRequest = async () => {
    const response = await getServices();
    await makeGetEnvironmentRequest(response?.[slugIndex]?.slug);
  };

  const onSave = async (key: string) => {
    debugger;
    if (key === 'services') {
      await addServices()
        .then(() => getServices())
        .catch(() => console.log('err'));
    } else if (key === 'environment') {
      if (isEdit.environment) {
        // await addEnvironment(editKey?.key, services?.[selected]?.slug);
        console.log('qwerty');
      } else {
        await createEnvironment(editEnvironment, services?.[selected]?.slug);
        await await getEnvironment(services?.[slugIndex]?.slug);
      }
    } else {
      if (isEdit.key) {
        await editKeysAPI(editKey, services?.[slugIndex]?.slug, environment?.[selected]?.name);
        await getKeys(environment?.[selected]?.name, services?.[slugIndex]?.slug);
      } else {
        await addKeys(editKey, services?.[slugIndex]?.slug, environment?.[selected]?.name);
        await getKeys(environment?.[selected]?.name, services?.[slugIndex]?.slug);
      }
    }
  };

  const handleServiceClick = async (e: any, index: number) => {
    debugger;
    setSlugIndex(index);
    await makeGetEnvironmentRequest(services?.[index]?.slug);
  };

  // edit services
  const onEditServices = (e: any, i: number) => {
    setIsEdit({
      ...isEdit,
      services: true,
    });
    handleAddEnvironment('services');
    debugger;
    handleEditServicesState(e);
  };

  const handleVisibility = (e: any, index: number) => {
    debugger;
    setIsVisible(!isVisible);
  };

  const handleUpload = () => {
    debugger;
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
            handleOpen={() => handleAddEnvironment('services')}
            handleServiceClick={handleServiceClick}
            searchTerm={searchTerm}
            fetching={Servicefetching}
            handleSearch={handleSearch}
            slugIndex={slugIndex}
            onEditServices={onEditServices}
            environment={environment}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9.75}>
          <Box sx={EnvironmentsStyle.commonTable}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
              <Typography sx={EnvironmentsStyle.environmentHeading}>Environment</Typography>
              <Button onClick={() => handleAddEnvironment('environment')} sx={EnvironmentsStyle.addEnvironmentSx}>
                {'Add Environment'}
              </Button>
              <SingleFileComponent />
            </Stack>
            <EnvironmentTabs
              handleAddEnvironment={handleAddEnvironment}
              handleEnvironmentClose={handleEnvironmentClose}
              handleTabEdit={components(false)[0]?.fn}
              onChange={onChange}
              selected={selected}
              environments={environment}
              fetching={environmentFetching}
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
              tableMinWidth={'1000px'}
              tableMinHeight={'40vh'}
              paddingAll={'0px'}
              marginAll={'16px 0px 0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    // filterContent={filterContent}
                    filterChange={() => handleUpload()}
                    // onChange={isEdit ? handleeditChange : handleAddChange}
                    // status={StatusList}
                    tableHeader={'Keys'}
                    isShowValue={true}
                    handleVisibility={handleVisibility}
                    isVisible={isVisible}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open?.key}
                    // handleClose={handleClose}
                    handleOpen={() => handleAddEnvironment('key')}

                    // onApply={onApply}
                    // editTableMessage={isEdit ? editMessageList : addMessageList}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* add & edit services Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={open?.services}
        handleCloseDialog={() => handleEnvironmentClose('services')}
        title={'Add Services'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            handleChange={setHandleServices}
            valueName={'name'}
            webHookValueName={'repository_url'}
            value={editServices?.data?.name}
            webHookValue={editServices?.data?.repository_url}
            title={'Name'}
            description={'Repository Url'}
            groupState={editServices?.data}
          />
        }
        Footercomponent={
          <FooterComponent
            check
            checked={editEnvironment.isActive}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => onSave('services')}
            // onCancel={handleEnvironmentClose('services')}
            // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />

      {/* add & edit environment Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={open?.environment}
        handleCloseDialog={() => handleEnvironmentClose('environment')}
        title={'Add Environment'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            groupState={editEnvironment}
            handleChange={handleChange}
            title={'Name'}
            valueName={'name'}
            webHookValueName={'webhook_url'}
            value={editEnvironment?.name}
            webHookValue={editEnvironment?.webhook_url}
            description={'Webhook Url'}
          />
        }
        Footercomponent={
          <FooterComponent
            check
            checked={editEnvironment.isActive}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => onSave('environment')}
            onCancel={() => handleEnvironmentClose('key')}
            // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />
      {/* add & edit key Drawer */}

      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={open?.key}
        handleCloseDialog={() => handleEnvironmentClose('key')}
        title={'Add Key'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            groupState={editKey}
            handleChange={handleKeyChange}
            title={'Key'}
            valueName={'name'}
            webHookValueName={'value'}
            value={editKey?.name}
            webHookValue={editKey?.value}
            description={'Value'}
          />
        }
        Footercomponent={
          <FooterComponent
            check
            checked={editEnvironment.isActive}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => onSave('key')}
            onCancel={() => handleEnvironmentClose('key')}
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
