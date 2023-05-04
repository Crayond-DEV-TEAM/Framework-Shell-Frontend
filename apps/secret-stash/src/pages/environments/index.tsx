/* eslint-disable react/jsx-key */
import { EnvironmentTabs, ModalAddEnvironmentKey, ServicesListing, TableHeader } from '@core/ui/components';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useServices, useEnvironment, useKeys } from '@core/store';
import { dummyTableData } from '@core/store/utils';
import { Button, FooterComponent } from '@core/ui/atoms';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
import { CommonTable } from 'crayond-components-library-1';
import React, { useEffect, useState } from 'react';
import { EnvironmentsStyle } from './style';
import { Header, tableData } from './tableUtils';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

export default function Environments() {
  const [searchParams] = useSearchParams();
  const slugId = searchParams.get('slugId');
  const envId = searchParams.get('envId');

  const {
    serviceOpen,
    slugIndex,
    services,
    editServices,
    isEditService,
    servicefetching,
    offset,
    errorOnServiceFetching,
    getServices,
    handleServiceClick,
    setHandleServices,
    addServices,
    onEditServices,
    handleServiceDrawerOpen,
    handleServiceDrawerClose,
    onSaveServices,
    editLoadingService,
    addLoadingService,
    fetchMoreData,
    HandleDeleteServiceAPI,
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
    environmentFetching,
    handleEnvironmentDrawerClose,
    onSaveEnvironment,
    handleTabEdit,
    handleDeleteEnv,
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
    handleDownloadEnv,
    handleKeyDrawerOpen,
    handleKeyDrawerClose,
    onSaveKeys,
    downloadTextAsFile,
    handleDeleteKey,
  } = useKeys();

  console.log(addLoadingService, 'addLoadingService');


  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(false);
  const [switchList, setSwitchList] = useState<any>([]);
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const saveFn = async (key: string) => {
    if (key === 'services') {
      onSaveServices(key);
    } else if (key === 'environment') {
      const envRes = await onSaveEnvironment(editEnvironment?.data, services?.data?.[slugIndex]?.slug);
      if (envRes?.length > 0) {
        navigate({
          pathname: '/environment',
          search: createSearchParams({
            slugId: envRes?.[0]?.slug,
            envId: envRes?.[0]?.id,
          }).toString(),
        });
      }
    } else {
      console.log('err');
      onSaveKeys(editKey?.data, services?.data?.[slugIndex]?.slug, environment?.data?.[selectedTab]);
    }
  };
  console.log(environment?.data?.[selectedTab], '1234567');

  const handleUpload = async (e: any) => {
    await handleUploadFile(e, services?.data?.[slugIndex]?.slug, environment?.data?.[selectedTab]?.name);
    await getKeys(environment?.data?.[selectedTab], environment?.data?.[selectedTab]?.slug);
  };

  const handleDownload = async () => {
    const fileResponse = await handleDownloadEnv(environment?.data?.[selectedTab]?.slug, environment?.data?.[selectedTab]?.name);
    const filename = `${services?.data?.[slugIndex]?.name}_${environment?.data?.[selectedTab]?.name}.env`;
    downloadTextAsFile(fileResponse, filename);
  };
  const makeGetEnvironmentRequest = async (slug: string) => {
    const environmentRes = await getEnvironment(slug);
    console.log(environmentRes?.[selectedTab]?.name, 'environmentRes?.[selectedTab]?.name');
    await getKeys(environmentRes?.[selectedTab], slug);
    return environmentRes;
  };

  const listingAPIs = async (val: any) => {
    const getEnvironmentRes = await makeGetEnvironmentRequest(val);
    return { getEnvironmentRes };
  };

  const handleOnClick = async (e: any, i: number) => {
    handleServiceClick(e, i);
    const res = await makeGetEnvironmentRequest(services?.data?.[i]?.slug);
    navigate({
      pathname: '/environment',
      search: createSearchParams({
        slugId: e?.id,
        envId: res?.[0]?.id,
      }).toString(),
    });
  };

  const handleTabClick = async (e: any, i: number) => {
    tabOnChange(i);
    // navigate(`/environment?slugId=${slugId}&envId=${e?.id}`)
    navigate({
      pathname: '/environment',
      search: createSearchParams({
        slugId: slugId ?? '',
        envId: e?.id ?? '',
      }).toString(),
    });
    await getKeys(environment?.data?.[i], environment?.data?.[i]?.slug);
  };
  const HandleDeleteService = async (i: string) => {
    await HandleDeleteServiceAPI(i);
    await getServices(offset);
  };

  const handleDelete = async (i: string) => {
    await handleDeleteKey(i);
    await getKeys(environment?.data?.[selectedTab], environment?.data?.[selectedTab]?.slug);
  };
  const handleOpen = () => {
    setSelected(true);
    // setIsEdit(false);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };
  const handleDeleteEnvFn = async (e: object) => {
    handleDeleteEnv(e);
    await makeGetEnvironmentRequest(services?.data?.[slugIndex]?.slug);
    handlemodalClose();
  };

  useEffect(() => {
    const APIfn = async () => {
      const getServicesRes = await getServices(offset);

      const res = getServicesRes.find((v: any) => v?.id === (slugId ?? getServicesRes?.[0]?.id));
      const { getEnvironmentRes } = await listingAPIs(res?.slug);

      navigate({
        pathname: '/environment',
        search: createSearchParams({
          slugId: slugId ?? getServicesRes?.[0]?.id,
          envId: envId ?? getEnvironmentRes?.[0]?.id,
        }).toString(),
      });
    };
    APIfn();
  }, []);
  console.log(editKey, 'LEYS=====');
  console.log(editEnvironment, 'editEnvironment=====');

  console.log(editServices, 'editServices=====');
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
            fetching={servicefetching}
            handleSearch={handleSearch}
            fetchMoreData={fetchMoreData}
            slugIndex={slugId}
            onEditServices={onEditServices}
            deleteService={HandleDeleteService}
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
              selectedId={envId}
              environments={environment?.data}
              fetching={environmentFetching}
              handleDeleteEnvFn={handleDeleteEnvFn}
              handlemodalClose={handlemodalClose}
              selected={selected}
              handleOpen={handleOpen}
            />
            <CommonTable
              Header={Header}
              dataList={keys?.data}
              tableData={tableData(handleTableEdit, handleDelete)}
              switchList={switchList}
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
                    buttonName={'Add Keys'}
                    tableHeader={'Keys'}
                    isFileUpload={true}
                    handleClick={handleDownload}
                    isDownloadRequired={true}
                    handleUploadFile={handleUpload}
                    isSearchRequired={false}
                    isFilterRequired={false}
                    open={open?.key}
                    // handleClose={handleClose}
                    handleOpen={() => handleKeyDrawerOpen('')}
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
        isDialogOpened={serviceOpen}
        handleCloseDialog={() => handleServiceDrawerClose('')}
        title={isEditService ? 'Edit Services' : 'Add Services'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            handleChange={setHandleServices}
            valueName={'name'}
            titlePlaceHolder={'Add Name'}
            descrPlaceHolder={'Add Repository Url'}
            webHookValueName={'repository_url'}
            value={editServices?.data?.name}
            webHookValue={editServices?.data?.repository_url}
            title={'Name'}
            addTitleErr={editServices?.data?.error?.name}
            addDescriptionErr={editServices?.data?.error?.repository_url}
            description={'Repository Url'}
            groupState={editServices?.data}
          />
        }
        Footercomponent={
          <FooterComponent
            onSave={() => saveFn('services')}
            onCancel={() => handleServiceDrawerClose('')}
            loading={isEditService ? editLoadingService : addLoadingService}
          />
        }
        rootStyle={{ padding: '0px important' }}
      />
      {console.log(editEnvironment?.data, '98765432')}

      {/* add & edit environment Drawer */}
      <DialogDrawer
        contentStyleSx={EnvironmentsStyle.contentSx}
        isDialogOpened={openEnvironment}
        handleCloseDialog={() => handleEnvironmentDrawerClose('')}
        title={isEditEnvironment ? 'Edit Environment' : 'Add Environment'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            groupState={editEnvironment?.data}
            addTitleErr={editEnvironment?.data?.error?.name}
            addDescriptionErr={editEnvironment?.data?.error?.webhook_url}
            titlePlaceHolder="Add Name"
            descrPlaceHolder="Add Webhook url"
            handleChange={handleChange}
            title={'Name'}
            valueName={'name'}
            webHookValueName={'webhook_url'}
            value={editEnvironment?.data?.name}
            webHookValue={editEnvironment?.data?.webhook_url}
            description={'Webhook Url'}
          />
        }
        Footercomponent={
          <FooterComponent
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
        title={isEditKey ? 'Edit Key' : 'Add Key'}
        Bodycomponent={
          <ModalAddEnvironmentKey
            addTitleErr={editKey?.data?.error?.name}
            addDescriptionErr={editKey?.data?.error?.value}
            groupState={editKey?.data}
            handleChange={handleKeyChange}
            titlePlaceHolder="Add Key"
            descrPlaceHolder="Add Value"
            title={'Key'}
            valueName={'name'}
            webHookValueName={'value'}
            value={editKey?.data?.name}
            webHookValue={editKey?.data?.value}
            description={'Value'}
          />
        }
        Footercomponent={
          <FooterComponent
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
