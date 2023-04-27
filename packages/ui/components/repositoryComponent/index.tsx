import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { repositoryComponentStyle } from './style';
import { ConfigureRepo, TableHeader } from '..';
import { TreeComponent } from '@atoms/treeComponent';
import { RepoJson, books } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useState } from 'react';

export interface RepositoryComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const RepositoryComponent = (props: RepositoryComponentProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);

  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
  };

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
        <TreeComponent data={RepoJson} />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Configure Repo'}
        Bodycomponent={<ConfigureRepo />}
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            // check={true}
            // checked={editMessageList.is_status}
            // SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            // onSave={Edit}
            onCancel={handleClose}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={repositoryComponentStyle.dialogSx}
      />
    </Box>
  );
};
