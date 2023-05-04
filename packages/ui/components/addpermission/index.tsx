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

export interface AddPermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  addTitle?: string;
  editTitle?: string;
}

export const AddPermission = (props: AddPermissionProps): JSX.Element => {
  const { className = '', sx = {}, title = '', addTitle = '', editTitle = '', ...rest } = props;
  const [open, setOpen] = useState(false);

  const { getPermissionList, PermissionList, addPermissionList, setaddPermission, addPermission, clearAll } =
    usePermission();

  const [values, setValues] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [selected, setSelected] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    clearAll();
  };

  const handleEditClose = () => setValues(false);

  const handleAddMsg = () => {
    addPermission();
    handleClose();
  };
  const onEdit = async () => {
    setValues(true);
  };

  const handleMessage = (key: string, value: any) => {
    // setselctedMessage({ key, value });
    setSelected(value);
    // onMessageTable(key, value);
  };

  const filteredMessageGroup = PermissionList.filter((x: any) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(filteredMessageGroup, 'filteredMessageGroupfilteredMessageGroupfilteredMessageGroup');

  const handleChange = (key: string, value: string) => {
    setaddPermission({ key, value });
  };

  useEffect(() => {
    getPermissionList();
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
                  onMessaageClick={(x: any) => handleMessage(x, index)}
                  select={selected}
                  // onDelete={() => deleteMessageGroups({ id: x.id })}
                  // onEdit={() => onEdit(x?.id)}
                  onEdit={() => onEdit()}
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
        title={addTitle}
        Bodycomponent={
          <ModalAddPermission
            title={'Permission Name'}
            description="Description"
            modalForm={true}
            groupState={addPermissionList}
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
      <DialogDrawer
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
      />
    </Box>
  );
};
