// import type { SxProps, Theme } from '@mui/material';
// import { Button, Dialog, DialogTitle, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { Box } from '@mui/system';
// import React from 'react';

// //import { forwardRef } from 'react';
// import { dialogDrawerStyle } from './style';

// export interface DialogDrawerProps {
//   className?: string;
//   sx?: SxProps<Theme>;
//   open: boolean;
//   onClose: () => void;
//   maxWidth?: boolean;
//   width?: string;
//   isnotTitle?: boolean;
//   header?: string;
//   height?: string;
//   padding?: string;
//   height_style?: string;
//   component?: React.ReactNode;
//   drawerComponent?: React.ReactNode;
//   dialogComponent?: React.ReactNode;
//   footer: string;
// }

// //export const DialogDrawer = forwardRef((props: DialogDrawerProps): JSX.Element => {
// function DialogDrawer(props: DialogDrawerProps): JSX.Element {
//   const {
//     className = '',
//     sx = {},
//     // open = false,
//     // onClose = () => false,
//     // //maxWidth = false,
//     // //width = '',
//     // isnotTitle = false,
//     // header = '',
//     // height = '',
//     // padding = '',
//     // // height_style = '',
//     // component = false,
//     // drawerComponent = false,
//     // dialogComponent = false,
//     // footer = '',
//     ...rest
//   } = props;
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDialog = () => {
//     setIsDialogOpen((prevState) => !prevState);
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen((prevState) => !prevState);
//   };

//   return (
//     <React.Fragment>
//       <Box
//         sx={[
//           {
//             ...dialogDrawerStyle.rootSx,
//           },
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//         className={`${className}`}
//         //ref={ref}
//         {...rest}
//       >
//         <div>
//           <Button onClick={toggleDialog}>Open Dialog</Button>
//           <Dialog open={isDialogOpen} onClose={toggleDialog}>
//             <DialogTitle>Dialog Title</DialogTitle>
//             <p>Dialog Content</p>
//           </Dialog>

//           <Button onClick={toggleDrawer}>Open Drawer</Button>
//           <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
//             <List>
//               <ListItem button>
//                 <ListItemText primary="Drawer Item 1" />
//               </ListItem>
//               <ListItem button>
//                 <ListItemText primary="Drawer Item 2" />
//               </ListItem>
//               <ListItem button>
//                 <ListItemText primary="Drawer Item 3" />
//               </ListItem>
//             </List>
//           </Drawer>
//         </div>
//         ;
//       </Box>
//     </React.Fragment>
//   );
// }
// export { DialogDrawer };
