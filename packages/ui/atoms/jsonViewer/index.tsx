import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
// import locale from 'react-json-editor-ajrm/locale/en';
import { jsonViewerStyle } from './style';
// import sampleData from './utils';
import { useState } from 'react';
import { localeEn } from './utils';

export interface JsonViewerProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  onChange?: any;
}

export const JsonViewer = (props: JsonViewerProps): JSX.Element => {
  const { className = '', sx = {}, data = [], onChange = {}, ...rest } = props;
  // const [change, setChange] = useState({
  //   list: props.data,
  //   edit
  // });
  console.log('dfdf');
  const onChange1 = (data: any) => {
    console.log(')))))', data);
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
        // id={1}
        placeholder={data} // data to display
        theme="light_mitsuketa_tribute"
        locale={localeEn}
        colors={{
          string: '#357968', // overrides theme colors with whatever color value you want
        }}
        onChange={(e: any) => onChange1(e)}
        height="296px"
        width="100%"
      />
      {/* <ReactJson
        src={data}
        onEdit={(e: any) => onChange1(e)}
        // onDelete={handleJsonChange}
        // onAdd={handleJsonChange}
        displayDataTypes={false}
        enableClipboard={false}
        indentWidth={2}
        theme="rjv-default"
        locale={locale}
      />
      ; */}
    </Box>
  );
};
