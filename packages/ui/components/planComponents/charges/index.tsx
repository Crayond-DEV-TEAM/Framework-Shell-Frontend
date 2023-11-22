import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Table as CommonTable } from "@crayond_dev/ui_table";

import { chargesStyle } from './style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Header, tableData, tableJson } from './utills';
import { FooterComponent } from '@atoms/footerComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { useCharges } from '@core/store';
import { DeleteComponent, TableHeader } from '@components/commonComponents'

export interface ChargesProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Charges = (props: ChargesProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const {
    getChargesList,
    getStatusList,
    createCharges,
    createEditCharges,
    updateEditData,
    ChargesList,
    setChargesList,
    deleteCharges,
    editCharges,
    addsave,
    editsave,
    deletefetch,
  } = useCharges();
  const [values, setValues] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [savedes, setSavedes] = useState(false);
  const [del, setDel] = useState(false);
  const [delId, setDelId] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const filteredMessageGroup = ChargesList.filter((x: any) =>
    x.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditCharges.name.trim().length === 0) {
      errors.name = 'Charge name is required';
    }
    if ((createEditCharges.description ?? '').trim().length === 0) {
      errors.description = 'Description is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddEditStateChange = (key: any, value: any) => {
    setChargesList(key, value);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    handleOpen();
    setSavedes(true);
    const editData = {
      id: id,
      name: data.name,
      description: data.description,
      is_active: data.is_active,
    };
    updateEditData(editData);
  };
  const handleTableDelete = (id: string) => {
    setDel(true);
    setDelId(id);
  };

  const handleChargecreate = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      createCharges();
      setValues(false);
    }
  };
  const handleChargeedit = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editCharges();
      setValues(false);
    }
  };
  const handleChargedelete = () => {
    deleteCharges(delId);
    setDel(false);
  };
  const onCancel = () => {
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
      // console.log(id);
      getStatusList(id, true);
    } else {
      // console.log(id);
      getStatusList(id, false);
    }
  };
  const handleStatus = () => {
    if (ChargesList?.length > 0) {
      const status = ChargesList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  const handleSave = () => {
    handleOpen();
    setSavedes(false);
  };

  const handleOpen = () => {
    setValues(true);
  };
  const handleClose = () => {
    setValues(false);
    setFormErrors({});
  };
  useEffect(() => {
    getChargesList();
  }, []);
  useEffect(() => {
    handleStatus();
  }, [ChargesList]);

  return (
    <Box
      sx={[
        {
          ...chargesStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Charges'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleSave}
        // editTableMessage={createEditCharges}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={chargesStyle.commonTable}>
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
        title={savedes === true ? 'Edit charge' : 'Create new charge'}
        Bodycomponent={
          <Box sx={chargesStyle.padd}>
            <Box sx={chargesStyle.inputGroupSx}>
              <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
                Charges Name
              </Label>
              <Input
                size="small"
                placeholder="Charge name"
                required
                value={createEditCharges?.name}
                textFieldStyle={chargesStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleAddEditStateChange('name', e.target.value)
                }
                isError={Boolean(formErrors.name)}
                errorMessage={formErrors.name}
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={chargesStyle.inputGroupSx}>
              <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
                Description
              </Label>
              <Input
                size="small"
                // placeholder="Description"
                required
                rows={3}
                rowsMax={6}
                isMulti={true}
                value={createEditCharges?.description}
                textFieldStyle={chargesStyle.inputBigSx}
                id="description"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleAddEditStateChange('description', e.target.value)
                }
                isError={Boolean(formErrors.description)}
                errorMessage={formErrors.description}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={chargesStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            check
            SwitchChange={(e) => {
              handleAddEditStateChange('is_active', e.target.checked);
            }}
            disabled={savedes === true ? editsave : addsave}
            checked={createEditCharges.is_active}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handleClose}
            onSave={savedes === true ? handleChargeedit : handleChargecreate}
          />
        }
      />
      <DeleteComponent openCommand={del} onCancel={onCancel} disabled={deletefetch} onDelete={handleChargedelete} />
    </Box>
  );
};
