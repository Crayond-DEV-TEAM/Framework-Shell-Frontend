import { Button } from '@atoms/button';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps, Theme, Popover } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Filter } from '..';
import DownloadIcon from '@core/ui/assets/downloadIcon';
import XlsIcon from '@core/ui/assets/xlsIcon';
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
  openPop?: boolean | any;
  addMessageTable?: any;
  id?: any;
  open?: boolean;
  anchorEl?: any;
  openAnchorEl?: any;
  isDownloadRequired?: boolean | any;
  handleStateChange?: (key: any, value: any) => void;
  // onChangeMessage?: (key: any, value: any, state: any) => void;
  updateStatusReport?: (e: any) => void;
  onApply: (groupId:  string) => void;
  handleOpen?: () => void;
  handleChange?: () => void;
  handleClose?: () => void;
  handleClick?: (e: any) => void;
  openAddMessage?: (value: any) => void;
  language?: any;
  addedLangState?: any;
  languageBox?: () => void;
  handleChipDelete?: any;
  addMessage?: any;
  options?: any;
  onChange?: any;
  filterChange?: any;
  messageGroupId?: string;
  onClick?: () => boolean;
  sx?: SxProps<Theme>;
}

export const TableHeader = forwardRef((props: TableHeaderProps): JSX.Element => {
  const {
    className = '',
    placeholder = 'search',
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
    openPop = false,
    isEdit,
    options,
    openAddMessage = () => false,
    language,
    searchTerm,
    setSearchTerm,
    filterContent,
    checked,
    addMessageTable = () => false,
    handleChipDelete = () => false,
    filterChange = () => false,
    onApply = () => false,
    handleChange = () => false,
    handleOpen = () => false,
    onChange = () => false,
    handleClose = () => false,
    handleClick = () => false,
    id,
    anchorEl,
    openAnchorEl,
    messageGroupId,
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
            <Box sx={{ pr: 1, pt: '3px' }}>
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
              onChange={filterChange}
              onApply={onApply}
              messageGroupId={messageGroupId}
            />
          )}
          {isBtnRequired && (
            <Box sx={{ ml: 1 }}>
              <Button sx={tableHeaderStyle.btnSx} onClick={handleOpen}>
                {buttonName}
              </Button>
            </Box>
          )}
          {isDownloadRequired && (
            <Box onClick={handleClick} sx={tableHeaderStyle.downloadIcon}>
              <DownloadIcon />
            </Box>
          )}
          <Popover
            id={id}
            open={openPop}
            anchorEl={openAnchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={tableHeaderStyle.totalFilterSx}
          >
            <Box sx={tableHeaderStyle.downloadBox}>
              <Box sx={tableHeaderStyle.download}>
                <XlsIcon />
                <Typography>Download as CSV</Typography>
              </Box>
              <Box sx={tableHeaderStyle.download}>
                <XlsIcon />
                <Typography>Download as Excel</Typography>
              </Box>
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';
