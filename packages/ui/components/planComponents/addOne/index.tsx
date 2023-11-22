import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from "@crayond_dev/ui_table";

import { addOneStyle } from './style';
import { AddOnContent } from '..';
import { useState, useEffect } from 'react';
import { Header, tableData, tableJson } from './utills';
import { FooterComponent } from '@atoms/footerComponent';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { useAddOns, useFeatureGroup } from '@core/store';
import { DeleteComponent, TableHeader } from '@components/commonComponents'

export interface AddOneProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AddOne = (props: AddOneProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const {
    getAddOnsList,
    AddOnsList,
    createAddOns,
    createEditAddOns,
    setAddOnsList,
    editAddOns,
    deleteAddOns,
    getStatusList,
    updateEditData,
    clearAll,
    addsave,
    editsave,
    deletefetch,
  } = useAddOns();
  const { FeatureGroupList, getFeatureGroupList } = useFeatureGroup();
  const [values, setValues] = useState(false);
  const [editname, setEditname] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [delid, setDelId] = useState('');
  const [del, setDel] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const filteredMessageGroup = AddOnsList.filter((x: any) => x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()));

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditAddOns.name.trim().length === 0) {
      errors.name = 'FeatureGroup name is required';
    }

    if (createEditAddOns.description.trim().length === 0) {
      errors.description = 'Description is required';
    }
    if (!createEditAddOns.features || Object.keys(createEditAddOns.features).length === 0) {
      errors.features = 'Feature is required';
    }
    if (!createEditAddOns.featuregroup || Object.keys(createEditAddOns.featuregroup).length === 0) {
      errors.featuregroup = 'Feature Group is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleCreateAddedit = (key: any, value: any) => {
    setAddOnsList(key, value);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    handleOpen();
    setEditname(true);
    const editData = {
      id: id,
      name: data.name,
      is_active: data.is_active,
      features: data.feature,
      description: data.description,
      featuregroup: data.featuregroup,
    };
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    setDel(true);
    setDelId(id);
  };

  const handleCreateAddon = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      createAddOns();
      setValues(false);
    }
  };
  const handleEditAddon = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editAddOns();
      setValues(false);
    }
  };

  const handleDeleteAddon = () => {
    deleteAddOns(delid);
    setDel(false);
  };

  const onClose = () => {
    setDel(false);
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
      console.log(id);
      getStatusList(id, true);
    } else {
      console.log(id);
      getStatusList(id, false);
    }
  };
  const addHandle = () => {
    handleOpen();
    setEditname(false);
  };

  const handleOpen = () => {
    setValues(true);
  };
  const handleClose = () => {
    clearAll();
    setFormErrors({});
    setValues(false);
  };
  const handleStatus = () => {
    if (AddOnsList?.length > 0) {
      const status = AddOnsList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    getAddOnsList();
    getFeatureGroupList();
  }, []);
  useEffect(() => {
    handleStatus();
  }, [AddOnsList]);

  return (
    <Box
      sx={[
        {
          ...addOneStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Add-Ons'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={addHandle}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={addOneStyle.commonTable}>
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
          tableMinHeight={'calc(100vh - 167px)'}
          tableMaxHeight={'calc(100vh - 167px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          paginationOption={{
            isEnable: true,
            rowPerPage: 10,
            rowsPerPageOptions: [5, 10, 25]
          }}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={editname === true ? 'Edit add-on' : 'Create new add-on'}
        Bodycomponent={
          <AddOnContent
            options={FeatureGroupList}
            handleAddEditStateChange={handleCreateAddedit}
            createEditAddOns={createEditAddOns}
            formErrors={formErrors}
          />
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={addOneStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            check
            SwitchChange={(e) => {
              handleCreateAddedit('is_active', e.target.checked);
            }}
            disabled={editname === true ? editsave : addsave}
            checked={createEditAddOns.is_active}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onSave={editname === true ? handleEditAddon : handleCreateAddon}
            onCancel={handleClose}
          />
        }
      />
      <DeleteComponent openCommand={del} onCancel={onClose} disabled={deletefetch} onDelete={handleDeleteAddon} />
    </Box>
  );
};
