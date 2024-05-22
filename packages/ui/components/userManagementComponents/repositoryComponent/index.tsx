import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { repositoryComponentStyle } from './style';
import { ConfigureRepo } from '..';
import { TreeComponent } from '@atoms/treeComponent';
// import { RepoJson, books } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useEffect, useState } from 'react';
import { useRepository, useSlug } from '@core/store';
import { RepoJson } from './utils';
import { Repositorysimmer } from './simmer';
import { TableHeader } from '@components/commonComponents';

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
          isSearchRequired={false}
        />
      </Box>

      <Box sx={{ height: 'calc( 100vh - 237px )', overflow: 'scroll' }}>
        {fetching ? <Repositorysimmer /> : <TreeComponent data={RepositoryList} />}
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
