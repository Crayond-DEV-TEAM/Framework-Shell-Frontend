import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { idmBackgroundCardStyle } from './style';
import { CutstomizedAutocomplete, Input } from '..';
import { SearchIcon } from '@atoms/icons';
import { useEffect } from 'react';

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

  console.log(createEditState);
  console.log(optionList);

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
  //   console.log(checkData, 'pls');
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
          value={
            createEditState
            // {
            //   id: '',
            //   name: '',
            //   rolename: '',
            // }
            //   ? createEditState
            //   : optionList?.[0]
          }
          // value={createEditState.name === '' ? createEditState.name : []}
          permissionList={optionList}
          onChange={(e: any) => handleChangeDropDown(e)}
        />
      </Box>
      <Box>{content}</Box>
    </Box>
  );
};
