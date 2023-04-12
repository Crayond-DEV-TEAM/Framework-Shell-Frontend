import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { AddMessage, TableHeader } from '..';
import { forwardRef, useEffect } from 'react';
import { useState } from 'react';
import { messageTableStyle } from './style';
import { useLanguageConfiguration, useLanguage, useMessageGroupDetails } from '@core/store';
import { CommonTable } from 'crayond-components-library-1';
import isEqual from 'react-fast-compare';
import { DeleteIcon, EditIcon } from '@atoms/icons';
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
    getMessageList,
    MessagesList,
    getStatus,
    StatusList,
    getServerity,
    SevorityList,
    deleteLoading,
    deleteMessage,
    errorOnDelete,
    setaddMessage,
    seteditMessage,
    setList,
    idList,
    addMessageList,
    editMessageList,
    editMessageTable,
    addMessageTable,
    editDisplayMessageTable,
    MessagesListStatus,
  } = useMessageGroupDetails();

  const { addedLangState, addedlanguagedisplay } = useLanguage((state) => ({
    addedLangState: state.addedLangState,
    addedlanguagedisplay: state.addedlanguagedisplay,
  }));
  const { languages, getSavedLanguage } = useLanguageConfiguration();

  // General Hooks
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableName, setTableName] = useState('');
  const [delid, setDelid] = useState('');
  const filteredMessageGroup = MessagesList.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // const filteredMessageGroupStatus = MessagesList.filter((x: any) => Boolean(x.status)).map(({ id }) => id);
  const [switchList, setSwitchList] = useState<any>([]);
  console.log(MessagesList, 'filteredMessageGroupStatus');

  useEffect(() => {
    setSwitchList(MessagesListStatus);
    console.log('f useEff', switchList);
  }, [MessagesListStatus]);

  const Header = [
    {
      id: 'reference_id',
      align: 'left',
      disablePadding: false,
      label: 'Reference ID',
      isSortable: true,
    },
    {
      id: 'title',
      align: 'left',
      disablePadding: false,
      label: 'Title',
      isSortable: true,
    },
    {
      id: 'Description',
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
        setOpen(true);
        setIsEdit(true);
        editDisplayMessageTable(id);
      },
      deleteHandel: (id: any) => {
        setDelid(id);
        handlemodalOpen();
      },
      editIcon: <EditIcon />,
      deleteIcon: <DeleteIcon />,
    },
  ];
  const handleDelFunc = () => {
    deleteMessage();
  };
  const handleChange = (key: any, value: string) => {
    setList({ key, value });
    setTableName(key.title);
    getMessageList();
  };

  const handleAddChange = (key: string, value: string) => {
    setaddMessage({ key, value });
    // addMessageList?.message;

    // debugger;

    // if (key === 'message') {
    //   const newMessageObject = { ...addMessageList?.message };

    //   newMessageObject[uniqueId] = value;

    //   setaddMessage({ key, value: newMessageObject });
    // } else {
    //   setaddMessage({ key, value });
    // }
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
      getStatus(id, true);
    } else {
      console.log(id);
      getStatus(id, false);
    }
  };

  const handleeditChange = (key: string, value: string) => {
    seteditMessage({ key, value });
  };

  const handleOpen = async () => {
    setOpen(true);
    getSavedLanguage();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };

  const handleSave = () => {
    addMessageTable();
    setOpen(false);
  };

  const handleEdit = () => {
    editMessageTable();
    setOpen(false);
  };

  useEffect(() => {
    getServerity();
  }, []);

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
            <AddMessage onMessageTable={handleChange} setList={setList} />
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
                    onChange={isEdit ? handleeditChange : handleAddChange}
                    options={SevorityList}
                    status={StatusList}
                    tableHeader={tableName}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    language={languages}
                    editTableMessage={isEdit ? editMessageList : addMessageList}
                    addMessageTable={isEdit ? handleEdit : handleSave}
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
                  <Button buttonStyle={messageTableStyle.savebtnText} onClick={handleDelFunc}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
});

MessageTable.displayName = 'MessageTable';
