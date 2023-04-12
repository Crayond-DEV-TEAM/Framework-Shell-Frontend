import { ArrowDown, ArrowRight, FilterIcon, SearchIcon } from '@atoms/icons';
import { Popover, SxProps, Theme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { DropDown } from '@atoms/dropDown';
import { Drawer } from '@atoms/drawer';
import { useMessageGroupDetails } from '@core/store';

export interface FilterProps {
  className?: string;
  title?: string;
  SubTitle?: string;
  footer?: Node;
  onChange?: () => void;
  onApply?: () => void;
  handleChipDelete?: (chip: string, i: any, parentIndex: any) => void;
  filterContent?: any;
  sx?: SxProps<Theme>;
}

export const Filter = forwardRef((props: FilterProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = 'Filter',
    footer = false,
    SubTitle = 'severity',
    onChange = () => null,
    onApply = () => false,
    handleChipDelete = () => null,
    filterContent,
    ...rest
  } = props;
  const { clearfilter } = useMessageGroupDetails();
  // General Hooks
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sideContent, setSideContent] = useState<any>(null);
  const [clear, setClear] = useState(false);
  const [isFilter, setIsFilter] = useState(null);
  const [state, setState] = useState<any>({
    index: null,
    editData: null,
  });
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClosed = () => {
    setOpen(false);
  };

  const onApplyBtn = () => {
    onApply();
    setSideContent(null);
    setAnchorEl(null);
    handleClosed();
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
    setIsFilter(event.currentTarget);
    setClear(true);
  };

  // HandleCLose
  const handleClose = () => {
    setSideContent(null);
    setOpen(false);
  };

  // filterClose
  const filterClose = () => {
    setAnchorEl(null);
  };

  // on Clear
  const onClear = () => {
    debugger;
    setClear(false);
    clearfilter();
  };

  // RenderComponents
  const renderComponents = (
    type: string,
    isParent: any,
    parentIndex: number,
    childrenIndex: number,
    option: any,
    handleChange: any,
  ) => {
    const handleChangeFunc = (label: string, value: any, isParent: any, parentIndex: any, childrenIndex: any) => {
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
    } else if (type === 'searchField') {
      return (
        <Box sx={filterStyle.searchSx}>
          <Input
            placeholder="search"
            value={option?.value ?? ''}
            onChange={(e) => handleChangeFunc(option?.label, e.target.value, isParent, parentIndex, childrenIndex)}
            startAdornment={<SearchIcon sx={{ fontSize: '16px', color: '#818181' }} />}
          />
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

      <Drawer
        show={open}
        onCloseDrawer={handleClose}
        anchor="right"
        drawerStyleSX={filterStyle.drawerBody}
        drawerRightClose
        header={title}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        footerStyle={{ borderTop: '0px', py: 2.8, px: 2 }}
        footer={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={filterStyle.footerSx}>
              <Box sx={filterStyle.clearSx}>
                <Box sx={{ ...filterStyle.clearSX, justifyContent: clear ? 'space-between' : 'end' }}>
                  {clear && (
                    <Button buttonStyle={filterStyle.footerClearSx} onClick={onClear}>
                      Clear All
                    </Button>
                  )}
                  <Box sx={filterStyle.subFooterSx}>
                    <Button buttonStyle={filterStyle.footerCancelBtn} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button buttonStyle={filterStyle.footerBtn} onClick={onApplyBtn}>
                      Apply
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      >
        <Box sx={filterStyle.totalDrawerSx}>
          <Box sx={filterStyle.contentBoxSx}>
            {filterContent?.map((val: any, index: any) => {
              return (
                <Box key={index}>
                  <Box sx={filterStyle.totalCardSx}>
                    <Box
                      key={index}
                      sx={filterStyle.CardSx}
                      onClick={(e: any) =>
                        val?.children?.length > 0 ? onFilterFunc(e, index, val) : onFilterFunc(null, 0, null)
                      }
                    >
                      <Typography>{val?.name}</Typography>
                      {index === state?.index ? (
                        <IconButton disableRipple sx={{ p: 0 }}>
                          <ArrowDown rootStyle={{ mt: '6px' }} />
                        </IconButton>
                      ) : (
                        <IconButton disableRipple sx={{ p: 0 }}>
                          <ArrowRight rootStyle={{ mt: '6px' }} />
                        </IconButton>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {val?.children?.length > 0 &&
                        val?.children?.map((chip: any, i: any) => {
                          if (chip.component === 'checkbox' && chip?.value) {
                            return (
                              <>
                                <Chip
                                  size="small"
                                  key={i}
                                  sx={{ ml: '5px', mb: 1, borderRadius: '6px' }}
                                  label={chip?.label}
                                  // onClick={handleClick}
                                  onDelete={() => handleChipDelete(chip?.label, i, state.index)}
                                />
                              </>
                            );
                          }
                        })}
                      {index === 0 && val?.children?.some((v: any) => v?.value === true) && (
                        <Box
                          sx={{
                            ...filterStyle.footerClearSx,
                            width: '54px',
                            borderRadius: '6px',
                            p: '2px 3px',
                            textAlign: 'center',
                            ml: 1,
                            mb: 1,
                          }}
                          onClick={onClear}
                        >
                          Clear All
                        </Box>
                      )}
                    </Box>
                    {index === state?.index &&
                      state?.editData?.length > 0 &&
                      (isFilter ? (
                        <Box sx={filterStyle.totalSx}>
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

                          {/* {footer && (
                            <Box sx={filterStyle.footerSx}>
                              <Box sx={filterStyle.subFooterSx}>
                                <Button buttonStyle={filterStyle.footerCancelBtn}>Cancel</Button>
                                <Button buttonStyle={filterStyle.footerBtn}>Apply</Button>
                              </Box>
                            </Box>
                          )} */}
                        </Box>
                      ) : (
                        ''
                      ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
});

Filter.displayName = 'Filter';
