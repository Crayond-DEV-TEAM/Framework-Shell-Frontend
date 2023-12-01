import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { useState, useEffect } from 'react';

import { featureGroupsStyle } from './style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Header, tableData, tableJson } from './utills';
import { FeatureGroupContent } from '..';
import { FooterComponent } from '@atoms/footerComponent';
import { useFeature, useFeatureGroup, useSlug } from '@core/store';
import { DeleteComponent, TableHeader } from '@components/commonComponents';

export interface FeatureGroupsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const FeatureGroups = (props: FeatureGroupsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const {
    getFeatureGroupList,
    FeatureGroupList,
    editFeatureGroup,
    createFeatureGroup,
    deleteFeatureGroup,
    getStatusList,
    clearAll,
    setFeatureGroupList,
    createEditFeatureGroup,
    updateEditData,
    addsave,
    editsave,
    deletefetch,
  } = useFeatureGroup();
  const { slugs } = useSlug();
  const { FeatureList, getFeatureList } = useFeature();
  const [values, setValues] = useState(false);
  const [editData, setEditData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [del, setDel] = useState(false);
  const [delId, setDelId] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const filteredMessageGroup = FeatureGroupList.filter(
    (x: any) => x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditFeatureGroup.name.trim().length === 0) {
      errors.name = 'FeatureGroup name is required';
    }

    if (createEditFeatureGroup.description.trim().length === 0) {
      errors.description = 'Description is required';
    }
    if (createEditFeatureGroup.features.length === 0) {
      errors.features = 'Feature is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddEditStateChange = (key: string, value: string | boolean) => {
    setFeatureGroupList(key, value);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    handleOpen();
    setEditData(true);
    const editData = {
      id: id,
      name: data.name,
      is_active: data.is_active,
      description: data.description,
      features: data.featureDetails,
      deletedFeature: data.featureDetails,
    };
    updateEditData(editData);
  };

  const handleTableDelete = (id: string) => {
    setDelId(id);
    setDel(true);
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

  const handleOpen = () => {
    setValues(true);
  };
  const handleClose = () => {
    setValues(false);
    setFormErrors({});
    clearAll();
  };
  const handleDeleteClose = () => {
    setDel(false);
  };

  const handleCreateFeatureGroup = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      createFeatureGroup();
      setValues(false);
    }
  };
  const handleEditFeatureGroup = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editFeatureGroup();
      setValues(false);
    }
  };
  const handleDeleteFeatureGroup = () => {
    deleteFeatureGroup(delId);
    setDel(false);
  };

  const addhandle = () => {
    handleOpen();
    setEditData(false);
  };
  const handleStatus = () => {
    if (FeatureGroupList?.length > 0) {
      const status = FeatureGroupList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    if (slugs?.PASM) {
      getFeatureGroupList();
      getFeatureList();
    }
  }, [slugs?.PASM]);

  useEffect(() => {
    handleStatus();
  }, [FeatureGroupList]);
  return (
    <Box
      sx={[
        {
          ...featureGroupsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Feature groups'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={addhandle}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={featureGroupsStyle.commonTable}>
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
            stickyLeft: ['checkbox'],
            stickyRight: ['is_active', 'action'],
          }}
          tableMinHeight={'calc(100vh - 232px)'}
          tableMaxHeight={'calc(100vh - 167px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          paginationOption={{
            isEnable: true,
            rowPerPage: 10,
            rowsPerPageOptions: [5, 10, 25],
          }}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={editData === true ? 'Edit Feature group' : 'Create new Feature group'}
        Bodycomponent={
          <FeatureGroupContent
            options={FeatureList}
            handleAddEditStateChange={handleAddEditStateChange}
            createEditFeatureGroup={createEditFeatureGroup}
            formErrors={formErrors}
          />
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={featureGroupsStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            check
            SwitchChange={(e) => {
              handleAddEditStateChange('is_active', e.target.checked);
            }}
            disabled={editData === true ? editsave : addsave}
            checked={createEditFeatureGroup.is_active}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handleClose}
            onSave={editData === true ? handleEditFeatureGroup : handleCreateFeatureGroup}
          />
        }
      />
      <DeleteComponent
        openCommand={del}
        disabled={deletefetch}
        onCancel={handleDeleteClose}
        onDelete={handleDeleteFeatureGroup}
      />
    </Box>
  );
};
