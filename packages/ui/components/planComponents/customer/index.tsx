import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { customerStyle } from './style';
import { useEffect, useState } from 'react';
import { Header, tableData, tableJson } from './utils';
import { useCustomer, useSlug } from '@core/store';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { DeleteComponent, TableHeader } from '@components/commonComponents';

export interface CustomerProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Customer = (props: CustomerProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const {
    CustomerList,
    getCustomerList,
    deleteCustomer,
    updateEditData,
    seteditadd,
    getStatusList,
    deletefetch,
    addsave,
    editsave,
  } = useCustomer();
  const { slugs } = useSlug();
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [del, setDel] = useState(false);
  const [deleteid, setDeleteid] = useState('');
  const navigate = useNavigate();
  const filteredMessageGroup = CustomerList.filter(
    (x: any) => x.customerName?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const handleTableDelete = (id: string) => {
    setDeleteid(id);
    setDel(true);
  };
  const onDelete = () => {
    deleteCustomer(deleteid);
    setDel(false);
  };

  const handleTableEdit = (id: string, data: any, e: any) => {
    const updateData = {
      name: data.customerName,
      email_id: data.email,
      contact_number: data.dataList.contactNumber,
      company_name: data.companyName,
      address_line: data.dataList.address.address_line,
      city: data.dataList.address.city,
      state: data.dataList.address.state,
      country: data.dataList.address.country,
      pincode: data.dataList.address.pincode,
      is_active: data.dataList.is_active,
      id: id,
      address_id: data.dataList.address.id,
    };
    updateEditData(updateData);
    seteditadd(true);
    // setSelected(true);
    // setidRole(id);
    navigate(planSubscriptionRoutes.createCustomer);
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
  const handleStatus = () => {
    if (CustomerList?.length > 0) {
      const status = CustomerList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };
  console.log(switchList, 'switchListswitchListswitchList');
  const handleOpen = () => {
    navigate(planSubscriptionRoutes.createCustomer);
    seteditadd(false);
  };
  const onClose = () => {
    seteditadd(false);
  };

  useEffect(() => {
    if (slugs?.PASM) {
      getCustomerList();
    }
  }, [slugs?.PASM]);

  useEffect(() => {
    handleStatus();
  }, [CustomerList]);

  console.log(CustomerList, '/////');

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
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Customers'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleOpen}
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
      <DeleteComponent openCommand={del} onCancel={onClose} onDelete={onDelete} disabled={deletefetch} />
    </Box>
  );
};
