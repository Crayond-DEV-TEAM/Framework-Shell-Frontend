import { Button } from '@atoms/button';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps, Theme, Popover, Tabs, Tab, Stack } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { AddMessageGroup, Filter } from '..';
import DownloadIcon from '@core/ui/assets/downloadIcon';
import XlsIcon from '@core/ui/assets/xlsIcon';
import { EnvironmentTabsStyle } from './style';
import { TabPanel } from '@mui/lab';
import Settings from '../../assets/settings';
import { tabs } from '@core/store/utils';

export interface EnvironmentTabsProps {
  className?: string;
  sx?: SxProps<Theme>;
  selected?: number;
  handleTabEdit?: (event: any, _e: any) => void;
  onChange?: (event: any, _e: any) => void;
  handleEnvironmentClose?: (e: string) => void;
  handleAddEnvironment?: (e: string) => void;
  environments?: any;
}

const handleTabEdit = (e: any) => {
  console.log(e);
};

// eslint-disable-next-line react/display-name
export const EnvironmentTabs = forwardRef((props: EnvironmentTabsProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    handleTabEdit = () => false,
    handleEnvironmentClose = () => false,
    handleAddEnvironment = () => false,
    selected = false,
    onChange = () => false,
    environments = [],
    ...rest
  } = props;

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
          {environments?.map((_e: any, i: any) => {
            return (
              <Box onClick={() => onChange(_e, i)} key={i}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  sx={selected === i ? EnvironmentTabsStyle.selectedSx : EnvironmentTabsStyle.unSelectedSx}
                >
                  <Typography>{_e.name}</Typography>
                  <Box
                    id="stopPropagation"
                    onClick={(event) => {
                      if (event.currentTarget.id === 'stopPropagation') {
                        handleTabEdit(event, _e);
                      }
                    }}
                  >
                    {<Settings />}
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
});
