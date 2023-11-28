import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { idmBackgroundCardStyle } from './style';
import { CutstomizedAutocomplete, Input } from '..';
import { SearchIcon } from '@atoms/icons';
import { useEffect } from 'react';
import { useAdminLanding } from '@core/store';

export interface IdmBackgroundCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  subTitle?: string;
  content: any;
  optionList?: any;
  handleChangeDropDown?: (value: any) => void;
  createEditState?: any;
}

export const IdmBackgroundCard = (props: IdmBackgroundCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    subTitle = '',
    content,
    optionList,
    createEditState,
    handleChangeDropDown = () => false,
    ...rest
  } = props;

  // const testfunction = () => {
  //   const checkData =
  //     createEditState ===
  //     {
  //       id: '',
  //       name: '',
  //       rolename: '',
  //     }
  //       ? createEditState
  //       : handleChangeDropDown(optionList?.[0]);
  // };
  // useEffect(() => {
  //   testfunction();
  // }, []);

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
        <CutstomizedAutocomplete
          sx={{
            '& .MuiOutlinedInput-root': {
              width: '150px',
            },
          }}
          value={createEditState}
          permissionList={optionList}
          onChange={(e: any) => handleChangeDropDown(e)}
        />
      </Box>
      <Box>{content}</Box>
    </Box>
  );
};
