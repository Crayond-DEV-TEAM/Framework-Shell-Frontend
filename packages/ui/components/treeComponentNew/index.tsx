import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { treeComponentNewStyle } from './style';

export interface TreeComponentNewProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const TreeComponentNew=(props: TreeComponentNewProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...treeComponentNewStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>TreeComponentNew component</Typography>
    </Box>
  );
}





