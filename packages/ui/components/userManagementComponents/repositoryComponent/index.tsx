import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { repositoryComponentStyle } from './style';
import { ConfigureRepo } from '..';
// import { TreeComponent } from '@atoms/treeComponent';
// import { Table as CommonTable } from '@crayond_dev/ui_table';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView } from '@crayond_dev/ui_tree-view';
// import { RepoJson, books } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useEffect, useState } from 'react';
import { useRepository, useSlug } from '@core/store';
import { RepoJson } from './utils';
import { Repositorysimmer } from './simmer';
import { TableHeader } from '@components/commonComponents';
import { CollapseIcon, ExpandIcon, InfoIcon, SettingIcon } from '@atoms/icons';

export interface RepositoryComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  apiToken?: string;
}

export const RepositoryComponent = (props: RepositoryComponentProps): JSX.Element => {
  // Note: Remove the default value for apiToken
  const { className = '', sx = {}, apiToken = '', ...rest } = props;
  const {
    getAllRepository,
    fetching,
    errorOnFetching,
    RepositoryList,
    seteditRepository,
    editRepository,
    createRepository,
    editRepositoryList,
    onEditLoading,
    RepositoryId,
    setApiToken,
  } = useRepository();
  const { slugs } = useSlug();
  const [values, setValues] = useState(false);
  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
    // seteditRepository(RepoJson);
  };
  const handleSave = () => {
    RepositoryId ? editRepository() : createRepository();
    handleClose();
  };

  const handleChange = (e: any) => {
    // console.log('val', e?.jsObject);
    // seteditRepository(e?.jsObject);
  };

  useEffect(() => {
    setApiToken(apiToken);
  }, []);

  useEffect(() => {
    if (slugs?.IDM) {
      getAllRepository();
    }
  }, [slugs?.IDM]);

  return (
    <Box
      sx={[
        {
          ...repositoryComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={{ borderBottom: '1px solid #EAEAEA', padding: '16px' }}>
        <TableHeader
          isFilterRequired={false}
          buttonName={'Configure repo'}
          tableHeader={'Repository'}
          handleOpen={handleOpen}
        />
      </Box>

      <Box sx={{ height: 'calc( 100vh - 237px )', overflow: 'scroll', margin: '20px' }}>
        {fetching ? (
          <Repositorysimmer />
        ) : (
          <TreeView
            checkboxBgColor="primary.main"
            checkboxBorderRadius="2px"
            checkboxHeight="20px"
            checkboxWidth="20px"
            childrenLabelStyle={{
              color: '#29302B',
              fontSize: '14px',
              fontWeight: 500,
            }}
            connectors
            defaultCollapseIcon={<ExpandIcon />}
            defaultExpandIcon={<CollapseIcon />}
            handleChange={handleChange}
            headingSx={{}}
            labelStyle={{
              color: '#29302B',
              fontSize: '14px',
              fontWeight: 600,
            }}
            leftSec={{
              breakpoints: {
                lg: 6,
                md: 6,
                sm: 4,
                xs: 12,
              },
            }}
            parentChildIcon={<InfoIcon />}
            parentIcon={<SettingIcon />}
            permissionHeadingSx={{
              color: '#29302B',
            }}
            rightSec={{
              breakpoints: {
                lg: 6,
                md: 6,
                sm: 8,
                xs: 12,
              },
            }}
            state={RepositoryList}
            subChildLabelStyle={{
              alignItems: 'center',
              color: '#818181',
              display: 'flex',
              fontSize: '12px',
            }}
          />
        )}
      </Box>

      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Configure Repo'}
        Bodycomponent={
          <ConfigureRepo
            data={editRepositoryList}
            onChange={(val: any) => {
              handleChange(val);
            }}
          />
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            // check={true}
            // checked={editMessageList.is_status}
            // SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            onSave={handleSave}
            onCancel={handleClose}
            loading={onEditLoading}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={repositoryComponentStyle.dialogSx}
      />
    </Box>
  );
};
