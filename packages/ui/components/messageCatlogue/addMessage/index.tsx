import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { AddIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { MessageCard } from '@atoms/messageCard';
import { useMessage, useMessageConfiguration, useSlug } from '@core/store';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Skeleton, Stack, SxProps, Theme, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { ModalAddMessage } from '..';
import { addMessageStyle } from './style';
import { enqueueSnackbar } from 'notistack';

export interface AddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
  onMessageTable?: (key: any, value: string) => void;
  setList: React.Dispatch<any>;
  setTableName?: any;
  open?: boolean;
  payload?: any;
  title?: string;
  addTitle?: string;
  editTitle?: string;
  setGroupId: React.Dispatch<any>;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    setList,
    onMessageTable = () => false,
    payload = {},
    title = '',
    addTitle = '',
    editTitle = '',
    setTableName,
    setGroupId,
    ...rest
  } = props;

  // store Data
  const {
    fetching,
    errorOnFetching,
    messageGroup,
    addMessage,
    getMessageGroups,
    addMessageGroups,
    addMessageLoading,
    setaddMessage,
    setselctedMessage,
    deleteMessageGroups,
    seteditMessage,
    editMessageGroups,
    editMessageListGroups,
    editMessageList,
    clearAll,
  } = useMessageConfiguration();
  const { slugs } = useSlug();
  const { getAllMessages } = useMessage();

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [selected, setSelected] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    clearAll();
  };

  const handleEditClose = () => {
    setValues(false);
    clearAll();
  };

  const handleAddMsg = () => {
    if (addMessage?.title && addMessage?.description) {
      setOpen(false);
      addMessageGroups();
    } else {
      enqueueSnackbar('Message Group items required!', { variant: 'error' });
    }
  };

  const filteredMessageGroup = messageGroup?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (key: string, value: string) => setaddMessage({ key, value });

  const handleeditChange = (key: string, value: string) => seteditMessage({ key, value });

  const onEdit = async (x: any) => {
    setValues(true);
    editMessageListGroups({ id: x?.id });
  };

  const Edit = () => {
    editMessageGroups();
    setValues(false);
  };
  const handleMessage = (
    key: {
      description: string;
      id: string;
      is_status: boolean;
      title: string;
    },
    value: any,
  ) => {
    debugger;
    setselctedMessage({ key, value });
    setSelected(value);
    onMessageTable(key, value);
    setList(key.id);
  };
  useEffect(() => {
    if (slugs?.['MESSAGE-CATALOG']) {
      getMessageGroups();
    }
  }, [slugs?.['MESSAGE-CATALOG']]);

  useEffect(() => {
    if (messageGroup && messageGroup.length > 0) {
      const init = messageGroup[0];
      setList(init.id);
      setSelected(0);
      setTableName(init?.title);
      setGroupId(init?.id);
      getAllMessages(init?.id as string);
    }
  }, [messageGroup]);

  return (
    <Box
      sx={[{ ...addMessageStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={addMessageStyle.header}>
        <Typography sx={addMessageStyle.titleSx}>{title}</Typography>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ py: 2, px: 1.25 }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
        />
      </Box>

      <Box sx={addMessageStyle.totalGroupSx}>
        {Array.isArray(filteredMessageGroup) && filteredMessageGroup?.length > 0 ? (
          filteredMessageGroup?.map((x: any, index: any) => {
            return (
              <Box key={index} sx={{ pb: 0.75 }}>
                <MessageCard
                  index={index}
                  title={x.title}
                  isActive={x?.is_status}
                  onMessaageClick={() => handleMessage(x, index)}
                  select={selected}
                  handleDelete={() => {
                    deleteMessageGroups({ id: x.id });
                  }}
                  onEdit={() => onEdit(x)}
                />
              </Box>
            );
          })
        ) : (
          <Box>
            {!fetching && (
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                You are yet to add a message group.
              </Typography>
            )}
            {fetching && (
              <Stack spacing={0.25} px={2}>
                {Array.from(Array(10).keys()).map((_) => (
                  <Skeleton height={40} width={'100%'} key={_} />
                ))}
              </Stack>
            )}
          </Box>
        )}
      </Box>
      {/* add message */}
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={open}
        title={addTitle}
        Bodycomponent={<ModalAddMessage handleChange={handleChange} groupState={addMessage} />}
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check={true}
            checked={addMessage?.is_status}
            SwitchChange={(e: any) => handleChange('is_status', e.target.checked)}
            onSave={handleAddMsg}
            onCancel={handleClose}
            loading={addMessageLoading}
          />
        }
        dialogRootStyle={addMessageStyle.dialogSx}
      />

      {/* Edit message */}
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={editTitle}
        Bodycomponent={<ModalAddMessage handleChange={handleeditChange} groupState={editMessageList} />}
        handleCloseDialog={handleEditClose}
        Footercomponent={
          <FooterComponent
            check={true}
            checked={editMessageList?.is_status}
            SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            onSave={Edit}
            onCancel={handleEditClose}
            loading={addMessageLoading}
          />
        }
        dialogRootStyle={addMessageStyle.dialogSx}
      />
    </Box>
  );
});

AddMessage.displayName = 'AddMessage';
