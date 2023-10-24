import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FilterSvg from '@core/ui/assets/svgIcons/filterIcon';
import AddSvg from '@core/ui/assets/svgIcons/add';
import { subHeader_Style } from './style';
import { SearchTextField } from '@components/messageCatlogue'

export interface SubHeaderProps {
  handleClick?: any;
  addIcon?: JSX.Element;
  searchFilter?: JSX.Element;
  filterIcon?: JSX.Element;
  calendar?: JSX.Element;
  title?: React.ReactNode;
  data?: any;
  i?: any;
  sx?: SxProps<Theme>;
  handleClose?: () => void;
  handleSubmit?: any;
}

export function SubHeader(props: SubHeaderProps): JSX.Element {
  const [selectbtn, setSelectbtn] = React.useState('Weekly');
  const calendar = [
    {
      label: 'Weekly',
      value: 'weekly',
    },
    {
      label: 'Monthly',
      value: 'monthly',
    },
  ];

  return (
    <Box sx={subHeader_Style.header}>
      <Stack sx={subHeader_Style.headerFlex} direction="row" alignItems="center" justifyContent="space-between">
        {<Typography sx={subHeader_Style.title}>{props?.title}</Typography>}
        <Stack direction="row" sx={subHeader_Style.calendarSm}>
          {props?.calendar && (
            <Stack direction="row" alignItems="center" sx={subHeader_Style.calbtnGrp}>
              {calendar?.map((e, i, index: any) => {
                return (
                  <Box key={index}>
                    <Typography
                      sx={selectbtn === e.label ? subHeader_Style.buttontextClick : subHeader_Style.buttonText}
                      key={i}
                      onClick={() => setSelectbtn(e.label)}
                    >
                      {e?.label}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          )}
          <Stack direction="row" alignItems="center">
            {props?.filterIcon && (
              <Box sx={subHeader_Style.filterIconBox} mr={2}>
                <FilterSvg />
              </Box>
            )}
            {props?.searchFilter && (
              <Stack direction="row" alignItems="center">
                <SearchTextField placeholder="Search by Name" />
              </Stack>
            )}
            {props?.addIcon && (
              <Box sx={subHeader_Style.addIconBox} ml={2} onClick={props?.handleClick}>
                <AddSvg />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
