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
import { useServices, useEnvironment, useKeys } from '@core/store';
import { dummyTableData } from '@core/store/utils';
import { Button, FooterComponent } from '@core/ui/atoms';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
import { CommonTable } from 'crayond-components-library-1';
import React, { useEffect, useState } from 'react';
import { EnvironmentsStyle } from './style';
import { Header, tableData } from './tableUtils';

export default function Environments() {
  const {
    serviceOpen,
    slugIndex,
    services,
    editServices,
    isEditService,
    // servicefetching,
    errorOnServiceFetching,
    getServices,
    handleServiceClick,
    setHandleServices,
    addServices,
    onEditServices,
    handleServiceDrawerOpen,
    handleServiceDrawerClose,
    onSaveServices,
  } = useServices();

  const {
    environment,
    isEditEnvironment,
    editEnvironment,
    selectedTab,
    openEnvironment,
    getEnvironment,
    createEnvironment,
    handleChange,
    tabOnChange,
    handleEnvironmentDrawerOpen,
    // environmentFetching,
    handleEnvironmentDrawerClose,
    onSaveEnvironment,
    handleTabEdit,
  } = useEnvironment();

  const {
    keys,
    isEditKey,
    editKey,
    openKey,
    keyFetching,
    errorOnKeyFetching,
    getKeys,
    addKeys,
    editKeysAPI,
    handleKeyChange,
    handleTableEdit,
    handleUploadFile,
    handleKeyDrawerOpen,
    handleKeyDrawerClose,
    onSaveKeys,
  } = useKeys();

  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);

  // console.log(servicefetching, 'servicefetching==');

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
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
  // console.log(editKey, 'editKey');

  const handleTableDelete = () => { };

  const saveFn = async (key: string) => {
    debugger;
    if (key === 'services') {
      onSaveServices(key);
    } else if (key === 'environment') {
      onSaveEnvironment(editEnvironment, services?.data?.[slugIndex]?.slug);
    } else {
      console.log('err');
      onSaveKeys(editKey, services?.data?.[slugIndex]?.slug, environment?.[selectedTab]);
    }
  };

  const handleUpload = async (e: any) => {
    debugger;
    await handleUploadFile(e, services?.data?.[slugIndex]?.slug, environment?.[selectedTab]?.name)
    await getKeys(environmentRes?.[selectedTab]?.name, services?.data?.[slugIndex]?.slug);
  };

  const makeGetEnvironmentRequest = async (slug: string) => {
    debugger;
    const environmentRes = await getEnvironment(slug);
    console.log(environmentRes?.[selectedTab]?.name, 'environmentRes?.[selectedTab]?.name');

    await getKeys(environmentRes?.[selectedTab]?.name, slug);
  };

  const listingAPIs = async () => {
    // debugger;
    const getServicesRes = await getServices();
    await makeGetEnvironmentRequest(getServicesRes?.[slugIndex]?.slug);
  };

  const handleOnClick = async (e: any, i: number) => {
    debugger
    handleServiceClick(e, i);
    makeGetEnvironmentRequest(services?.data?.[i]?.slug);
  };

  const handleTabClick = async (e: any, i: number) => {
    debugger
    tabOnChange(i);
    await getKeys(environment?.[i], services?.data?.[slugIndex]?.slug);
    // await makeGetkeyRequest(environment?.[i]?.name, services[slugIndex].slug);

  }

  // console.log(selectedTab, 'selected====');
  console.log(openEnvironment, 'openEnvironment====');

  useEffect(() => {
    listingAPIs();
  }, []);

  return (
    <Box sx={EnvironmentsStyle.rootSx}>
      <Grid container display="flex" sx={EnvironmentsStyle.totalTableSx} spacing={3}>
        {/* Message Group */}
        <Grid item xs={12} sm={4} md={2.25}>
          <ServicesListing
            services={services?.data}
            handleOpen={() => handleServiceDrawerOpen('')}
            handleServiceClick={handleOnClick}
            searchTerm={searchTerm}
            // fetching={Servicefetching}
            handleSearch={handleSearch}
            slugIndex={slugIndex}
            onEditServices={onEditServices}

          // environment={environment}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9.75}>
          <Box sx={EnvironmentsStyle.commonTable}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
              <Typography sx={EnvironmentsStyle.environmentHeading}>Environment</Typography>
              <Button onClick={() => handleEnvironmentDrawerOpen('')} sx={EnvironmentsStyle.addEnvironmentSx}>
                {'Add Environment'}
              </Button>
            </Stack>
            <EnvironmentTabs
              // handleAddEnvironment={handleDrawerOpen}
              // handleEnvironmentClose={handleDrawerClose}
              handleTabEdit={handleTabEdit}
              onChange={handleTabClick}
              selected={selectedTab}
              environments={environment}
            // fetching={environmentFetching}
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
                    // filterChange={() => handleUpload()}
                    // onChange={isEdit ? handleeditChange : handleAddChange}
                    // status={StatusList}
                    buttonName={'Add Keys'}
                    tableHeader={'Keys'}
                    isShowValue={true}
                    handleUploadFile={handleUpload}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open?.key}
                    // handleClose={handleClose}
                    handleOpen={() => handleKeyDrawerOpen('')}

                  // onApply={onApply}
                  // editTableMessage={isEdit ? editMessageList : addMessageList}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {console.log(editEnvironment, 'serviceOpen')}
      {/* add & edit services Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={serviceOpen}
        handleCloseDialog={() => handleServiceDrawerClose('')}
        title={isEditService ? 'Edit key' : 'Add Keys'}
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
            // checked={editEnvironment.isActive}
            // SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => saveFn('services')}
            onCancel={handleServiceDrawerClose}
          // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />

      {/* add & edit environment Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={openEnvironment}
        handleCloseDialog={() => handleEnvironmentDrawerClose('')}
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
            // SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => saveFn('environment')}
            onCancel={() => handleEnvironmentDrawerClose('')}
          // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />
      {/* add & edit key Drawer */}

      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={openKey}
        handleCloseDialog={() => handleKeyDrawerClose('')}
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
            // checked={editEnvironment.isActive}
            // SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
            onSave={() => saveFn('key')}
            onCancel={() => handleKeyDrawerClose('')}
          // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />
    </Box>
  );
}
