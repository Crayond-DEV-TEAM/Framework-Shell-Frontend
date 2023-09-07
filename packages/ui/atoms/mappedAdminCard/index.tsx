import type { SxProps, Theme } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';

import { mappedAdminCardStyle } from './style';
import { DropDown } from '..';

export interface MappedAdminCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  options?: any;
}

export const MappedAdminCard = (props: MappedAdminCardProps): JSX.Element => {
  const { className = '', sx = {}, options, ...rest } = props;
  // const altText = [
  //   { title: 'text', access: 'Full Access' },
  //   { title: 'text dem', access: 'Restricted' },
  //   { title: 're text', access: 'Restricted' },
  // ];

  return (
    <Box
      sx={[
        {
          ...mappedAdminCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      {/* {options.map((x: any, index: number) => ( */}
      <Box sx={mappedAdminCardStyle.main}>
        <Box sx={mappedAdminCardStyle.subProfile}>
          <Avatar sx={mappedAdminCardStyle.avatar} alt={options} src="/broken-image.jpg" />
          <Typography sx={mappedAdminCardStyle.title}>{options}</Typography>
        </Box>
        {/* <DropDown /> */}
        {/* <Typography sx={{ fontSize: '12px', color: '#818181' }}>{x?.access}</Typography> */}
      </Box>
      {/* ))} */}
    </Box>
  );
};
