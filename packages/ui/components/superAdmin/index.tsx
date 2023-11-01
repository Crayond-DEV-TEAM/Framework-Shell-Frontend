import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { Drawer } from '@atoms/drawer';
import { AdminSecForm, SuperAdminForm, TableHeader } from '..';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Header, tableData, tableJson } from './utills';
import { useState } from 'react';
import { superAdminStyle } from './style';

export interface SuperAdminProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SuperAdmin = (props: SuperAdminProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [open, setOpen] = useState(false);

  const handleTableEdit = () => {
    console.log('');
  };
  const handleTableDelete = () => {
    console.log('');
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={[
        {
          ...superAdminStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={superAdminStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={tableJson}
          tableData={tableData(handleTableEdit, handleTableDelete)}
          // switchList={switchList}
          // handleSwitch={handleSwitch}
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
            stickyLeft: [],
            stickyRight: [],
          }}
          tableMinHeight={'calc(100vh - 308px)'}
          tableMaxHeight={'calc(100vh - 308px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          HeaderComponent={{
            variant: 'CUSTOM',
            component: (
              <TableHeader
                isFilterRequired={false}
                buttonName={'Add Organisation'}
                tableHeader={'Organisation'}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                isBtnRequired={true}
                handleOpen={handleDrawerOpen}
                // editTableMessage={addRole}
              />
            ),
          }}
        />
      </Box>
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '20px' }}
        drawerRightClose
        header={'Add New Organisation'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        rootStyle={{
          '& .MuiDrawer-paperAnchorRight': {
            width: '340px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
        }}
      >
        <SuperAdminForm />
      </Drawer>
    </Box>
  );
};
