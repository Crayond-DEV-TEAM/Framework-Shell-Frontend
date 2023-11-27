import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
// import locale from 'react-json-editor-ajrm/locale/en';
import { jsonViewerStyle } from './style';
// import sampleData from './utils';
import { useState } from 'react';
import { localeEn } from './utils';
import { useRepository } from '@core/store';

export interface JsonViewerProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  onChange?: any;
}

export const JsonViewer = (props: JsonViewerProps): JSX.Element => {
  const { className = '', sx = {}, data = [], onChange = {}, ...rest } = props;
  const { seteditRepository } = useRepository();
  const onChange1 = (data: any) => {
    onChange(data.jsObject);
    seteditRepository(data.jsObject);
  };
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
        placeholder={data}
        theme="light_mitsuketa_tribute"
        locale={localeEn}
        colors={{
          string: '#357968',
        }}
        onChange={(e: any) => onChange1(e)}
        height="296px"
        width="100%"
      />
    </Box>
  );
};
