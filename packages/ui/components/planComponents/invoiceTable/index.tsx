import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from "@crayond_dev/ui_table";

import { invoiceTableStyle } from './style';
import { Header, tableData, tableJson } from './utils';

export interface InvoiceTableProps {
  className?: string;
  sx?: SxProps<Theme>;
  onClick?: any;
  TicketSubscription?: any;
}

export const InvoiceTable = (props: InvoiceTableProps): JSX.Element => {
  const { className = '', sx = {}, onClick, TicketSubscription, ...rest } = props;

  const handletableLink = (id: string) => {
    console.log(TicketSubscription, '////');
    onClick();
  };
  const handletableDownload = (id: string) => {
    console.log('////');
  };

  // const tableData = () => {};

  return (
    <Box
      sx={[
        {
          ...invoiceTableStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={invoiceTableStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={TicketSubscription}
          tableData={tableData(handletableLink, handletableDownload)}
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
