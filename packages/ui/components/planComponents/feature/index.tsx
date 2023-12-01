import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { useEffect, useState } from 'react';
import { featureStyle } from './style';
import { Header, tableData, tableJson } from './utils';
import { FooterComponent } from '@atoms/footerComponent';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { useFeature, useSlug } from '@core/store';
import { DeleteComponent, TableHeader } from '@components/commonComponents';

export interface FeatureProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Feature = (props: FeatureProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const [del, setDel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [savedes, setSavedes] = useState(false);
  const [delid, setDelId] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const {
    FeatureList,
    getFeatureList,
    errorOnFetching,
    fetching,
    createEditFeature,
    editFeature,
    createFeature,
    deleteFeature,
    setFeatureList,
    updateEditData,
    clearAll,
    getStatusList,
    addsave,
    editsave,
    deletefetch,
  } = useFeature();
  const { slugs } = useSlug();
  const filteredMessageGroup = FeatureList.filter(
    (x: any) => x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditFeature.name.length === 0) {
      errors.name = 'Feature name is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handladdEditchange = (key: string, value: string | boolean) => {
    setFeatureList(key, value);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    handleOpen();
    setSavedes(true);
    const editData = {
      id: id,
      name: data.name,
      is_active: data.is_active,
    };
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    setDel(true);
    setDelId(id);
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
    if (FeatureList?.length > 0) {
      const status = FeatureList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  const onClose = () => {
    setDel(false);
  };
  const onDelete = () => {
    deleteFeature(delid);
    setDel(false);
  };
  const handleSave = () => {
    handleOpen();
    setSavedes(false);
  };

  const handleCreate = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      createFeature();
      setValues(false);
      clearAll();
    }
  };
  const handleEditFeature = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editFeature();
      setValues(false);
      clearAll();
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
  useEffect(() => {
    if (slugs?.PASM) {
      getFeatureList();
    }
  }, [slugs?.PASM]);

  useEffect(() => {
    handleStatus();
  }, [FeatureList]);

  return (
    <Box
      sx={[
        {
          ...featureStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Features'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleSave}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={featureStyle.commonTable}>
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
        title={savedes === true ? 'Edit Feature' : 'Create new Feature'}
        Bodycomponent={
          <Box sx={featureStyle.padd}>
            <Box sx={featureStyle.inputGroupSx}>
              <Label sx={featureStyle.labelSx} htmlFor="addTitle" isRequired>
                Add New Feature
              </Label>
              <Input
                size="small"
                placeholder="Feature name"
                required
                value={createEditFeature.name}
                textFieldStyle={featureStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handladdEditchange('name', e.target.value)
                }
                isError={Boolean(formErrors.name)}
                errorMessage={formErrors.name}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={featureStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            SwitchChange={(e) => {
              handladdEditchange('is_active', e.target.checked);
            }}
            checked={createEditFeature.is_active}
            disabled={savedes === true ? editsave : addsave}
            check
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handleClose}
            onSave={savedes === true ? handleEditFeature : handleCreate}
            // handleEditFeature
          />
        }
      />
      <DeleteComponent openCommand={del} onCancel={onClose} onDelete={onDelete} disabled={deletefetch} />
    </Box>
  );
};
