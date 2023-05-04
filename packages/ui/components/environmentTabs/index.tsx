import { Button } from '@atoms/button';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps, Theme, Popover, Tabs, Tab, Stack, Skeleton, IconButton, MenuItem, Menu } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { AddMessageGroup, Filter } from '..';
import { EnvironmentTabsStyle } from './style';
import Settings from '../../assets/settings';
import { DeleteIcon, EditIcon } from '@atoms/icons';
import { DeleteDailog } from '@atoms/deletedailog';

export interface EnvironmentTabsProps {
  className?: string;
  sx?: SxProps<Theme>;
  selectedId?: any;
  handleTabEdit?: (_e: any, i: number) => void;
  onChange?: (event: any, _e: any) => void;
  handleEnvironmentClose?: (e: string) => void;
  handleAddEnvironment?: (e: string) => void;
  handlemodalClose?: () => void;
  handleDeleteEnvFn?: (e: object) => void;
  handleOpen?: () => void;
  environments?: any;
  selected?: boolean;
  fetching?: boolean;
}
// eslint-disable-next-line react/display-name
export const EnvironmentTabs = forwardRef((props: EnvironmentTabsProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    handleTabEdit = () => false,
    handleEnvironmentClose = () => false,
    handleAddEnvironment = () => false,
    selectedId = false,
    onChange = () => false,
    environments = [],
    fetching = false,
    selected = false,
    handleDeleteEnvFn = () => false,
    handleOpen = () => false,
    handlemodalClose = () => false,
    ...rest
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={[
        {
          ...EnvironmentTabsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems={'center'} sx={EnvironmentTabsStyle.tabsSx}>
          {Array.isArray(environments) && environments?.length > 0 ? (
            environments?.map((_e: any, i: any) => {
              return (
                <Box onClick={() => onChange(_e, i)} key={i}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    sx={selectedId === _e?.id ? EnvironmentTabsStyle.selectedSx : EnvironmentTabsStyle.unSelectedSx}
                  >
                    <Typography>{_e.name}</Typography>
                    <IconButton
                      disableRipple
                      onClick={handleClick}
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      {<Settings />}
                    </IconButton>
                  </Stack>
                  <Menu
                    open={open}
                    id="demo-positioned-menu"
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    sx={EnvironmentTabsStyle.menuSx}
                  >
                    <MenuItem sx={{ justifyContent: 'space-between' }}>
                      <Typography
                        sx={EnvironmentTabsStyle.menutext}
                        id="stopPropagation"
                        onClick={(event) => {
                          if (event.currentTarget.id === 'stopPropagation') {
                            handleTabEdit(_e, i);
                          }
                        }}
                      >
                        Edit
                      </Typography>
                      <IconButton disableRipple sx={{ p: 0 }}>
                        <EditIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      </IconButton>
                    </MenuItem>
                    <MenuItem onClick={handleOpen} sx={{ justifyContent: 'space-between' }}>
                      <Typography sx={EnvironmentTabsStyle.menutext}>Delete</Typography>
                      <IconButton disableRipple sx={{ p: 0 }}>
                        <DeleteIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      </IconButton>
                    </MenuItem>
                    <DeleteDailog
                      isDialogOpened={selected}
                      Bodycomponent={
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this ??</Typography>
                          <Box sx={EnvironmentTabsStyle.totalFooterSx}>
                            <Box sx={EnvironmentTabsStyle.btnSx}>
                              <Box sx={EnvironmentTabsStyle.btnBg}>
                                <Button buttonStyle={EnvironmentTabsStyle.cancelbtnText} onClick={handlemodalClose}>
                                  Cancel
                                </Button>
                              </Box>
                              <Box sx={EnvironmentTabsStyle.savebtnBg}>
                                <Button
                                  buttonStyle={EnvironmentTabsStyle.savebtnText}
                                  onClick={() => handleDeleteEnvFn(_e)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                  </Menu>
                </Box>
              );
            })
          ) : (
            <Box>
              {fetching && (
                <Stack direction={'row'} spacing={0.25} px={2}>
                  {Array.from(Array(10).keys()).map((_) => (
                    <Skeleton height={40} width={80} key={_} />
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
});
