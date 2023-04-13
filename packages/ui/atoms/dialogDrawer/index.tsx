// import { CloseIcon } from '@atoms/icons';
import { SxProps, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode, useState } from 'react';

import CloseIcon from '../../assets/close.svg';
import { dialogDrawerStyle } from './style';

export interface DialogDrawerProps {
  className?: string;
  sx?: SxProps<Theme>;
  rootStyle?: object;
  dialogstyle?: object;
  isDialogOpened: boolean;
  fullWidth?: boolean;
  fullScreen?: boolean;
  check?: boolean;
  handleCloseDialog?: () => void;
  handleSubmit?: () => void;
  handleClose?: () => void;
  // handleSubmit: () => void;
  title: string;
  closeIcon?: boolean;
  isFooterRequired?: boolean;
  isHeaderTitleRequired?: boolean;
  titleStyle?: object;
  content?: React.ReactNode;
  maxModalWidth?: any;
  dialogRootStyle?: any;
  contentStyleSx?: any;
  Footercomponent?: ReactNode;
  Bodycomponent?: ReactNode;
}

//export const DialogDrawer = forwardRef((props: DialogDrawerProps): JSX.Element => {
function DialogDrawer(props: DialogDrawerProps): JSX.Element {
  const {
    className = '',
    rootStyle = {},
    dialogstyle = {},
    handleClose = () => false,
    isDialogOpened = true,
    handleCloseDialog = () => {
      false;
    },
    dialogRootStyle = {},
    isFooterRequired = true,
    isHeaderTitleRequired = true,
    // handleSubmit = {},
    title = 'Add New Message',
    content = '',
    closeIcon = true,
    Bodycomponent = null,
    check = false,
    Footercomponent,
    contentStyleSx = {},
    maxModalWidth = '',
    fullWidth = false,
    fullScreen = false,
    ...rest
  } = props;

  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [maxWidth] = useState(maxModalWidth);

  return (
    <Box sx={{ ...dialogDrawerStyle.rootSx, ...rootStyle }} className={`${className}`} {...rest}>
      <Dialog
        fullScreen={fullscreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          sx: { ...dialogDrawerStyle.dialogRootSx, ...dialogRootStyle },
        }}
      >
        {isHeaderTitleRequired && (
          <DialogTitle id="scroll-dialog-title" sx={dialogDrawerStyle.header}>
            <Box sx={dialogDrawerStyle.headAlign}>
              <Typography sx={dialogDrawerStyle.title}>{title}</Typography>
              {closeIcon && (
                <Box
                  component="img"
                  src={CloseIcon}
                  onClick={handleCloseDialog}
                  sx={{ cursor: 'pointer' }}
                  height={16}
                  width={16}
                />
              )}
            </Box>
          </DialogTitle>
        )}
        <DialogContent sx={{ ...dialogDrawerStyle.contentSx, ...contentStyleSx }}>
          {content ? content : Bodycomponent}
        </DialogContent>
        {isFooterRequired && <DialogActions sx={dialogDrawerStyle.header}>{Footercomponent}</DialogActions>}
      </Dialog>
    </Box>
  );
}
export { DialogDrawer };
