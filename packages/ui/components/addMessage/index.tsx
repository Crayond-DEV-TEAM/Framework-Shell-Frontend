import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { AddIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { MessageCard } from '@atoms/messageCard';
import { useMessageConfiguration, useServices } from '@core/store';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Skeleton, Stack, SxProps, Theme, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { ModalAddMessage, ModalAddServices } from '..';
import { addMessageStyle } from './style';

export interface AddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
  onMessageTable?: (key: any, value: string) => void;
  setList?: (key: any, value: string) => void;
  open?: boolean;
  payload?: any;
  isSecretStash?: boolean;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    setList = {},
    onMessageTable = () => false,
    payload = {},
    isSecretStash = false,
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
  } = useMessageConfiguration();
  const { getServices, services, setEditServicesfn, editServices } = useServices();

  console.log(services, 'services====');
  console.log(editMessageList, 'editMessageList====');
  console.log(editServices, 'editServices====');

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [selected, setSelected] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEditClose = () => setValues(false);

  const handleAddMsg = () => {
    setOpen(false);
    addMessageGroups();
  };

  const filteredMessageGroup = messageGroup?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (key: string, value: string) => setaddMessage({ key, value });

  const handleeditChange = (key: string, value: string) => seteditMessage({ key, value });

  const onEdit = async (id: string) => {
    setValues(true);
    editMessageListGroups({ id: id });
  };

  const onEditServices = async (key: any, value: any) => {
    debugger;
    setValues(true);
    setEditServicesfn(key.name, value);
  };
  const Edit = () => {
    editMessageGroups();
    setValues(false);
  };
  const handleMessage = (key: string, value: any) => {
    setselctedMessage({ key, value });
    setSelected(value);
    onMessageTable(key, value);
  };

  useEffect(() => {
    getMessageGroups();
    getServices();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={[{ ...addMessageStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={addMessageStyle.header}>
        <Typography sx={addMessageStyle.titleSx}>{isSecretStash ? 'Services' : 'Message Group'}</Typography>
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
                  isActive={x.is_status}
                  onMessaageClick={() => handleMessage(x, index)}
                  select={selected}
                  onDelete={() => deleteMessageGroups({ id: x.id })}
                  onEdit={() => onEditServices(x, index)}
                />
              </Box>
            );
          })
        ) : (
          <Box>
            {!fetching && (
              <Typography variant="body2" color="textSecondary">
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

      {/* <Box sx={addMessageStyle.totalGroupSx}>
        {isSecretStash && Array.isArray(services) && services?.length > 0 ? (
          services?.map((x: any, index: any) => {
            return (
              <Box key={index} sx={{ pb: 0.75 }}>
                <MessageCard
                  index={index}
                  title={x.name}
                  isActive={x.isActive}
                  onMessaageClick={() => handleMessage(x, index)}
                  select={selected}
                  onDelete={() => deleteMessageGroups({ id: x.id })}
                  onEdit={() => onEditServices(x, index)}
                />
              </Box>
            );
          })
        ) : (
          <Box>
            {!fetching && (
              <Typography variant="body2" color="textSecondary">
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
      </Box> */}
      {/* add message */}
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={open}
        title={isSecretStash ? 'Add Services' : 'Add New Message Group'}
        Bodycomponent={
          isSecretStash ? (
            <ModalAddServices />
          ) : (
            <ModalAddMessage handleChange={handleeditChange} groupState={editMessageList} />
          )
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check={true}
            checked={addMessage.is_status}
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
        title={isSecretStash ? 'Edit Services' : 'Edit New Message Group'}
        Bodycomponent={
          isSecretStash ? (
            <ModalAddServices groupState={editServices} />
          ) : (
            <ModalAddMessage handleChange={handleeditChange} groupState={editMessageList} />
          )
        }
        handleCloseDialog={handleEditClose}
        Footercomponent={
          <FooterComponent
            check={true}
            checked={editMessageList.is_status}
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
