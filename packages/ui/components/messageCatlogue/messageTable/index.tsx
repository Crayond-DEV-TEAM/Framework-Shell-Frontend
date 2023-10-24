import { Button } from '@atoms/button';
import { DeleteDailog } from '@atoms/deletedailog';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useLanguageConfiguration, useMessage, useMessageGroupDetails } from '@core/store';
import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { forwardRef, useEffect, useState } from 'react';
import { AddMessage, AddMessageGroup } from '..';
import { messageTableStyle } from './style';
import { Header, tableData } from './utils';
import { TableHeader } from '@components/commonComponents';

export interface MessageTableProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const MessageTable = forwardRef((props: MessageTableProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  // Store Data
  const { getStatus, StatusList, getServerity, SevorityList, setfilter, onApply, filterContent } =
    useMessageGroupDetails();

  const {
    MessagesList,
    MessagesListStatus,
    addEditMessageState,
    getAllMessages,
    handleAddEditStateChange,
    adding,
    addMessage,
    editing,
    editMessage,
    onEditClicked,
    open,
    deleteMessage,
    setOpen,
    clearAll,
    clearAllMessage,
  } = useMessage();
  console.log(addEditMessageState, 'addEditMessageStateaddEditMessageStateaddEditMessageStateaddEditMessageState');
  // const filterContent: any[] = [];
  const { languages, getSavedLanguage } = useLanguageConfiguration();
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableName, setTableName] = useState('');
  const [groupId, setGroupId] = useState<string>('');
  const [deleteId, setDeleteId] = useState('');
  const [List, setList] = useState('');

  const filteredMessageGroup = MessagesList.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  console.log(MessagesList, 'filteredMessageGroupfilteredMessageGroupfilteredMessageGroup');
  const [switchList, setSwitchList] = useState<any>([]);
  const handleTableEdit = (id: string) => {
    setOpen(true);
    setIsEdit(true);
    // setIsEdit(true);
    onEditClicked(id);
  };

  const handleTableDelete = (id: string) => {
    setDeleteId(id);
    handlemodalOpen();
  };

  const handleFilterChange = (key: any, value: string) => {
    setfilter({ key, value });
  };

  const handleDelFunc = () => {
    deleteMessage(deleteId, groupId);
    handlemodalClose();
    getAllMessages(groupId);
  };

  const handleChange = (key: any, value: string) => {
    setList(key.id);
    setTableName(key.title);
    setGroupId(key.id);
    clearAllMessage();
    getAllMessages(key.id);
  };

  // const handleAddChange = (key: string, value: string) => setaddMessage({ key, value });

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

  const handleOpen = async () => {
    setOpen(true);
    getSavedLanguage();
  };

  const handleClose = () => {
    setOpen(false);
    clearAll();
    // setIsEdit(false);
  };

  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };

  const handleSave = (groupId: any) => {
    addMessage(groupId);
    handleClose();
    getAllMessages(groupId);
    clearAll();
  };

  const handleEdit = (groupId: any) => {
    editMessage(groupId);
    handleClose();
    getAllMessages(groupId);
    clearAll();
  };

  useEffect(() => {
    setSwitchList(MessagesListStatus);
  }, [MessagesListStatus]);

  useEffect(() => {
    getServerity();
  }, []);
  return (
    <Box
      sx={[{ ...messageTableStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Grid container display="flex" sx={messageTableStyle.totalTableSx} spacing={3}>
        {/* Message Group */}
        <Grid item xs={12} sm={4} md={2.25}>
          <Box sx={messageTableStyle.addSx}>
            <AddMessage
              onMessageTable={handleChange}
              setList={setList}
              title="Message Group"
              addTitle="Add New Message Group"
              editTitle="Edit Message Group"
              setTableName={setTableName}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9.75}>
          <Box sx={messageTableStyle.commonTable}>
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
                    isFilterRequired={false}
                    filterContent={filterContent}
                    filterChange={handleFilterChange}
                    // onChange={handleAddChange}
                    options={SevorityList}
                    status={StatusList}
                    tableHeader={tableName}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    onApply={onApply}
                    language={languages}
                    // editTableMessage={addEditMessageState.id ? editMessageList : addMessageList}
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
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this?</Typography>
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

      <DialogDrawer
        dialogRootStyle={{
          width: '832px',
        }}
        contentStyleSx={messageTableStyle.contentSx}
        isDialogOpened={open}
        title={`${addEditMessageState.id ? 'Edit' : 'Add New'} Message`}
        Bodycomponent={
          <AddMessageGroup status={StatusList} options={SevorityList} language={languages} isEdit={isEdit} />
        }
        Footercomponent={
          <FooterComponent
            check
            checked={addEditMessageState.status}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleAddEditStateChange('status', e.target.checked)
            }
            onSave={() => {
              if (addEditMessageState.id) {
                handleEdit(groupId);
              } else {
                handleSave(groupId);
              }
            }}
            onCancel={handleClose}
            loading={isEdit ? editing : adding}
          />
        }
        handleCloseDialog={handleClose}
        rootStyle={{ padding: '0px important' }}
      />
    </Box>
  );
});

MessageTable.displayName = 'MessageTable';
