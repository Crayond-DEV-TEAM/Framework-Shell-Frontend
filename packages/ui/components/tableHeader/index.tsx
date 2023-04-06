import { Button } from '@atoms/button';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { AddMessageGroup, Filter } from '..';
import { tableHeaderStyle } from './style';

export interface TableHeaderProps {
  className?: string;
  tableHeader?: string;
  buttonName?: string;
  placeholder?: string;
  isFilterRequired?: boolean;
  isSearchRequired?: boolean;
  isBtnRequired?: boolean;
  filterContent?: any;
  editTableMessage?: any;
  status?: any;
  checked?: any;
  isEdit?: boolean;
  loading?: boolean;
  setOpen?: any;
  searchTerm?: any;
  setSearchTerm?: any;
  open?: boolean | any;
  addMessageTable?: any;
  isDownloadRequired?: boolean | any;
  handleStateChange?: (key: any, value: any) => void;
  onChangeMessage?: (key: any, value: any, state: any) => void;
  updateStatusReport?: (e: any) => void;
  onApply?: () => void;
  handleOpen?: () => void;
  handleClose?: () => void;
  openAddMessage?: (value: any) => void;
  language?: any;
  addedLangState?: any;
  languageBox?: () => void;
  handleChipDelete?: any;
  addMessage?: any;
  options?: any;
  onChange?: any;
  onClick?: any;
  sx?: SxProps<Theme>;
}

export const TableHeader = forwardRef((props: TableHeaderProps): JSX.Element => {
  const {
    className = '',
    placeholder = '',
    isDownloadRequired = false,
    tableHeader = 'Add Message',
    isFilterRequired = true,
    isSearchRequired = true,
    isBtnRequired = true,
    loading = true,
    handleStateChange = () => false,
    updateStatusReport = () => false,
    status,
    buttonName = 'Add Message',
    editTableMessage,
    setOpen,
    addedLangState,
    open = false,
    isEdit,
    options,
    openAddMessage = () => false,
    onChangeMessage = () => false,
    languageBox = () => false,
    language,
    searchTerm,
    setSearchTerm,
    filterContent,
    checked,
    addMessageTable = () => false,
    handleChipDelete = () => false,
    onApply = () => false,
    handleOpen = () => false,
    onChange = () => false,
    handleClose = () => false,
    onClick = () => false,
    sx = {},
    ...rest
  } = props;
  return (
    <Box
      sx={[
        {
          ...tableHeaderStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={tableHeaderStyle.totalHeaderSx}>
        <Typography sx={tableHeaderStyle.titleSx}>{tableHeader}</Typography>
        <Box sx={tableHeaderStyle.leftSx}>
          {isSearchRequired && (
            <Box sx={{ mr: 1 }}>
              <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
              />
            </Box>
          )}
          {isFilterRequired && (
            <Filter
              filterContent={filterContent}
              handleChipDelete={handleChipDelete}
              onChange={onChange}
              onApply={onApply}
            />
          )}
          {isBtnRequired && (
            <Box sx={{ ml: 1 }}>
              <Button sx={tableHeaderStyle.btnSx} onClick={handleOpen}>
                {buttonName}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <DialogDrawer
        dialogRootStyle={tableHeaderStyle.dialogSx}
        contentStyleSx={tableHeaderStyle.contentSx}
        isDialogOpened={open}
        title={'Add New Message Group'}
        Bodycomponent={<AddMessageGroup
          handleChange={handleStateChange}
          updateStatusReport={updateStatusReport}
          groupState={editTableMessage}
          status={status}
          onChangeMessage={onChangeMessage}
          languageBox={languageBox}
          isEdit={isEdit}
          options={options}
          language={addedLangState} />}
        Footercomponent={<FooterComponent
          checked={editTableMessage?.isAddGroup}
          SwitchChange={(e: any) => handleStateChange('isAddGroup', e.target.checked)}
          onSave={addMessageTable}
          onCancel={handleClose}
          loading={loading} />}
        handleCloseDialog={handleClose}
        rootStyle={{ padding: '0px important' }} // dialogstyle={{ width: '904px', height: '604px' }}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }} />
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';
