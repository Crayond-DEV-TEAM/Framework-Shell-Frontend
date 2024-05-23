import type { SxProps, Theme } from '@mui/material';
import { Box, Button, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { configureRepoStyle } from './style';
import { JsonViewer } from '@atoms/jsonViewer';
import { useRepository } from '@core/store';
import { useEffect, useState } from 'react';
import { Textarea } from '@contentful/forma-36-react-components';

export interface ConfigureRepoProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  onChange?: any;
  handleImport?: any;
  error?: boolean;
}

export const ConfigureRepo = (props: ConfigureRepoProps): JSX.Element => {
  const { className = '', sx = {}, data = [], onChange = {}, error = false, ...rest } = props;
  const { setEditRepositoryJson, editRepositoryList } = useRepository();
  const [editorKey, setEditorKey] = useState(0);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';
    link.click();
  };

  const handleImport = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e: any) => {
      setEditRepositoryJson(JSON.parse(e.target.result));
      setEditorKey(editorKey + 1);
    };
  };

  return (
    <Box
      sx={[
        {
          ...configureRepoStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={configureRepoStyle.titlebar}>
        <Typography sx={configureRepoStyle.json}>JSON</Typography>

        <Box sx={configureRepoStyle.rightActionSx}>
          <label
            htmlFor="formId"
            style={{
              fontSize: '14px',
              color: '#357968',
              border: '1px solid #357968',
              padding: '2px 10px',
              borderRadius: '6px',
            }}
          >
            {' '}
            <SaveAltIcon sx={configureRepoStyle.iconSx} /> Import
          </label>
          <input name="upload" onChange={handleImport} type="file" id="formId" hidden />

          <Typography sx={configureRepoStyle.download} onClick={exportData}>
            Download Sample Json
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '8px' }} />
      {error && <Typography sx={configureRepoStyle.errorTxt}> invalid json</Typography>}

      <Box sx={{ height: '30%' }}>
        <JsonViewer editorKey={editorKey} data={editRepositoryList} onChange={(e: any) => setEditRepositoryJson(e)} />
      </Box>
    </Box>
  );
};
