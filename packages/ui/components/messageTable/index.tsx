import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { AddMessage, AddMessageGroup, TableHeader } from '..';
import { forwardRef, useEffect } from 'react';
import { useState } from 'react';
import { messageTableStyle } from './style';
import { useAddGroup, useLanguage, useMessageGroup } from '@core/store';
import { CommonTable } from 'crayond-components-library-1';
import isEqual from 'react-fast-compare';
import { DeleteIcon, EditIcon } from '@atoms/icons';
import { FooterComponent } from '@atoms/footerComponent';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Button } from '@atoms/button';
import { DeleteDailog } from '@atoms/deletedailog';

export interface MessageTableProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const MessageTable = forwardRef((props: MessageTableProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const {
    groupState,
    getStatus,
    tableMessageData,
    handleStateChange,
    filterTableContent,
    clearfilter,
    getTable,
    addMessageTable,
    clearAddMessageState,
    handleGroupChange,
    tableEditMessage,
    handleChipDelete,
    updateStatusReport,
    getAllTableGroup,
    getSeverityDetails,
    updateErrorAddGroup,
    updateStateAddGroup,
    deleteTableMessage,
    loading,
  } = useMessageGroup(
    (state: any) => ({
      groupState: state.groupState,
      tableMessageData: state.tableMessageData,
      getSeverityDetails: state.getSeverityDetails,
      handleStateChange: state.handleStateChange,
      updateStatusReport: state.updateStatusReport,
      getStatus: state.getStatus,
      getTable: state.getTable,
      clearfilter: state.clearfilter,
      clearAddMessageState: state.clearAddMessageState,
      tableEditMessage: state.tableEditMessage,
      deleteTableMessage: state.deleteTableMessage,
      addMessageTable: state.addMessageTable,
      updateStateAddGroup: state.updateStateAddGroup,
      updateErrorAddGroup: state.updateErrorAddGroup,
      filterTableContent: state.filterTableContent,
      getAllTableGroup: state.getAllTableGroup,
      handleChipDelete: state.handleChipDelete,
      handleGroupChange: state.handleGroupChange,
      loading: state.loading,
    }),
    (prev: any, curr: any) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );

  const { status, editTableMessage, severtiy, language, setstatus } = groupState;

  const { getAllMessageGroup, messageId, messageName } = useAddGroup(
    (state) => ({
      messageId: state.messageId,
      messageName: state.messageName,
      clearAddgroupState: state.clearAddgroupState,
      getAllMessageGroup: state.getAllMessageGroup,
    }),
    (prev, curr) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );

  const { addedLangState, addedlanguagedisplay } = useLanguage((state) => ({
    addedLangState: state.addedLangState,
    addedlanguagedisplay: state.addedlanguagedisplay,
  }));

  const { filterContent } = groupState;

  // General Hooks
  const [switchList, setSwitchList] = useState(setstatus);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [messageGroupId, setMessageGroupId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [tableName, setTableName] = useState('');
  const [message, setMessage] = useState([]);
  const [delid, setDelid] = useState('');
  const [messageIds, setmessageIds] = useState('');
  const filteredMessageGroup = tableMessageData?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isValidToCreate = () => {
    let isValid = true;
    const error = editTableMessage?.error;

    // Checking addTitle
    if (editTableMessage?.title?.length === 0) {
      isValid = false;
      error.title = 'Title is required';
    } else {
      error.title = '';
    }

    // Checking addDescription
    if (editTableMessage?.description?.length === 0) {
      isValid = false;
      error.description = 'Description is required';
    } else {
      error.description = '';
    }

    updateErrorAddGroup(error);
    return isValid;
  };

  const changehandle = (key: any, value: any) => {
    handleStateChange(key, value);
  };

  const handleSwitch = (id: string, data: any, e: any) => {
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
      console.log(id);

      getStatus({ id, status: true });
    } else {
      console.log(id);

      getStatus({ id, status: false });
    }
    console.log(switchList);
  };

  const Header = [
    {
      id: 'reference_id',
      align: 'left',
      disablePadding: false,
      label: 'Reference ID',
      isSortable: false,
    },
    {
      id: 'title',
      align: 'left',
      disablePadding: false,
      label: 'Title',
      isSortable: true,
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
      id: 'updated_at',
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
      id: 'status',
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
    { type: ['DATE'], name: 'created_at', format: 'Do MMM,hh:mm A IST' },
    { type: ['DATE'], name: 'updated_at', format: 'Do MMM,hh:mm A IST' },
    {
      type: ['SWITCH'],
      name: 'status',
      switchText: [{ label_1: 'In Active', label_2: 'Active' }],
    },
    {
      type: ['ACTION'],
      name: 'action',
      variant: 'EDIT_WITH_DELETE',
      editHandel: async (id: any) => {
        const res = await getTable(id);
        setOpen(true);
        setIsEdit(true);
        // updateStatusReport(status);
      },
      deleteHandel: (id: any) => {
        setDelid(id);
        handlemodalOpen();
      },
      editIcon: <EditIcon />,
      deleteIcon: <DeleteIcon />,
    },
  ];

  const addMessageTableFun = async () => {
    debugger;
    if (isEdit && isValidToCreate()) {
      editTableMessage?.msg_grp_msg_data?.forEach((e: any, i: any) => (e.message = message[i]));
      await tableEditMessage(editTableMessage);
      setOpen(false);
      clearAddMessageState();
    } else if (isValidToCreate()) {
      const languagePayload = addedLangState?.map((e: any, i: any) => {
        return {
          configuration_id: e?.id,
          message: message[i],
        };
      });
      await addMessageTable(languagePayload, messageGroupId);
      setOpen(false);
      clearAddMessageState();
    }
    await getAllTableGroup(messageGroupId);
    await addedlanguagedisplay({});
  };

  const onMessageTable = async (key: any, value: string) => {
    const tableResponse = await getAllTableGroup(key?.id);
    setMessageGroupId(key?.id);
    setTableName(key?.title);
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
    clearfilter();
  };

  const initialData = async () => {
    if (messageId) {
      await getAllTableGroup(messageId);
      setMessageGroupId(messageId);
    }
    if (messageName) {
      setTableName(messageName);
    }
    await getSeverityDetails();
    getAllMessageGroup();
  };

  const handleOpen = async () => {
    await addedlanguagedisplay({});
    clearAddMessageState();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearAddMessageState();
  };

  const onChangeMessage = (key: any, i: any, SetLanguageState: any) => {
    SetLanguageState(key);
    const a: any = [...message];
    a[i] = key;
    setMessage(a);
  };

  const onDelete = () => {
    const msgId = tableMessageData
      ?.filter(({ msg_grp_msgs_Total }: any) => msg_grp_msgs_Total)
      .map(({ id }: any) => id);
    const messageId = msgId.map((id: any) => ({ id }));
    // setmessageIds(messageId);
    deleteTableMessage({ delid, messageId });
    getAllTableGroup(messageGroupId);
  };
  console.log(editTableMessage, 'delid');
  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };

  useEffect(() => {
    updateStateAddGroup();
    if (addedLangState) {
      addedlanguagedisplay({});
    }
  }, [addedLangState]);

  useEffect(() => {
    setTableName(messageName);
    setMessageGroupId(messageId);
    initialData();
  }, [messageId, messageName, messageGroupId]);

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
      <Grid container display="flex" sx={messageTableStyle.totalTableSx} spacing={3}>
        <Grid item xs={12} sm={4} md={2.25}>
          <Box sx={messageTableStyle.addSx}>
            <AddMessage onMessageTable={onMessageTable} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9.75}>
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
                padding: '6px 16px 6px 7px',
              }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                // bgColor: '#fff',
                borderBottom: '0px',
                padding: '8px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              tableMinWidth={'1500px'}
              tableMinHeight={'60vh'}
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
                    handleStateChange={changehandle}
                    options={severtiy}
                    status={status}
                    loading={loading}
                    open={open}
                    tableHeader={tableName}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isEdit={isEdit}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    language={language}
                    editTableMessage={editTableMessage}
                    addMessageTable={addMessageTableFun}
                    updateStatusReport={updateStatusReport}
                    onApply={onApply}
                    addedLangState={addedLangState}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <DeleteDailog
        isDialogOpened={selected}
        Bodycomponent={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this ??</Typography>
            <Box sx={messageTableStyle.totalFooterSx}>
              <Box sx={messageTableStyle.btnSx}>
                <Box sx={messageTableStyle.btnBg}>
                  <Button buttonStyle={messageTableStyle.cancelbtnText} onClick={handlemodalClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={messageTableStyle.savebtnBg}>
                  <Button buttonStyle={messageTableStyle.savebtnText} onClick={onDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />

      <DialogDrawer
        dialogRootStyle={{
          width: '832px',
          // height: '604px',
        }}
        contentStyleSx={messageTableStyle.contentSx}
        isDialogOpened={open}
        title={'Add New Message Group'}
        Bodycomponent={
          <AddMessageGroup
            handleChange={handleStateChange}
            updateStatusReport={updateStatusReport}
            groupState={editTableMessage}
            status={status}
            onChangeMessage={handleStateChange}
            isEdit={isEdit}
            options={severtiy}
            language={addedLangState}
          />
        }
        Footercomponent={
          <FooterComponent
            check={true}
            checked={editTableMessage?.isAddGroup}
            SwitchChange={(e: any) => handleStateChange('isAddGroup', e.target.checked)}
            onSave={addMessageTable}
            onCancel={handleClose}
            loading={loading}
          />
        }
        handleCloseDialog={handleClose}
        rootStyle={{ padding: '0px important' }}
      />
    </Box>
  );
});

MessageTable.displayName = 'MessageTable';
