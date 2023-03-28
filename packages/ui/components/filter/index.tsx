import { FilterIcon } from '@atoms/icons';
import { Popover, SxProps, Theme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, IconButton } from '@mui/material';
import { forwardRef, useState } from 'react';
import React, { useRef } from 'react';
import { filterStyle } from './style';
import { Button } from '@atoms/button';
import Chip from '@mui/material/Chip';
import { CheckBox } from '@atoms/checkBox';
// import { filterContent } from '@core/utils';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';

export interface FilterProps {
  className?: string;
  title?: string;
  SubTitle?: string;
  footer?: Node;
  onChange?: () => void;
  handleChipDelete?: (chip: string, i: any, parentIndex: any) => void;
  filterContent?: any;
  sx?: SxProps<Theme>;
}

export const Filter = forwardRef((props: FilterProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = 'Filter by',
    footer = false,
    SubTitle = 'severity',
    onChange = () => null,
    handleChipDelete = () => null,
    filterContent,
    ...rest
  } = props;

  // General Hooks
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sideContent, setSideContent] = useState<any>(null);
  const [close, setClose] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    index: null,
    editData: null,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //FIlter Function
  const onFilterFunc = (event: any, i: any, data: any) => {
    if (!event) {
      state.index = null;
      state.editData = [];
      setState({ ...state });
      setSideContent(null);
      return;
    }
    state.index = i;
    state.editData = data?.children ?? [];
    setState({ ...state });
    setSideContent(event.currentTarget);
  };

  // HandleCLose
  const handleClose = () => {
    setSideContent(null);
  };

  // filterClose
  const filterClose = () => {
    setAnchorEl(null);
  };

  // on Clear
  const onClear = () => {
    setClose(false);
  };

  // popover Function
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openSide = Boolean(sideContent);
  const idSide = openSide ? 'simple-popover' : undefined;

  // RenderComponents
  const renderComponents = (
    type: any,
    isParent: any,
    parentIndex: any,
    childrenIndex: any,
    option: any,
    handleChange: any,
  ) => {
    const handleChangeFunc = (label: string, value: any, isParent: any, parentIndex: any, childrenIndex: any) => {
      setClose(true);
      handleChange(label, value, isParent, parentIndex, childrenIndex);
    };
    if (type === 'checkbox') {
      return (
        <Box sx={filterStyle.contentBoxSideSx}>
          <CheckBox
            checkStyle={filterStyle.checkBoxSx}
            checked={option?.value}
            onChange={(e) => handleChangeFunc(option?.label, e.target.checked, isParent, parentIndex, childrenIndex)}
            checkSecondStyle={filterStyle.checkSecondBoxSx}
          />
          <Typography
            sx={{
              ...filterStyle.quesSx,
            }}
          >
            {option?.label}
          </Typography>
        </Box>
      );
    } else if (type === 'dateCheckbox') {
      return (
        <Box sx={{ ...filterStyle.contentBoxSideSx, justifyContent: 'space-between', px: 1 }}>
          <Typography
            sx={{
              ...filterStyle.quesSx,
              // fontWeight: option?.selected ? '600' : '400',
            }}
          >
            {option?.label}
          </Typography>
          <CheckBox
            checkStyle={{ ...filterStyle.checkBoxSx, borderRadius: '50px' }}
            checked={option?.value}
            onChange={(e) => handleChangeFunc(option?.label, e.target.checked, isParent, parentIndex, childrenIndex)}
            checkSecondStyle={filterStyle.checkSecondBoxSx}
          />
        </Box>
      );
    } else if (type === 'dateInput') {
      return (
        <Box>
          <Box sx={filterStyle.dateSx}>
            <Box sx={{ p: 1 }}>
              <Typography
                sx={{
                  ...filterStyle.quesSx,
                  ml: 0,
                  pb: 0.75,
                  // fontWeight: option?.selected ? '600' : '400',
                }}
              >
                {option?.label}
              </Typography>
              <Input
                size="small"
                type="date"
                textFieldStyle={filterStyle.dateInputSx}
                value={option?.value ?? ''}
                id="username"
                onChange={(e) => handleChangeFunc(option?.label, e.target.value, isParent, parentIndex, childrenIndex)}
              />
            </Box>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box
      sx={[
        {
          ...filterStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IconButton sx={filterStyle.filterSx} onClick={handleClick}>
        <FilterIcon rootStyle={{ color: '#5A5A5A' }} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={filterStyle.totalFilterSx}
      >
        <Box sx={filterStyle.totalSx}>
          <Typography sx={filterStyle.headerSx}>{title}</Typography>
          <Box sx={filterStyle.contentBoxSx}>
            {filterContent?.map((val: any, i: any) => {
              return (
                <Box key={i}>
                  <Box sx={filterStyle.totalCardSx}>
                    <Box
                      key={i}
                      sx={filterStyle.CardSx}
                      onClick={(e: any) =>
                        val?.children?.length > 0 ? onFilterFunc(e, i, val) : onFilterFunc(null, 0, null)
                      }
                    >
                      <Typography>{val?.name}</Typography>

                      <IconButton disableRipple>
                        <ArrowForwardIosIcon sx={{ color: '#5A5A5A', width: 16, height: 16 }} />
                      </IconButton>
                    </Box>
                    <Box>
                      {val?.children?.length > 0 &&
                        val?.children?.map((chip: any, i: any) => {
                          if (chip.component === 'checkbox' && chip?.value) {
                            return (
                              <Chip
                                size="small"
                                key={i}
                                sx={{ ml: '5px' }}
                                label={chip?.label}
                                // onClick={handleClick}
                                onDelete={() => handleChipDelete(chip?.label, i, state.index)}
                              />
                            );
                          }
                        })}
                    </Box>
                  </Box>

                  {i === state?.index && state?.editData?.length > 0 && (
                    <Popover
                      id={idSide}
                      open={openSide}
                      // open={i === state?.index}
                      anchorEl={sideContent}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      sx={filterStyle.totalFilterSideSx}
                    >
                      {
                        <Box sx={filterStyle.totalSx}>
                          <Typography sx={{ ...filterStyle.headerSx, border: 'none' }}>{val?.name}</Typography>

                          {state?.editData?.map((option: any, index: any) => (
                            <Box key={index}>
                              {renderComponents(
                                option?.component,
                                filterContent[state.index],
                                state.index,
                                index,
                                option,
                                onChange,
                              )}
                            </Box>
                          ))}

                          {footer && (
                            <Box sx={filterStyle.footerSx}>
                              <Box sx={filterStyle.subFooterSx}>
                                <Button buttonStyle={filterStyle.footerCancelBtn}>Cancel</Button>
                                <Button buttonStyle={filterStyle.footerBtn}> Apply</Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      }
                    </Popover>
                  )}
                </Box>
              );
            })}
            <Box sx={filterStyle.footerSx}>
              <Box sx={filterStyle.clearSx}>
                <Box sx={{ ...filterStyle.clearSX, justifyContent: close ? 'space-between' : 'end' }}>
                  {close && (
                    <Button buttonStyle={filterStyle.footerClearSx} onClick={onClear}>
                      Clear All
                    </Button>
                  )}
                  <Box sx={filterStyle.subFooterSx}>
                    <Button buttonStyle={filterStyle.footerCancelBtn} onClick={filterClose}>
                      Cancel
                    </Button>
                    <Button buttonStyle={filterStyle.footerBtn}> Apply</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
});

Filter.displayName = 'Filter';
