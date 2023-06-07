import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';

import { adminTableStyle } from './style';
import { tableData, Header, tableJson } from './utils';

export interface AdminTableProps {
  className?: string;
  sx?: SxProps<Theme>;
  onEditChange?: any;
}

export const AdminTable = (props: AdminTableProps): JSX.Element => {
  const { className = '', sx = {}, onEditChange, ...rest } = props;
  const handleTableEdit = () => {
    onEditChange;
  };
  const handleTableDelete = () => {
    console.log('_');
  };
  const handleTablemore = () => {
    console.log('_');
  };

  return (
    <Box
      sx={[
        {
          ...adminTableStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={adminTableStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={tableJson}
          tableData={tableData(onEditChange, handleTableDelete, handleTablemore)}
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
            stickyLeft: ['checkbox'],
            stickyRight: ['is_active', 'action'],
          }}
          paginationOption={{
            isEnable: false,
            // rowPerPage: 5,
            // rowsPerPageOptions: [5, 10, 25],
          }}
          // tableMinHeight={'calc(100vh - 167px)'}
          // tableMaxHeight={'calc(100vh - 167px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
        />
      </Box>
    </Box>
  );
};
