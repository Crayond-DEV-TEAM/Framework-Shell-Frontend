import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminSectionStyle } from './style';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { AdminSecForm, TableHeader } from '..';
import { CommonTable } from 'crayond-components-library-1';
import { Header, tableData, tableJson } from './utills';
import { Drawer } from '@atoms/drawer';
import { useAdmin } from '@core/store';

export interface AdminSectionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AdminSection = (props: AdminSectionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { getAdminList, adminList, createEditAdmin } = useAdmin();

  const [searchTerm, setSearchTerm] = useState();
  const [open, setOpen] = useState(false);

  const handleTableEdit = () => {
    setOpen(true);
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

  useEffect(() => {
    getAdminList();
  }, []);

  return (
    <Box
      sx={[
        {
          ...adminSectionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IdmBackgroundCard
        title="Organisation"
        subTitle="Projects"
        content={
          <Box sx={adminSectionStyle.commonTable}>
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
                    buttonName={'Add Projects'}
                    tableHeader={'Projects'}
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
        }
      />
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '20px' }}
        drawerRightClose
        header={'Add New Project'}
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
        <AdminSecForm />
      </Drawer>
    </Box>
  );
};
