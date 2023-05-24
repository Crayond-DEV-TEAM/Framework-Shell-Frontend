import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { customerStyle } from './style';
import { TableHeader } from '..';
import { useEffect, useState } from 'react';
import { Header, tableData, tableJson } from './utils';
import { useCustomer } from '@core/store';

export interface CustomerProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Customer = (props: CustomerProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const { CustomerList } = useCustomer();
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);

  const filteredMessageGroup = tableJson.filter((x: any) =>
    x.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const handleTableDelete = (id: string) => {
    // debugger;
    // setSelected(true);
    // setidRole(id);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    // debugger;
    // setSelected(true);
    // setidRole(id);
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

  console.log(tableData, ' //////////////////////');

  return (
    <Box
      sx={[
        {
          ...customerStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        // isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Customers'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        // handleOpen={handleOpen}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={customerStyle.commonTable}>
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
    </Box>
  );
};
