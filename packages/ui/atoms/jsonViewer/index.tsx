import '@contentful/forma-36-react-components/dist/styles.css';
import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { jsonViewerStyle } from './style';

export interface JsonViewerProps {
  className?: string;
  sx?: SxProps<Theme>;
  data?: any;
  onChange?: any;
  editorKey?: any;
  mode?: any;
}

export const JsonViewer = (props: JsonViewerProps): JSX.Element => {
  const { className = '', sx = {}, data = [], mode, onChange = () => undefined, editorKey, ...rest } = props;

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
      <Editor
        key={editorKey}
        mode={mode}
        history
        value={data}
        onChange={(e: any) => onChange(e)}
        ace={ace}
        theme="ace/theme/github"
      />
    </Box>
  );
};
