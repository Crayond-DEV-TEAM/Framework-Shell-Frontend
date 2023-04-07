import type { SxProps } from '@mui/material';

interface SideBarStyleProps {
  [key: string]: SxProps;
}

export const sideBarStyle: SideBarStyleProps = {
  drawerSx: {
    '& .MuiDrawer-paper': {
      mt: '56px',
    },
  },
  mainSx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'primary.contrastText',
  },
  email: {
    fontSize: '10px',
    fontWeight: 300,
    color: 'primary.contrastText',
  },
  profileSec: {
    display: 'flex',
    alignItems: 'center',
  },
  menutext: {
    pl: 0.5,
    fontSize: '12px',
    color: 'typography.transparent',
  },
  listheading: {
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 600,
    },
  },
  listSubheading: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      color: 'typography.transparent',
    },
  },
  listing: {
    '& .MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters.MuiListItemButton-root.MuiListItemButton-gutters.css-fok71q-MuiButtonBase-root-MuiListItemButton-root:focus':
      {
        background: '#eaf1f0 0% 0% no-repeat padding-box',
        borderRadius: '6px',
      },
  },
  mainList: {
    '& .MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters.MuiListItemButton-root.MuiListItemButton-gutters.css-w26y8z-MuiButtonBase-root-MuiListItemButton-root:focus':
      {
        background: '#eaf1f0 0% 0% no-repeat padding-box',
      },
  },
  menuSx: {
    pl: 0,
    alignItems: 'center',
    margin: '4px 14px',
    padding: '0px 0px',
    borderRadius: '7px',
    '&:hover': {
      backgroundColor: '#EAF1EF',
    },
  },
  totalBtnSx: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  dividerSx: {
    // border: '0.5px solid',
    // backgroundColor: '#E0E0E0',
    borderColor: '#EAEAEA',
    height: '2px',
    width: '180px',
    margin: '0px auto',
  },
  skeletonSx: {
    padding: '16px',
    margin: '4px 10px',
    backgroundColor: '#eaf1ef',
  },
};
