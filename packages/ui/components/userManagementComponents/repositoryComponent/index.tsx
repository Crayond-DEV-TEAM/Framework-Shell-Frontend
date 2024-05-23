import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import Ajv from 'ajv';
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
    setEditRepositoryJson,
    editRepository,
    createRepository,
    editRepositoryList,
    onEditLoading,
    RepositoryId,
    setApiToken,
  } = useRepository();
  const { slugs } = useSlug();
  const [values, setValues] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setValues(false);
    setError(false);
  };
  const handleOpen = () => {
    setValues(true);
    // setEditRepositoryJson(RepoJson);
  };

  // ***********  SCHEMA 🚩***********
  const subChildSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      allowed: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['read', 'create', 'delete', 'update'],
        },
        minItems: 0,
      },
      permissions: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['read', 'create', 'delete', 'update'],
        },
        minItems: 0,
      },
    },
    required: ['id', 'name', 'allowed', 'permissions'],
  };

  const childSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      child: { type: 'array', items: subChildSchema, minItems: 1 },
    },
    required: ['id', 'name', 'child'],
  };

  const parentSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      child: { type: 'array', items: childSchema, minItems: 1 },
    },
    required: ['id', 'name', 'child'],
  };

  const jsonSchema = {
    type: 'array',
    items: parentSchema,
  };
  // *******************************

  const ajv = new Ajv();
  const validate = ajv.compile(jsonSchema);
  const handleSave = () => {
    const valid = validate(editRepositoryList);
    if (valid && editRepositoryList?.length > 0) {
      RepositoryId ? editRepository() : createRepository();
      handleClose();
      setError(false);
    } else {
      setError(true);
    }
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
        Bodycomponent={<ConfigureRepo error={error} />}
        handleCloseDialog={handleClose}
        Footercomponent={<FooterComponent onSave={handleSave} onCancel={handleClose} loading={onEditLoading} />}
        dialogRootStyle={repositoryComponentStyle.dialogSx}
      />
    </Box>
  );
};
