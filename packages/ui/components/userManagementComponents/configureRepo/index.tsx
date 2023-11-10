import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { configureRepoStyle } from './style';
import { JsonViewer } from '@atoms/jsonViewer';

export interface ConfigureRepoProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  onChange?: any;
}

export const ConfigureRepo = (props: ConfigureRepoProps): JSX.Element => {
  const { className = '', sx = {}, data = [], onChange = {}, ...rest } = props;
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';
    link.click();
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
        <Typography sx={configureRepoStyle.download} onClick={exportData}>
          Download Sample Json
        </Typography>
      </Box>
      <Box sx={{ padding: '8px' }} />
      <Box sx={{ height: '30%' }}>
        <JsonViewer data={data} onChange={(e: any) => e} />
      </Box>
    </Box>
  );
};
