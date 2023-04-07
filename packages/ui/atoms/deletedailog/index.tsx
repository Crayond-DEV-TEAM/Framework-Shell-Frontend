import type { SxProps, Theme } from '@mui/material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { delete_DailogStyle } from './style';

export interface DeleteDailogProps {
  className?: string;
  sx?: SxProps<Theme>;
  rootStyle?: object;
  dialogstyle?: object;
  isDialogOpened: boolean;
  handleCloseDialog?: () => void;
  content?: string;
  maxModalWidth?: any;
  dialogRootStyle?: any;
  contentStyleSx?: any;
  Footercomponent?: ReactNode;
  Bodycomponent?: ReactNode;
}

export const DeleteDailog = (props: DeleteDailogProps): JSX.Element => {
  const {
    className = '',
    rootStyle = {},
    dialogstyle = {},
    isDialogOpened = true,
    handleCloseDialog = () => {
      false;
    },
    dialogRootStyle = {},
    title = 'Add New Message',
    content = '',
    Bodycomponent = null,
    Footercomponent,
    contentStyleSx = {},
    maxModalWidth = '',
    ...rest
  } = props;

  return (
    <Box sx={{ ...delete_DailogStyle.rootSx }}>
      <Box sx={{ ...delete_DailogStyle.rootSx, ...rootStyle }} className={`${className}`} {...rest}>
        <Dialog
          open={isDialogOpened}
          aria-labelledby="draggable-dialog-title"
          PaperProps={{
            sx: { ...delete_DailogStyle.dialogRootSx, ...dialogRootStyle },
          }}
        >
          <DialogContent sx={{ ...delete_DailogStyle.contentSx, ...contentStyleSx }}>
            {content ? content : Bodycomponent}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};
