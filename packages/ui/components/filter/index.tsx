import { ArrowDown, ArrowRight, FilterIcon, SearchIcon } from '@atoms/icons';
import { Popover, SxProps, Theme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography, IconButton } from '@mui/material';
import { Children, forwardRef, useState } from 'react';
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
  onChange?: (
    filterName: 'hashtagFilter' | 'alertTypeFilter' | 'statusFilter' | 'dateFilter',
    id: number,
    value: any,
  ) => void;
  onApply?: () => void;
  clearfilter?: () => void;
  clearSelectedFilterByKey?: (key: string | undefined) => void;
  handleChipDelete?: (chip: string, i: any, parentIndex: any, key: string) => void;
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
    clearfilter = () => false,
    clearSelectedFilterByKey = () => false,
    handleChipDelete = () => null,
    filterContent,
    ...rest
  } = props;

  // const { clearfilter } = useMessageGroupDetails();
  // General Hooks
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [sideContent, setSideContent] = useState<any>(null);
  const [showFilterCircle, setShowFilterCircle] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const onApplyBtn = () => {
    onApply();
    setAnchorEl(null);
    handleClose();
    setShowFilterCircle(true);
  };

  //FIlter Function
  const onFilterFunc = (event: any, i: any, data: any) => {
    if (!event) {
      state.index = null;
      state.editData = [];
      setState({ ...state });
      return;
    }
    state.index = i;
    state.editData = data?.children ?? [];
    setState({ ...state });
    setIsFilter(event.currentTarget);
    setClear(true);
  };

  // HandleCLose
  const handleCancel = () => {
    setShowFilterCircle(false);
    clearfilter();
    setOpen(false);
  };

  // filterClose
  const filterClose = () => {
    setAnchorEl(null);
  };

  // Clear all the filters
  const onClear = () => {
    setClear(false);
    clearfilter();
  };

  // Clear specific section filters by key
  const onClearByKey = (val: any) => {
    if (val) {
      val.children.forEach((option: any, index: number) => {
        if (option?.component === 'checkbox' && option?.value) {
          onChange(val?.name, index, false);
        }
      });
    }
  };

  // RenderComponents
  const renderComponents = (
    type: string,
    isParent: any,
    parentIndex: number,
    childrenIndex: number,
    option: any,
    parentName: 'hashtagFilter' | 'alertTypeFilter' | 'statusFilter' | 'dateFilter',
    handleChange: any,
  ) => {
    const handleChangeFunc = (
      filterName: 'hashtagFilter' | 'alertTypeFilter' | 'statusFilter' | 'dateFilter',
      id: number,
      value: any,
    ) => {
      handleChange(filterName, id, value);
    };
    if (type === 'checkbox') {
      return (
        <Box sx={filterStyle.contentBoxSideSx}>
          <CheckBox
            checkStyle={filterStyle.checkBoxSx}
            checked={option?.value}
            onChange={(e) => handleChangeFunc(parentName, childrenIndex, e.target.checked)}
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
            onChange={(e) => handleChangeFunc(parentName, childrenIndex, e.target.checked)}
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
                onChange={(e) => handleChangeFunc(parentName, childrenIndex, e.target.value)}
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
            onChange={(e) => handleChangeFunc(parentName, childrenIndex, e.target.value)}
            startAdornment={<SearchIcon sx={{ fontSize: '16px', color: '#818181' }} />}
          />
        </Box>
      );
    }
  };

  console.log('filterContent', filterContent);

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
        {showFilterCircle && <Box component="span" sx={filterStyle.filterCircleSx}></Box>}
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
                    <Button buttonStyle={filterStyle.footerCancelBtn} onClick={handleCancel}>
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
                    {/* Footer section */}
                    <Box
                      key={index}
                      sx={filterStyle.CardSx}
                      onClick={(e: any) =>
                        val?.children?.length > 0 ? onFilterFunc(e, index, val) : onFilterFunc(null, 0, null)
                      }
                    >
                      <Typography>{val?.key}</Typography>
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

                    {/* Selected chip section */}
                    <Box>
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
                                  onDelete={() => handleChipDelete(chip?.label, i, state.index, val?.key)}
                                />
                              </>
                            );
                          }
                        })}

                      {/* Clear the selected all chips */}
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
                          onClick={() => onClearByKey(val)}
                        >
                          Clear All
                        </Box>
                      )}
                    </Box>

                    {/* Component rendering */}
                    {index === state?.index &&
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
                                val?.name,
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
