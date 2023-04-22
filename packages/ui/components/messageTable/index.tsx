import { Button } from '@atoms/button';
import { DeleteDailog } from '@atoms/deletedailog';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useLanguageConfiguration, useMessage, useMessageGroupDetails, useServices } from '@core/store';
import { Box, Grid, Stack, SxProps, Theme, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { forwardRef, useEffect, useState } from 'react';
import { AddMessage, AddMessageGroup, EnvironmentTabs, ModalAddEnvironmentKey, TableHeader } from '..';
import { messageTableStyle } from './style';
import { Header, tableData } from './utils';

export interface MessageTableProps {
  className?: string;
  sx?: SxProps<Theme>;
  isSecretStash?: boolean;
}

export const MessageTable = forwardRef((props: MessageTableProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, isSecretStash = false, ...rest } = props;

  // Store Data
  const {
    getMessageList,
    MessagesList,
    getStatus,
    StatusList,
    getServerity,
    SevorityList,
    deleteMessage,
    setaddMessage,
    seteditMessage,
    setList,
    addMessageList,
    editMessageList,
    editMessageTable,
    addMessageTable,
    editDisplayMessageTable,
    MessagesListStatus,
    addMessageLoading,
    editMessageLoading,
    clearfilter,
    setfilter,
    onApply,
    clearAll,
  } = useMessageGroupDetails();

  const {
    addEditMessageState,
    handleAddEditStateChange,
    adding,
    addMessage,
    editing,
    editMessage,
    onEditClicked,
    open,
    setOpen,
  } = useMessage();

  const filterContent: any[] = [];

  const { languages, getSavedLanguage } = useLanguageConfiguration();
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableName, setTableName] = useState('');
  const [groupId, setGroupId] = useState<string>('');
  const [secretStashOpen, setSecretStashOpen] = useState(false);
  const [addKey, setAddkey] = useState(false);

  const filteredMessageGroup = MessagesList.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [switchList, setSwitchList] = useState<any>([]);

  const handleTableEdit = (id: string) => {
    setOpen(true);
    setIsEdit(true);
    onEditClicked(id);
  };

  const handleTableDelete = (id: string) => {
    handlemodalOpen();
  };

  const handleFilterChange = (key: any, value: string, parent: any, parentIndex: any, childrenIndex: any) => {
    setfilter({ key, value });
  };

  const handleDelFunc = () => {
    deleteMessage();
    handlemodalClose();
  };

  const handleChange = (key: any, value: string) => {
    setList({ key, value });
    setTableName(key.title);
    setGroupId(key.id);
    getMessageList();
  };

  const handleAddChange = (key: string, value: string) => setaddMessage({ key, value });

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
      // getStatus(id, true);
    } else {
      console.log(id);
      // getStatus(id, false);
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
    handleClose();
    clearAll();
  };

  const handleEdit = () => {
    editMessageTable();
    handleClose();
    clearAll();
  };

  const handleAddEnvironment = (key: string) => {
    if (key) {
      setAddkey(true);
      setSecretStashOpen(true);
    } else {
      setAddkey(false);
      setSecretStashOpen(true);
    }
  };

  useEffect(() => {
    setSwitchList(MessagesListStatus);
  }, [MessagesListStatus]);

  useEffect(() => {
    getServerity();
    getMessageList();
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
            <AddMessage onMessageTable={handleChange} setList={setList} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9.75}>
          <Box sx={messageTableStyle.commonTable}>
            {isSecretStash && (
              <>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                  <Typography sx={messageTableStyle.environmentHeading}>Environment</Typography>
                  <Button onclick={() => handleAddEnvironment('key')} sx={messageTableStyle.addEnvironmentSx}>
                    {'Add Environment'}
                  </Button>
                </Stack>
                <EnvironmentTabs />
              </>
            )}
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
              tableMinHeight={'45vh'}
              paddingAll={'0px'}
              marginAll={'16px 0px 0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    filterContent={filterContent}
                    filterChange={handleFilterChange}
                    onChange={isEdit ? handleeditChange : handleAddChange}
                    options={SevorityList}
                    status={StatusList}
                    tableHeader={'Keys'}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    open={open}
                    handleOpen={() => handleAddEnvironment('')}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    onApply={onApply}
                    language={languages}
                    editTableMessage={isEdit ? editMessageList : addMessageList}
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
        title={`${isEdit ? 'Edit' : 'Add New'} Message`}
        Bodycomponent={
          <AddMessageGroup status={StatusList} isEdit={isEdit} options={SevorityList} language={languages} />
        }
        Footercomponent={
          <FooterComponent
            check
            checked={addEditMessageState.status}
            SwitchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleAddEditStateChange('status', e.target.checked)
            }
            onSave={() => (isEdit ? editMessage(groupId) : addMessage(groupId))}
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
