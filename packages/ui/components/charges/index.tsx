import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { CommonTable } from 'crayond-components-library-1';

import { chargesStyle } from './style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { TableHeader } from '..';
import { Header, tableData, tableJson } from './utills';
import { FooterComponent } from '@atoms/footerComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface ChargesProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Charges = (props: ChargesProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [savedes, setSavedes] = useState(false);
  const filteredMessageGroup = tableJson.filter((x: any) =>
    x.charges?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const handleTableEdit = () => {
    handleOpen();
    setSavedes(true);
  };
  const handleTableDelete = () => {
    console.log('///');
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
    // if (e.target.checked === true) {
    //   console.log(id);
    //   getStatusList(id, true);
    // } else {
    //   console.log(id);
    //   getStatusList(id, false);
    // }
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
  };

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
        // isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Charges'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleSave}
        // editTableMessage={addRole}
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
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={savedes === true ? 'Edit charge' : 'Create new charge'}
        Bodycomponent={
          <Box sx={chargesStyle.padd}>
            <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
              Add-on name
            </Label>
            <Input
              size="small"
              placeholder=" Add-on name"
              required
              // value={addOnContentStyle?.title}
              textFieldStyle={chargesStyle.inputSx}
              id="title"
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              //   handleAddEditStateChange('title', e.target.value)
              // }
              // isError={addEditMessageState?.error?.title ? true : false}
              // errorMessage={addEditMessageState?.error?.title ?? ''}
            />
            <Box sx={{ m: '16px' }} />
            <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
              Description
            </Label>
            <Input
              size="small"
              placeholder=""
              required
              // value={addOnContentStyle?.title}
              textFieldStyle={chargesStyle.inputBigSx}
              id="title"
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              //   handleAddEditStateChange('title', e.target.value)
              // }
              // isError={addEditMessageState?.error?.title ? true : false}
              // errorMessage={addEditMessageState?.error?.title ?? ''}
            />
          </Box>
        }
        handleCloseDialog={handleClose}
        dialogRootStyle={chargesStyle.dialogSx}
        Footercomponent={
          <FooterComponent check saveButtonStyle={{ minWidth: '90px', height: '28px' }} onCancel={handleClose} />
        }
      />
    </Box>
  );
};
