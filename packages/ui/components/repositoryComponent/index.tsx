import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { repositoryComponentStyle } from './style';
import { ConfigureRepo, TableHeader } from '..';
import { TreeComponent } from '@atoms/treeComponent';
// import { RepoJson, books } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useEffect, useState } from 'react';
import { useRepository } from '@core/store';
import { RepoJson } from './utils';
import { Repositorysimmer } from './simmer';

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
    setApiToken,
  } = useRepository();
  const [values, setValues] = useState(false);
  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
    seteditRepository(RepoJson);
  };
  const handleSave = () => {
    editRepository();
    handleClose();
  };

  useEffect(() => {
    setApiToken(apiToken);
  }, []);

  useEffect(() => {
    getAllRepository();
  }, []);

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

      <Box sx={{ height: 'calc( 100vh - 237px )', overflow: 'scroll' }}>
        {fetching ? <Repositorysimmer /> : <TreeComponent data={RepositoryList} />}
      </Box>

      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Configure Repo'}
        Bodycomponent={<ConfigureRepo data={editRepositoryList} />}
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
