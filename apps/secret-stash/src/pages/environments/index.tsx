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
import { useServices, useKeys, useEnvironment } from '@core/store';
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
    // servicefetching,
    errorOnServiceFetching,
    getServices,
    handleServiceClick,
    setHandleServices,
    addServices,
    onEditServices,
    handleServiceDrawerOpen,
    handleServiceDrawerClose,
    onSaveServices
  } = useServices();

  const {
    environment,
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
    onSaveEnvironment
  } = useEnvironment();

  const {
    keys,
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
    onSaveKeys
  } = useKeys();

  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  // const handleClose = () => setOpen(false);

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
  console.log(editKey, 'editKey');

  const handleTableDelete = () => {};

  const saveFn = async (key: string) => {
    debugger;
    onSave(key);
  };

  const handleVisibility = (e: any, index: number) => {
    debugger;
    setIsVisible(!isVisible);
  };

  const listingAPIs= async () =>{
    await getServices()
    await getEnvironment(services?.[0]?.slug)
    await getKeys(environment?.[0]?.name ,services?.[0]?.slug)
    
  }

  console.log(selectedTab , "selected====")
  console.log(slugIndex , "selected====")

  useEffect(() => {
    listingAPIs()
  }, []);

  return (
    <Box sx={EnvironmentsStyle.rootSx}>
      <Grid container display="flex" sx={EnvironmentsStyle.totalTableSx} spacing={3}>
        {/* Message Group */}
        <Grid item xs={12} sm={4} md={2.25}>
          <ServicesListing
            services={services}
            handleOpen={() => handleServiceDrawerOpen('')}
            handleServiceClick={handleServiceClick}
            searchTerm={searchTerm}
            // fetching={Servicefetching}
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
              <Button onClick={() => handleEnvironmentDrawerOpen('')} sx={EnvironmentsStyle.addEnvironmentSx}>
                {'Add Environment'}
              </Button>
              <SingleFileComponent
                handleChange={(e) =>
                  handleUploadFile(
                    e,
                    services?.[slugIndex]?.slug,
                    environment?.[selectedTab]?.name,
                  )
                }
              />
            </Stack>
            <EnvironmentTabs
              // handleAddEnvironment={handleDrawerOpen}
              // handleEnvironmentClose={handleDrawerClose}
              // handleTabEdit={components(false)[0]?.fn}
              onChange={tabOnChange}
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
                    tableHeader={'Keys'}
                    isShowValue={true}
                    handleVisibility={handleVisibility}
                    isVisible={isVisible}
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
      {/* add & edit services Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={open?.services}
        handleCloseDialog={() => handleServiceDrawerClose('services')}
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
            onSave={() => saveFn('services')}
            onCancel={handleServiceDrawerClose('')}
            // loading={addEnvironment}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />

      {/* add & edit environment Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={open?.environment}
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
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
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
        isDialogOpened={open?.key}
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
            checked={editEnvironment.isActive}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('isActive', e.target.checked)}
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
