import { TreeComponent } from '@atoms/treeComponent';
import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import Ajv from 'ajv';
import { ConfigureRepo } from '..';
import { repositoryComponentStyle } from './style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { TableHeader } from '@components/commonComponents';
import { useRepository, useSlug } from '@core/store';
import { useEffect, useState } from 'react';
import { Repositorysimmer } from './simmer';
import { jsonSchema } from './schema';

export interface RepositoryComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
  apiToken?: string;
}

export const RepositoryComponent = (props: RepositoryComponentProps): JSX.Element => {
  // Note: Remove the default value for apiToken

  const { className = '', sx = {}, apiToken = '', ...rest } = props;

  // ********** Store for Repository ********
  const {
    getAllRepository,
    fetching,
    errorOnFetching,
    RepositoryList,
    setEditRepositoryJson,
    editRepository,
    createRepository,
    editRepositoryList,
    onEditLoading,
    RepositoryId,
    setApiToken,
  } = useRepository();

  // ********* STATES **********
  const { slugs } = useSlug();
  const [values, setValues] = useState(false);
  const [error, setError] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [alignment, setAlignment] = useState<string | null>('tree');

  const handleClose = () => {
    setValues(false);
    setError(false);
  };
  const handleOpen = () => {
    setValues(true);
  };

  //  ********* Schema Validation ***********

  const handleSave = () => {
    const ajv = new Ajv();
    const validate = ajv.compile(jsonSchema);
    const valid = validate(editRepositoryList);
    if (valid && editRepositoryList?.length > 0) {
      RepositoryId ? editRepository() : createRepository();
      handleClose();
      setError(false);
    } else {
      setError(true);
    }
  };
  // import JSON from local client
  const handleImport = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e: any) => {
      setEditRepositoryJson(JSON.parse(e.target.result));
      setEditorKey(editorKey + 1);
    };
    const valid = validate(editRepositoryList);
    valid ? null : setError(true);
  };

  //To change JSON Editor mode
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
    setEditorKey(editorKey + 1);
  };

  useEffect(() => {
    setApiToken(apiToken);
    getAllRepository();
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
      <Box sx={{ padding: '16px' }}>
        <TableHeader
          isFilterRequired={false}
          buttonName={'Configure repo'}
          tableHeader={'Repository'}
          handleOpen={handleOpen}
          isSearchRequired={false}
        />
      </Box>

      <Box sx={{ height: 'calc( 100vh - 237px )', overflow: 'scroll' }}>
        {fetching ? (
          <Repositorysimmer />
        ) : (
          <TreeComponent data={Array.isArray(RepositoryList) ? RepositoryList : [RepositoryList]} />
        )}
      </Box>

      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Configure Repo'}
        Bodycomponent={
          <ConfigureRepo
            error={error}
            handleImport={handleImport}
            editorKey={editorKey}
            handleAlignment={handleAlignment}
            alignment={alignment}
          />
        }
        handleCloseDialog={handleClose}
        Footercomponent={<FooterComponent onSave={handleSave} onCancel={handleClose} loading={onEditLoading} />}
        dialogRootStyle={repositoryComponentStyle.dialogSx}
      />
    </Box>
  );
};
