import type { SxProps, Theme } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';

import { mappedUserCardStyle } from './style';

export interface MappedUserCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  altText?: any;
}

export const MappedUserCard = (props: MappedUserCardProps): JSX.Element => {
  const { className = '', sx = {}, altText, ...rest } = props;

  console.log(altText, 'altText');

  return (
    <Box
      sx={[
        {
          ...mappedUserCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      {altText.map((x: any, index: number) => (
        <Box key={index} sx={mappedUserCardStyle.main}>
          <Box sx={mappedUserCardStyle.subProfile}>
            <Avatar sx={mappedUserCardStyle.avatar} alt={x?.name} src="/broken-image.jpg" />
            <Typography sx={mappedUserCardStyle.title}>{x?.name}</Typography>
          </Box>
          <Typography sx={{ fontSize: '12px', color: '#818181' }}>{x?.access}</Typography>
        </Box>
      ))}
    </Box>
  );
};