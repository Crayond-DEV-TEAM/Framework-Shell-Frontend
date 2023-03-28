import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AddMessage, TableHeader } from '..';
import { forwardRef } from 'react';
import { useState } from 'react';
import { CommonTable } from 'crayond-components-library-1';
import { messageTableStyle } from './style';
import { useMessageGroup } from '@core/store';
import isEqual from 'react-fast-compare';

export interface MessageTableProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const MessageTable = forwardRef((props: MessageTableProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const { groupState, handleGroupChange, handleChipDelete } = useMessageGroup(
    (state) => ({
      groupState: state.groupState,
      handleChipDelete: state.handleChipDelete,
      handleGroupChange: state.handleGroupChange,
      loading: state.loading,
    }),
    (prev, curr) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );
  const { filterContent } = groupState;

  // General Hooks
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState([1, 2]);
  const [switchList, setSwitchList] = useState([1, 4]);
  const [headerSelect, setHederSelect] = useState('');
  const [headerCheckbox, setHederCheckbox] = useState(true);

  // CheckBox Change Func
  const checkboxHandleChange = (data: any) => {
    if (!selectedCheckbox.includes(data)) {
      setSelectedCheckbox([...selectedCheckbox, data]);
    } else {
      const index = selectedCheckbox.indexOf(data);
      if (index > -1) {
        selectedCheckbox.splice(index, 1);
        setSelectedCheckbox([...selectedCheckbox]);
      }
    }
  };

  const setHederSearch = (value: any) => {
    console.log('🚀 ~ file: App.tsx:31 ~ setHederSearch ~ value:', value);
  };
  const SelectAll = (data: any, isRestSet: any) => {
    if (!isRestSet) {
      setSelectedCheckbox([...data]);
      setIsSelectedAll(true);
    } else {
      setSelectedCheckbox([]);
      setIsSelectedAll(false);
    }
  };
  const handleSwitch = (id: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
  };

  const Header = [
    {
      id: 'reference_id',
      align: 'left',
      disablePadding: false,
      label: 'Reference ID',
    },
    {
      id: 'title',
      align: 'left',
      disablePadding: false,
      label: 'title',
    },
    {
      id: 'description',
      align: 'left',
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'Severity',
      align: 'left',
      disablePadding: false,
      label: 'Severity',
    },
    {
      id: 'Message_Group',
      align: 'center',
      disablePadding: false,
      label: 'Message Group',
    },
    {
      id: 'Languages_Configuried',
      align: 'left',
      disablePadding: false,
      label: 'Languages Configuried',
    },
    {
      id: 'Created_On',
      align: 'left',
      disablePadding: false,
      label: 'Created On',
    },
    {
      id: 'Modified_On',
      align: 'left',
      disablePadding: false,
      label: 'Modified On',
    },
    {
      id: 'Status',
      align: 'left',
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'action',
      align: 'left',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const dataList = [
    {
      reference_id: 'ID-201',
      title: 'Sign In',
      description: 'Quam vitae velit',
      Severity: {
        label: 'Alert',
        color: '#6F6F6F',
        bgColor: '#EAEAEA',
        // icon: <SmallNotificationIcon />,
      },
      Message_Group: '#SIgn In',

      Languages_Configuried: '3/5',
      Created_On: '2022-01-23T15:00:21.055Z',
      Modified_On: '2022-01-23T15:00:21.055Z',
      status: {
        label: 'Sent',
        icon: <Switch />,
      },
    },
    {
      reference_id: 'ID-201',
      title: 'Sign In',
      description: 'Quam vitae velit',
      Severity: {
        label: 'Alert',
        color: '#6F6F6F',
        bgColor: '#EAEAEA',
        // icon: <SmallNotificationIcon />,
      },
      Message_Group: '#SIgn In',

      Languages_Configuried: '3/5',
      Created_On: '2022-01-23T15:00:21.055Z',
      Modified_On: '2022-01-23T15:00:21.055Z',
      status: {
        label: 'Sent',
        icon: <Switch />,
      },
    },
    {
      reference_id: 'ID-201',
      title: 'Sign In',
      description: 'Quam vitae velit',
      Severity: {
        label: 'Alert',
        color: '#6F6F6F',
        bgColor: '#EAEAEA',
        // icon: <SmallNotificationIcon />,
      },
      Message_Group: '#SIgn In',

      Languages_Configuried: '3/5',
      Created_On: '2022-01-23T15:00:21.055Z',
      Modified_On: '2022-01-23T15:00:21.055Z',
      status: {
        label: 'Sent',
        icon: <Switch />,
      },
    },
    {
      reference_id: 'ID-201',
      title: 'Sign In',
      description: 'Quam vitae velit',
      Severity: {
        label: 'Alert',
        color: '#6F6F6F',
        bgColor: '#EAEAEA',
        // icon: <SmallNotificationIcon />,
      },
      Message_Group: '#SIgn In',

      Languages_Configuried: '3/5',
      Created_On: '2022-01-23T15:00:21.055Z',
      Modified_On: '2022-01-23T15:00:21.055Z',
      status: false,
    },
  ];

  const tableData = [
    { type: ['TEXT'], name: 'reference_id' },
    { type: ['TEXT'], name: 'title' },
    { type: ['TEXT'], name: 'description' },
    { type: ['LABEL'], name: 'Severity' },
    { type: ['TEXT'], name: 'Message_Group' },
    { type: ['TEXT'], name: 'Languages_Configuried' },
    { type: ['DATE'], name: 'Created_On', format: 'DD MMM hh:mm' },
    { type: ['DATE'], name: 'Modified_On', format: 'DD MMM hh:mm' },
    {
      type: ['SWITCH'],
      name: 'status',
      switchText: [{ lable_1: 'In Active', lable_2: 'Active' }],
    },
    {
      type: ['ACTION'],
      name: 'action',
      variant: 'EDIT_WITH_DELETE',
      editHandel: (id: any) => {
        console.log(id);
      },
      deleteHandel: (id: any) => {
        console.log(id);
      },
      editIcon: <EditIcon sx={{ color: '#5A5A5A', fontSize: '18px' }} />,
      deleteIcon: <DeleteIcon sx={{ color: '#FF4D4A', fontSize: '18px' }} />,
    },
  ];

  const [checkbox, setCheckbox] = useState(false);

  return (
    <Box
      sx={[
        {
          ...messageTableStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Grid container display="flex" sx={messageTableStyle.totalTableSx}>
        <Grid item xs={6} md={2}>
          <Box sx={messageTableStyle.addSx}>
            <AddMessage />
          </Box>
        </Grid>
        <Grid item xs={6} md={10}>
          <Box sx={messageTableStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={dataList}
              tableData={tableData}
              switchList={switchList}
              handleSwitch={handleSwitch}
              headerOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#818181',
                bgColor: '#EAEAEA',
                borderBottom: '0px',
                width: '100%',
              }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                bgColor: '#fff',
                borderBottom: '0px',
                padding: '8px',
              }}
              tableMinWidth={'1500px'}
              tableMinHeight={'561px'}
              paddingAll={'0px'}
              marginAll={'0px 0px 0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    filterContent={filterContent}
                    onChange={handleGroupChange}
                    handleChipDelete={handleChipDelete}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

MessageTable.displayName = 'MessageTable';
