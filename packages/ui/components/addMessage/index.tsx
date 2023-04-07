import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { AddIcon } from '@atoms/icons';
import { MessageCard } from '@atoms/messageCard';
import { SearchField } from '@atoms/searchField';
import { useAddGroup, useMessageConfiguration, useMessageGroup } from '@core/store';
import SearchIcon from '@mui/icons-material/Search';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, IconButton } from '@mui/material';
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
  payload?: any;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, onMessageTable = () => false, payload = {}, ...rest } = props;

  // store Data
  const {
    messageGroup,
    addMessage,
    getMessageGroups,
    addMessageGroups,
    addMessageLoading,
    setaddMessage,
    deleteMessageGroups,
    seteditMessage,
    editMessageGroups,
    editMessageListGroups,
    editMessageList,
  } = useMessageConfiguration();

  // const { addMessage } = groupState;
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState(false);

  const [selected, setSelected] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    // setIsEdit(false);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessageGroup = messageGroup?.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClose = () => {
    // clearAddgroupState();
    setOpen(false);
  };

  const handleChange = (key: string, value: string) => {
    setaddMessage({ key, value });
    // seteditMessage({ key, value });
  };
  const handleeditChange = (key: string, value: string) => {
    seteditMessage({ key, value });
  };
  const handleEditClose = () => {
    setValues(false);
  };

  // const isValidToCreate = () => {
  //   let isValid = true;
  //   const error = addMessage?.error;

  //   // Checking addTitle
  //   if (addMessage?.addTitle?.length === 0) {
  //     isValid = false;
  //     error.addTitle = 'Title is required';
  //   } else {
  //     error.addTitle = '';
  //   }

  //   // Checking addDescription
  //   if (addMessage?.addDescription?.length === 0) {
  //     isValid = false;
  //     error.addDescription = 'Description is required';
  //   } else {
  //     error.addDescription = '';
  //   }

  //   updateErrorAddGroup(error);
  //   return isValid;
  // };

  // const handleMessage = (key: any, value: any) => {
  //   handleStateChange(key, value);
  //   setSelected(value);
  //   onMessageTable(key, value);
  // };

  // const addGroup = async () => {
  //   if (isEdit && isValidToCreate()) {
  //     await editMessage(addMessage, true);
  //     clearAddgroupState();
  //     setOpen(false);
  //   } else if (isValidToCreate()) {
  //     await addMessageGroup();
  //     clearAddgroupState();
  //     setOpen(false);
  //   }
  //   await getAllMessageGroup();
  // };
  // const onDelete = async (id) => {
  //   deleteMessageGroups(id);
  // };

  const onEdit = async (id: any) => {
    setValues(true);
    editMessageListGroups({ id: id });
  };
  // const Edit = (id: any) => {
  //   editMessageGroups();
  // };

  // useEffect(() => {
  //   updateStateAddGroup();
  // }, []);

  useEffect(() => {
    getMessageGroups();
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
                  // onMessaageClick={() => handleMessage(x, index)}
                  select={selected}
                  onDelete={() => deleteMessageGroups({ id: x.id })}
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
        Bodycomponent={<ModalAddMessage handleChange={handleChange} groupState={addMessage} />}
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            checked={addMessage}
            SwitchChange={(e: any) => handleChange('is_status', e.target.checked)}
            onSave={() => addMessageGroups()}
            onCancel={handleClose}
            // onEdit={Edit}
            loading={addMessageLoading}
          />
        }
        dialogRootStyle={addMessageStyle.dialogSx}
      />
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Edit message Group'}
        Bodycomponent={<ModalAddMessage handleChange={handleeditChange} groupState={editMessageList} />}
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            checked={addMessage}
            SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            onSave={() => editMessageGroups()}
            onCancel={handleEditClose}
            loading={addMessageLoading}
          />
        }
        dialogRootStyle={addMessageStyle.dialogSx}
      />
      ;
    </Box>
  );
});

AddMessage.displayName = 'AddMessage';
