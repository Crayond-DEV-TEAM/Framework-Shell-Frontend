import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { useState } from 'react';

import { featureGroupsStyle } from './style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Header, tableData, tableJson } from './utills';
import { FeatureGroupContent, TableHeader } from '..';
import { FooterComponent } from '@atoms/footerComponent';

export interface FeatureGroupsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const FeatureGroups = (props: FeatureGroupsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const [editData, setEditData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const filteredMessageGroup = tableJson.filter((x: any) =>
    x.featuregroup?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const handleTableEdit = () => {
    handleOpen();
    setEditData(true);
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

  const handleOpen = () => {
    setValues(true);
  };
  const handleClose = () => {
    setValues(false);
  };

  const addhandle =() => {
    handleOpen();
    setEditData(false);
  }

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
        title={editData === true ? 'Edit Feature group' : 'Create new Feature group'}
        Bodycomponent={<FeatureGroupContent />}
        handleCloseDialog={handleClose}
        dialogRootStyle={featureGroupsStyle.dialogSx}
        Footercomponent={
          <FooterComponent check saveButtonStyle={{ minWidth: '90px', height: '28px' }} onCancel={handleClose} />
        }
      />
    </Box>
  );
};
