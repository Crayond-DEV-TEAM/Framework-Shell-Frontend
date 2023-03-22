// // import { CloseIcon } from '@atoms/icons';
// import type { SxProps, Theme } from '@mui/material';
// import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, Hidden } from '@mui/material';
// import { useState } from 'react';

// import { dialogDrawerStyle } from './style';

// export interface DialogDrawerProps {
//   className?: string;
//   sx?: SxProps<Theme>;
//   rootStyle: object;
//   isDialogOpened: boolean;
//   handleCloseDialog: () => void;
//   title: string;
//   titleStyle: object;
//   content: string;
//   actions: string;
//   maxModalWidth: boolean;
//   dialogRootStyle: string;
//   topDivider: boolean;
//   bottomDivider: boolean;
//   isCloseOut: boolean;
// }

// //export const DialogDrawer = forwardRef((props: DialogDrawerProps): JSX.Element => {
// function DialogDrawer(props: DialogDrawerProps): JSX.Element {
//   const {
//     className = '',
//     rootStyle = {},
//     isDialogOpened = false,
//     handleCloseDialog = () => false,
//     title = '',
//     titleStyle = {},
//     topDivider,
//     bottomDivider,
//     content,
//     isCloseOut,
//     maxModalWidth = false,
//     actions,
//     dialogRootStyle = {},
//     ...rest
//   } = props;
//   const [maxWidth] = useState(maxModalWidth);
//   const handleClose = () => {
//     handleCloseDialog(false);
//   };

//   return (
//     <Box sx={{ ...dialogDrawerStyle.rootSx, ...rootStyle }} className={`${className}`} {...rest}>
//       <Hidden smDown>
//         <Dialog
//           open={open}
//           onClose={onClose}
//           aria-labelledby="alert-dialog-title"
//           sx={dialogDrawerStyle?.dialog}
//           maxWidth={maxWidth ? maxWidth : width ?? 'xs'}
//           fullWidth
//           aria-describedby="alert-dialog-description"
//         >
//           {!isnotTitle && (
//             <DialogTitle sx={dialogDrawerStyle?.header}>
//               <span>{header}</span>{' '}
//               {/* <img src="/images/close.svg" alt="close" onClick={onClose} style={{ cursor: 'pointer' }} /> */}
//             </DialogTitle>
//           )}

//           <DialogContent style={{ padding: '0 !important' }}>
//             <Box
//               height={height ?? 'auto'}
//               overflow="auto"
//               padding={padding ?? 2}
//               sx={{ ...dialogDrawerStyle.component, ...height_style }}
//             >
//               {component ?? dialogComponent}
//             </Box>
//           </DialogContent>
//           {footer && (
//             <DialogActions>
//               <Box sx={dialogDrawerStyle?.footer}>{footer}</Box>
//             </DialogActions>
//           )}
//         </Dialog>
//       </Hidden>
//       <Hidden smUp>
//         <Drawer anchor="bottom" sx={dialogDrawerStyle?.drawer} open={open} onClose={onClose}>
//           {!isnotTitle && (
//             <DialogTitle sx={dialogDrawerStyle?.header}>
//               <span>{header}</span>{' '}
//               {/* <img src="/images/close.svg" alt="close" onClick={onClose} style={{ cursor: 'pointer' }} /> */}
//             </DialogTitle>
//           )}

//           <Box
//             height={height ?? 'auto'}
//             overflow="auto"
//             padding={padding ?? 2}
//             sx={{ ...dialogDrawerStyle.component, ...height_style }}
//           >
//             {component ?? drawerComponent}
//           </Box>
//           {footer && (
//             <DialogActions>
//               <Box sx={dialogDrawerStyle?.footer}>{footer}</Box>
//             </DialogActions>
//           )}
//         </Drawer>
//       </Hidden>
//     </Box>
//   );
// }
// export { DialogDrawer };
