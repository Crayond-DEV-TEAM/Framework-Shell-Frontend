import type { SxProps, Theme } from '@mui/material';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DownloadIcon from '@mui/icons-material/Download';
import { configureRepoStyle } from './style';
import { JsonViewer } from '@atoms/jsonViewer';
import { useRepository } from '@core/store';
import { useEffect, useState } from 'react';
import { Textarea } from '@contentful/forma-36-react-components';
import { sample } from '../repositoryComponent/schema';

export interface ConfigureRepoProps {
  className?: string;
  sx?: SxProps<Theme>;
  handleImport?: any;
  editorKey?: any;
  handleAlignment?: any;
  alignment?: any;
  error?: boolean;
}

export const ConfigureRepo = (props: ConfigureRepoProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    error = false,
    handleImport,
    editorKey,
    handleAlignment,
    alignment,
    ...rest
  } = props;
  const { setEditRepositoryJson, editRepositoryList } = useRepository();

  const modes = ['tree', 'code', 'text'];

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(sample))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';
    link.click();
  };

  return (
    <Box sx={configureRepoStyle.rootSx}>
      <Box sx={configureRepoStyle.titlebar}>
        <Typography sx={configureRepoStyle.json} mr={5}>
          JSON
        </Typography>
        <Box sx={configureRepoStyle.rightActionSx}>
          <label
            htmlFor="formId"
            style={{
              fontSize: '14px',
              color: '#357968',
              border: '.5px solid #99bbb3',
              padding: '4.8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {' '}
            <SaveAltIcon sx={configureRepoStyle.iconSx} /> Import
          </label>
          <input name="upload" onChange={handleImport} type="file" id="formId" hidden />

          <Button variant="outlined" sx={configureRepoStyle.download} onClick={exportData}>
            <DownloadIcon sx={{ ...configureRepoStyle.iconSx, mr: 0.5 }} />
            Download Sample Json
          </Button>
        </Box>
      </Box>
      <Box sx={{ padding: '8px' }} />

      {error && <Typography sx={configureRepoStyle.errorTxt}> invalid json</Typography>}

      <Box sx={{ pt: 1, position: 'relative' }}>
        <Box sx={{ position: 'absolute', zIndex: 100, pt: 0.2, left: { sm: '84%', lg: '28%' } }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={configureRepoStyle.toggleButtonSx}
          >
            {modes.map((mode) => (
              <ToggleButton value={mode} aria-label={`${mode} aligned`}>
                {mode}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <JsonViewer
          editorKey={editorKey}
          mode={alignment}
          data={editRepositoryList}
          onChange={(e: any) => setEditRepositoryJson(e)}
        />
      </Box>
    </Box>
  );
};
