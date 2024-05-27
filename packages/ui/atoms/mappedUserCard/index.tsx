import type { SxProps, Theme } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';

import { mappedUserCardStyle } from './style';
import { useAdminLanding } from '@core/store';

export interface MappedUserCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  altText?: any;
  dataMaster?: any;
  accessSection?: boolean;
}

export const MappedUserCard = (props: MappedUserCardProps): JSX.Element => {
  const { className = '', sx = {}, altText, dataMaster, accessSection = true, ...rest } = props;

  // cons

  // const { createEditAdmin } = useAdminLanding();
  // const dataList = dataMaster;
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
      {Array.isArray(dataMaster) &&
        dataMaster.map((x: any, index: number) => (
          <Box key={index} sx={mappedUserCardStyle.main}>
            <Box sx={mappedUserCardStyle.subProfile}>
              <Avatar sx={mappedUserCardStyle.avatar} alt={x?.name} src="/broken-image.jpg" />
              <Box>
                <Typography sx={mappedUserCardStyle.title}>{x?.name}</Typography>
                {accessSection && (
                  <Typography sx={{ fontSize: '12px', color: '#818181', ...mappedUserCardStyle.designationTxt }}>
                    {x?.access.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
};
