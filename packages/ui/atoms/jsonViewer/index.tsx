import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { jsonViewerStyle } from './style';
import sampleData from './utils';

export interface JsonViewerProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const JsonViewer = (props: JsonViewerProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...jsonViewerStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <JSONInput
        placeholder={sampleData} // data to display
        theme="light_mitsuketa_tribute"
        locale={locale}
        colors={{
          string: '#357968', // overrides theme colors with whatever color value you want
        }}
        height="296px"
        width="100%"
      />
    </Box>
  );
};
