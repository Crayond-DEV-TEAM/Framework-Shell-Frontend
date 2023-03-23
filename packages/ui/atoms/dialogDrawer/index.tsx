// import { CloseIcon } from '@atoms/icons';
import { FooterComponent } from '@atoms/footerComponent/index';
import { SxProps, Theme, Typography } from '@mui/material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

import CloseIcon from '../../assets/close.svg';
import { dialogDrawerStyle } from './style';

export interface DialogDrawerProps {
  className?: string;
  sx?: SxProps<Theme>;
  rootStyle: object;
  isDialogOpened: boolean;
  handleCloseDialog: () => void;
  title: string;
  titleStyle: object;
  content: string;
  Footercomponent?: ReactNode;
  Bodycomponent?: ReactNode;
}

//export const DialogDrawer = forwardRef((props: DialogDrawerProps): JSX.Element => {
function DialogDrawer(props: DialogDrawerProps): JSX.Element {
  const {
    className = '',
    rootStyle = {},
    isDialogOpened = true,
    handleCloseDialog = () => {
      false;
    },
    title = 'Add New Message',
    content = 'நூல், செய்தித்தாள் முதலியவற்றின் (படங்கள், அடிக்குறிப்புகள்/பின்குறிப்புகள், அடைவு முதலியவை நீங்கலான) முதன்மையான எழுத்துருப் பகுதி; மூலபாடம். "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;',
    Bodycomponent = null,
    Footercomponent = <FooterComponent />,
    ...rest
  } = props;

  return (
    <Box sx={{ ...dialogDrawerStyle.rootSx, ...rootStyle }} className={`${className}`} {...rest}>
      <Dialog open={isDialogOpened} aria-labelledby="draggable-dialog-title">
        <DialogTitle id="scroll-dialog-title" sx={dialogDrawerStyle.header}>
          <Box sx={dialogDrawerStyle.headAlign}>
            <Typography sx={dialogDrawerStyle.title}>{title}</Typography>
            <Box
              component="img"
              src={CloseIcon}
              onClick={() => {
                handleCloseDialog;
              }}
              height={16}
              width={16}
            />
          </Box>
        </DialogTitle>
        <DialogContent>{content ? content : Bodycomponent}</DialogContent>
        <DialogActions sx={dialogDrawerStyle.header}>{Footercomponent}</DialogActions>
      </Dialog>
    </Box>
  );
}
export { DialogDrawer };
