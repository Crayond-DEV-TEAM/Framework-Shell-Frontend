import { IconButton, Skeleton, Stack, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { addPermissionStyle } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { ModalAddMessage, ModalAddPermission } from '..';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { MessageCard } from '@atoms/messageCard';
import { AddIcon } from '@atoms/icons';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { Input } from '@atoms/input';
import { usePermission } from '@core/store';
import { enqueueSnackbar } from 'notistack';

export interface AddPermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  addTitle?: string;
  editTitle?: string;
  handleMessage?: (key: any, value: any) => void;
  select?: any;
}

export const AddPermission = (props: AddPermissionProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    addTitle = '',
    editTitle = '',
    handleMessage = (key, value) => false,
    select = {},
    ...rest
  } = props;
  const [open, setOpen] = useState(false);

  const {
    getPermissionList,
    PermissionList,
    addPermissionList,
    setaddPermission,
    addPermission,
    updateEditData,
    clearAll,
  } = usePermission();

  const [editRole, setEditRole] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    clearAll();
  };

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    permission: '',
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!addPermissionList.title) {
      errors.title = 'Title is required';
    }

    if (!addPermissionList.description) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddMsg = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      addPermission();
      handleClose();
      enqueueSnackbar('Permission added Successfully', { variant: 'success' });
    } else {
      // enqueueSnackbar('Please fill all the fields', { variant: 'error' });
    }
  };
  const onEdit = (x: any, index: any) => {
    setOpen(true);
    setEditRole(true);

    const editData = {
      // id: id,
      title: x.title,
      description: x.description,
      status: x.status,
    };

    updateEditData(editData);
  };

  const filteredMessageGroup = PermissionList.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (key: string, value: string) => {
    setaddPermission({ key, value });
  };
  const getPermission = async () => {
    const myPromise = () => {
      return new Promise((resolve, reject) => {
        try {
          const value = getPermissionList();
          resolve(value);
        } catch (error) {
          reject(error);
        }
      });
    };

    const regret = await myPromise();
    console.log(regret, 'valuevaluevalue');
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <Box
      sx={[
        {
          ...addPermissionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={addPermissionStyle.header}>
        <Typography sx={addPermissionStyle.titleSx}>{title}</Typography>
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

      <Box sx={addPermissionStyle.totalGroupSx}>
        {Array.isArray(filteredMessageGroup) && filteredMessageGroup?.length > 0 ? (
          filteredMessageGroup?.map((x: any, index: any) => {
            // {data.map((x, index) => {
            return (
              <Box key={index} sx={{ pb: 0.75 }}>
                <MessageCard
                  index={index}
                  title={x.title}
                  isActive={x.status}
                  onMessaageClick={() => handleMessage(x, index)}
                  select={select}
                  // onDelete={() => deleteMessageGroups({ id: x.id })}
                  // onEdit={() => onEdit(x?.id)}
                  onEdit={() => onEdit(x, index)}
                />
              </Box>
            );
            // }))}
          })
        ) : (
          <Box>
            {/* {!fetching && (
              <Typography variant="body2" color="textSecondary" sx={{ padding: '16px' }}>
                You are yet to add a message group.
              </Typography>
            )}
            {fetching && (
              <Stack spacing={0.25} px={2}>
                {Array.from(Array(10).keys()).map((_) => (
                  <Skeleton height={40} width={'100%'} key={_} />
                ))}
              </Stack>
            )} */}
          </Box>
        )}
      </Box>
      {/* add message */}
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={open}
        title={editRole ? 'Edit Permission' : 'Add Permission'}
        Bodycomponent={
          <ModalAddPermission
            title={'Permission Name'}
            description="Description"
            modalForm={true}
            groupState={addPermissionList}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check
            // checked={false}
            checked={addPermissionList.status}
            SwitchChange={(e: any) => handleChange('status', e.target.checked)}
            onSave={handleAddMsg}
            onCancel={handleClose}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={addPermissionStyle.dialogSx}
      />

      {/* Edit message */}
      {/* <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={editTitle}
        Bodycomponent={<ModalAddPermission title={'Permission Name'} description="Description" modalForm={true} />}
        handleCloseDialog={handleEditClose}
        Footercomponent={
          <FooterComponent
            check
            checked={false}
            // checked={editMessageList.is_status}
            // SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            // onSave={Edit}
            onCancel={handleEditClose}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={addPermissionStyle.dialogSx}
      /> */}
    </Box>
  );
};
