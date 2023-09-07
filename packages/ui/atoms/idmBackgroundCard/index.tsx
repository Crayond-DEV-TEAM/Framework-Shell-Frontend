import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { idmBackgroundCardStyle } from './style';
import { CutstomizedAutocomplete, Input } from '..';
import { SearchIcon } from '@atoms/icons';

export interface IdmBackgroundCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title: string;
  subTitle: string;
  content: any;
}

export const IdmBackgroundCard = (props: IdmBackgroundCardProps): JSX.Element => {
  const { className = '', sx = {}, title = '', subTitle = '', content, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...idmBackgroundCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={idmBackgroundCardStyle.header}>
        <Typography sx={idmBackgroundCardStyle.title}>{title}</Typography>
        <CutstomizedAutocomplete />
      </Box>
      <Box>{content}</Box>
    </Box>
  );
};
