import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { AddIcon } from '@atoms/icons';
import { MessageCard } from '@atoms/messageCard';
import { SearchField } from '@atoms/searchField';
import { useMessageGroup } from '@core/store';
import SearchIcon from '@mui/icons-material/Search';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import isEqual from 'react-fast-compare';
import { ModalAddMessage } from '..';
import { addMessageStyle } from './style';
import { localStorageKeys, parseJwt } from '@core/utils';
import { Input } from '@atoms/input';

export interface AddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
  onMessageTable?: (key: any, value: string) => void;
  open?: boolean;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, onMessageTable = () => false, ...rest } = props;

  // store Data
  const {
    get,
    groupState,
    messageGroup,
    editMessage,
    handleStateChange,
    deleteMessage,
    handleChipDelete,
    addMessage,
    loading,
    clearAddgroupState,
    getAllMessageGroup,
    addMessageGroup,
  } = useMessageGroup(
    (state) => ({
      groupState: state.groupState,
      messageGroup: state.messageGroup,
      get: state.get,
      addMessageGroup: state.addMessageGroup,
      editMessage: state.editMessage,
      addMessage: state.addMessage,
      getAllMessageGroup: state.getAllMessageGroup,
      handleChipDelete: state.handleChipDelete,
      deleteMessage: state.deleteMessage,
      clearAddgroupState: state.clearAddgroupState,
      handleStateChange: state.handleStateChange,
      loading: state.loading,
    }),
    (prev, curr) => {
      const data = isEqual(prev, curr);
      return false;
    },
  );

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selected, setSelected] = useState(0);
  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessageGroup = messageGroup?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClose = () => {
    clearAddgroupState();

    setOpen(false);
  };

  const handleMessage = (key: any, value: any) => {
    handleStateChange(key, value);
    setSelected(value);
    onMessageTable(key, value);
  };

  const messageValue = [
    {
      title: 'Message Group 1',
    },
    {
      title: 'Message Group 2',
    },
    {
      title: 'Message Group 3',
    },
    {
      title: 'Message Group 4',
    },
  ];

  const addGroup = async () => {
    if (isEdit) {
      await editMessage(addMessage, true);
      clearAddgroupState();
    } else {
      await addMessageGroup();
      clearAddgroupState();
    }
    setOpen(false);
    await getAllMessageGroup();
  };

  const onDelete = async (id: any) => {
    await deleteMessage(id);
    await getAllMessageGroup();
  };

  const onEdit = async (id: any) => {
    await get(id);
    setOpen(true);
    setIsEdit(true);
  };
  useEffect(() => {
    // const authToken = localStorage.getItem(localStorageKeys.authToken);
    // const data = parseJwt(authToken);
    getAllMessageGroup();
  }, []);
  return (
    <Box
      sx={[
        {
          ...addMessageStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={addMessageStyle.header}>
        <Typography sx={addMessageStyle.titleSx}>Message Group</Typography>
        <Box sx={{ cursor: 'pointer' }}>
          <AddIcon onClick={handleOpen} />
        </Box>
      </Box>
      <Box sx={{ m: '12px', height: '32px' }}>
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
        />
      </Box>

      <Box sx={addMessageStyle.totalGroupSx}>
        {Array.isArray(filteredMessageGroup) && filteredMessageGroup?.length > 0 ? (
          filteredMessageGroup?.map((x: any, index: any) => {
            return (
              <Box key={index}>
                <MessageCard
                  index={index}
                  title={x.title}
                  isActive={x.is_status}
                  onMessaageClick={() => handleMessage(x, index)}
                  select={selected}
                  onDelete={() => onDelete(x?.id)}
                  onEdit={() => onEdit(x?.id)}
                />
              </Box>
            );
          })
        ) : (
          <Box>
            <Typography sx={addMessageStyle.noDataSx}>No Data Found!!!</Typography>
          </Box>
        )}
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={open}
        title={'Add New Message Group'}
        Bodycomponent={<ModalAddMessage handleChange={handleStateChange} groupState={addMessage} />}
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            checked={addMessage?.isAddGroup}
            SwitchChange={(e: any) => handleStateChange('isAddGroup', e.target.checked)}
            onSave={addGroup}
            onCancel={handleClose}
            loading={loading}
          />
        }
        dialogRootStyle={addMessageStyle.dialogSx}
      />
    </Box>
  );
});

AddMessage.displayName = 'AddMessage';
