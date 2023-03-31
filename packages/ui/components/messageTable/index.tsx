import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { AddMessage, TableHeader } from '..';
import { forwardRef, useEffect } from 'react';
import { useState } from 'react';
import { messageTableStyle } from './style';
import { useMessageGroup } from '@core/store';
import { CommonTable } from 'crayond-components-library-1';
import isEqual from 'react-fast-compare';
import { DeleteIcon, EditIcon } from '@atoms/icons';

export interface MessageTableProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const MessageTable = forwardRef((props: MessageTableProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const {
    groupState,
    status,
    severtiy,
    addMessage,
    language,
    setstatus,
    messageGroup,
    editTableMessage,
    getStatus,
    tableMessageData,
    handleStateChange,
    filterTableContent,
    getTable,
    addMessageTable,
    handleGroupChange,
    tableEditMessage,
    handleChipDelete,
    getAllMessageGroup,
    updateStatusReport,
    getAllTableGroup,
    getSeverityDetails,
    deleteTableMessage,
  } = useMessageGroup(
    (state) => ({
      groupState: state.groupState,
      messageGroup: state.messageGroup,
      setstatus: state.setstatus,
      addMessage: state.addMessage,
      language: state.language,
      severtiy: state.severtiy,
      tableMessageData: state.tableMessageData,
      editTableMessage: state.editTableMessage,
      getSeverityDetails: state.getSeverityDetails,
      handleStateChange: state.handleStateChange,
      updateStatusReport: state.updateStatusReport,
      getStatus: state.getStatus,
      getTable: state.getTable,
      tableEditMessage: state.tableEditMessage,
      deleteTableMessage: state.deleteTableMessage,
      addMessageTable: state.addMessageTable,
      filterTableContent: state.filterTableContent,
      getAllTableGroup: state.getAllTableGroup,
      getAllMessageGroup: state.getAllMessageGroup,
      handleChipDelete: state.handleChipDelete,
      handleGroupChange: state.handleGroupChange,
      status: state.status,
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
  const [switchList, setSwitchList] = useState(setstatus);
  const [headerSelect, setHederSelect] = useState('');
  const [headerCheckbox, setHederCheckbox] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [messageGroupId, setMessageGroupId] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessageGroup = tableMessageData?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  const handleSwitch = (id: any, e: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
    if (e.target.checked) {
      getStatus({ id, status: true });
    } else {
      getStatus({ id, status: false });
    }
  };
  const statusdd = switchList.length > 0;

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
    // {
    //   id: 'Message_Group',
    //   align: 'center',
    //   disablePadding: false,
    //   label: 'Message Group',
    // },
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

  const tableData = [
    { type: ['TEXT'], name: 'id' },
    { type: ['TEXT'], name: 'title' },
    { type: ['TEXT'], name: 'description' },
    { type: ['LABEL'], name: 'severity' },
    // { type: ['TEXT'], name: 'Message_Group' },
    { type: ['TEXT'], name: 'msg_grp_msgs' },
    { type: ['DATE'], name: 'created_at', format: 'DD MMM hh:mm' },
    { type: ['DATE'], name: 'updated_at', format: 'DD MMM hh:mm' },
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
        getTable(id);
        setOpen(true);
      },
      deleteHandel: (id: any) => {
        const msgId = tableMessageData
          ?.filter(({ msg_grp_msgs_Total }: any) => msg_grp_msgs_Total)
          .map(({ id }: any) => id);
        const messageId = msgId.map((id: any) => ({ id }));
        deleteTableMessage({ id, messageId });
        getAllTableGroup(messageGroupId);
      },
      editIcon: <EditIcon />,
      deleteIcon: <DeleteIcon />,
    },
  ];

  const addMessageTableFun = async () => {
    if (isEdit) {
      await tableEditMessage(editTableMessage);
    } else {
      await addMessageTable();
    }
    setOpen(false);
    await getAllTableGroup(messageGroupId);
  };

  const onMessageTable = async (key: any, value: any) => {
    const tableResponse = await getAllTableGroup(key?.id);
    setMessageGroupId(key?.id);
  };

  const onApply = async () => {
    const FilterArray: any = [];
    if (Array.isArray(filterContent?.[0]?.children) && filterContent?.[0]?.children?.length > 0) {
      filterContent?.[0]?.children?.filter((val: any) => val?.value === true && FilterArray.push(val?.id));
    }
    let created = {
      from_date: '',
      end_date: '',
    };
    let updated = {
      from_date: '',
      end_date: '',
    };
    if (Array.isArray(filterContent?.[2]?.children) && filterContent?.[2]?.children?.length > 0) {
      if (
        filterContent?.[2]?.children?.filter((val: any) => val?.label === 'Created On' && val?.value === true)?.length >
        0
      ) {
        created = {
          from_date: filterContent?.[2]?.children?.[2]?.value ?? '',
          end_date: filterContent?.[2]?.children?.[3]?.value ?? '',
        };
      }
      if (
        filterContent?.[2]?.children?.filter((val: any) => val?.label === 'Modified On' && val?.value === true)
          ?.length > 0
      ) {
        updated = {
          from_date: filterContent?.[2]?.children?.[2]?.value ?? '',
          end_date: filterContent?.[2]?.children?.[3]?.value ?? '',
        };
      }
    }
    await filterTableContent(FilterArray, created, updated, messageGroupId);
  };

  const initialData = async () => {
    const response = await getAllMessageGroup();
    if (response?.[0]?.id) {
      await getAllTableGroup(response?.[0]?.id);
      setMessageGroupId(response?.[0]?.id);
    }
    await getSeverityDetails();
  };

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    if (tableMessageData) {
      setSwitchList(setstatus);
    }
  }, [tableMessageData]);
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
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={messageTableStyle.addSx}>
            <AddMessage onMessageTable={onMessageTable} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          <Box sx={messageTableStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={filteredMessageGroup}
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
              //tableMinHeight={'561px'}
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
                    handleStateChange={handleStateChange}
                    options={severtiy}
                    status={status}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    // openAddMessage={openAddMessage}
                    open={open}
                    setOpen={setOpen}
                    language={language}
                    editTableMessage={editTableMessage}
                    addMessageTable={addMessageTableFun}
                    updateStatusReport={updateStatusReport}
                    onApply={onApply}
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
