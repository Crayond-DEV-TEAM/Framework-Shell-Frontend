/* eslint-disable @typescript-eslint/no-empty-function */
import type { SxProps, Theme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { schemaStyle } from './style';
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Checkbox,
  ListItemButton,
  ListItemText,
  useTheme,
  Snackbar,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { KeyboardBackspace } from '@mui/icons-material';
import { property } from 'lodash';
import MappedArrow from '@assets/MappedArrow';
import { Input } from '@atoms/input';
import { useSchemaLoader } from '@core/store';
// import { TextBox } from '../../components';

export interface SchemaMapperProps {
  className?: string;
  isStepper?: boolean;
  sx?: SxProps<Theme>;
}

export interface Schema {
  id: string;
  title: string;
  isEnabled: boolean;
}

// const custom2: any[] = [
//   {
//     id: 'B1',
//     title: 'B-size',
//     isEnabled: true,
//   },
//   {
//     id: 'B2',
//     title: 'B-color',
//     isEnabled: true,
//   },
//   {
//     id: 'B3',
//     title: 'B-company',
//     isEnabled: true,
//   },
//   {
//     id: 'B4',
//     title: 'B-amount',
//     isEnabled: true,
//   },
// ];

export const SchemaMapper = (_props: SchemaMapperProps): JSX.Element => {
  const { vendorSchema, destinatinSchema, fetching, setVendorSchema, setDestinationSchema, updateMappedSchema } =
    useSchemaLoader();

  console.log(vendorSchema);
  const [custom, setCustom] = useState<any>(vendorSchema ? JSON.parse(JSON.stringify(vendorSchema)) : []);
  const [custom2, setCustom2] = useState<any>(destinatinSchema ? JSON.parse(JSON.stringify(destinatinSchema)) : []);
  useEffect(() => {
    fetching && setCustom2(JSON.parse(JSON.stringify(destinatinSchema)));
  }, [fetching]);
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const [vendorJson, setVendorJson] = useState<any>('');

  const [multiData, setmultiData] = useState<any>([]);

  let call;

  const [selected, Setselected] = useState<any>([]);
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState<any>('');
  const [dbsearch, setdbSearch] = useState<any>('');
  const [mapsearch, mapsetSearch] = useState<any>('');

  const [alert, setAlert] = useState<any>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const hiddenFileInput = useRef(null);

  const [checked, setChecked] = useState<any>([]);
  const [desttinationChecked, setDestinationChecked] = useState<any>([]);

  useEffect(() => {
    // submit();
  }, [data2]);

  const mapSchemas = () => {
    if (desttinationChecked.length <= 0) {
      setAlert({
        open: true,
        message: 'Please select a Destination Schema before Mapping',
        backgroundColor: '#FF3232',
      });
    } else {
      custom2.map((x: any) => {
        desttinationChecked.map((z: any) => {
          if (x.id === z.id) {
            x.isEnabled = false;
          }
        });
      });
      custom.map((x: any) => {
        checked.map((z: any) => {
          if (x.id === z.id) {
            x.isEnabled = false;
          }
        });
      });
      submit();
    }
  };

  const Skip = () => {};
  const submit = () => {
    // if (Object.keys(data2).length > 0) {
    //   setChecked([]);
    //   const tempdata = {
    //     uploaddata: checked.map((x: any) => x.title).join(' * '),
    //     dbdata: data2.title,
    //   };
    //   const key: string = tempdata['uploaddata'];
    //   const tempObj: any = new Object();
    //   tempObj[key] = data2.title;
    //   console.log(tempObj);
    //   setData1({ ...data1, ...tempObj });
    //   if (tempdata.uploaddata && tempdata.dbdata) {
    //     Setselected([...selected, tempdata]);
    //   } else {
    //     console.log(props);
    //   }
    // }
    if (desttinationChecked.length > 0 && checked.length > 0) {
      const tempObj: any = new Object();
      const key = checked.map((z: any) => z.title).join(' * ');
      tempObj[key] = desttinationChecked.map((x: any) => x.title);
      const tempdata = {
        uploaddata: checked.map((x: any) => x.title).join(' * '),
        dbdata: desttinationChecked.map((x: any) => x.title).join(' | '),
      };
      Setselected([...selected, tempdata]);
      setChecked([]);
      setDestinationChecked([]);
    }
  };

  const handleToggle = (value: any) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggle2 = (value: any) => {
    if (checked?.length <= 0) {
      setAlert({
        open: true,
        message: 'Please select a Vendor Schema before selecting Schema',
        backgroundColor: '#FF3232',
      });
    } else {
      const currentIndex = desttinationChecked.indexOf(value);
      const newChecked = [...desttinationChecked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setDestinationChecked(newChecked);
    }
  };

  const handleData2 = (e: any, value: any) => {
    if (checked?.length <= 0) {
      setAlert({
        open: true,
        message: 'Please select a Vendor Schema before selecting Schema',
        backgroundColor: '#FF3232',
      });
    } else {
      if (e === undefined) {
        setData2(value);
        console.log(value);
        custom2.map((x: any) => {
          if (x.id === value.id) {
            x.isEnabled = false;
          }
        });
        custom.map((x: any) => {
          checked.map((z: any) => {
            if (x.id === z.id) {
              x.isEnabled = false;
            }
          });
        });
      } else {
        setData2('');
      }
    }
  };

  const onDelete = (deletedIndex: any) => {
    // const allProperty = [...selected];
    // allProperty.map((property, index) => {
    //   if (index === deletedIndex) {
    //     console.log(property.uploaddata.split('*'));
    //     const temp = property.uploaddata.split(' * ');
    //     temp?.length > 0
    //       ? custom.map((x: any) => {
    //           temp.map((z: any) => {
    //             if (z === x.title) {
    //               x.isEnabled = true;
    //             }
    //           });
    //         })
    //       : custom.map((x: any) => {
    //           console.log(x);

    //           if (x.title === property.uploaddata) {
    //             x.isEnabled = true;
    //           }
    //         });
    //     custom2.map((x: any) => {
    //       console.log(x);
    //       if (x.title === property.dbdata) {
    //         x.isEnabled = true;
    //       }
    //     });
    //   }
    // });
    // const temp_selected = allProperty.filter((property, index) => index !== deletedIndex).map((x) => x);
    // Setselected(temp_selected);
    // setData2({});
    // if (temp_selected?.length <= 0) {
    //   // setShow(false);
    // }
    // console.log(checked, desttinationChecked);
    // console.log(custom, custom2);
    // console.log(selected, deletedIndex);
    const data = selected[deletedIndex];
    console.log(data);
    const temp_selected = selected;
    const temp_custom = custom;
    const temp_custom2 = custom2;
    custom.map((x: any) => {
      if (x.id === data.uploaddata) {
        x.isEnabled = true;
      }
    });
    custom2.map((x: any) => {
      data.dbdata.split(' | ').map((z: any) => {
        if (x.id === z) {
          x.isEnabled = true;
        }
      });
    });
    setCustom(temp_custom);
    setCustom2(temp_custom2);
    Setselected(temp_selected.filter((_property: any, index: any) => index !== deletedIndex).map((x: any) => x));
  };

  const back = () => {};
  const next = () => {
    console.log(selected);
    const payload: any = [];
    selected.map((x: any) => {
      payload.push({ uploaddata: x.uploaddata, dbdata: x.dbdata.split(' | ') });
    });
    console.log(payload);
    updateMappedSchema(payload);
  };

  return (
    <Box sx={schemaStyle.main} style={{ paddingTop: 20 }}>
      <Grid container>
        <Grid item md={4} xs={12}>
          <Box sx={schemaStyle.rootsection}>
            <Typography sx={schemaStyle.tittlesection}>{`Vendor Schema (${custom?.length})`}</Typography>
            <Box sx={schemaStyle.list}>
              {custom?.length > 0 ? (
                <>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      size="small"
                      type="search"
                      fullWidth
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      placeholder="search by data"
                      sx={schemaStyle.search}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <List>
                    {custom
                      .filter((val: any) => {
                        if (search === '') {
                          return val;
                        } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                          return val;
                        }
                      })
                      .map((val: any, _index: any) => {
                        return (
                          <>
                            <ListItem
                              sx={
                                // val.title === data1.title
                                checked.indexOf(val) !== -1 ? schemaStyle.listView : schemaStyle.menulist
                              }
                              //   sx={{
                              //     cursor: 'pointer',
                              //   }}
                              onClick={() => handleToggle(val)}
                              // disabled={checked.indexOf(val) !== -1}
                              disabled={!val?.isEnabled}
                              secondaryAction={
                                <Checkbox
                                  // disabled={checked.indexOf(val) !== -1}
                                  checked={checked.indexOf(val) !== -1}
                                  // onChange={checked.indexOf(val) === -1 && handleToggle(val)}
                                  icon={<></>}
                                  checkedIcon={
                                    <CheckCircleIcon
                                      style={{
                                        position: 'absolute',
                                        right: '7px',
                                      }}
                                    />
                                  }
                                />
                              }
                            >
                              <ListItemText primary={val.title} />
                            </ListItem>
                          </>
                        );
                      })}
                  </List>
                </>
              ) : (
                <>
                  <Typography color={'textSecondary'} style={{ padding: '6px 0px' }}>
                    No Schema updated yet
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={schemaStyle.destinationrootsection}>
            {!fetching && (
              <>
                <Typography sx={schemaStyle.tittlesection}>{`Destination Schema (${custom2.length})`}</Typography>
                <Box sx={schemaStyle.list}>
                  <TextField
                    size="small"
                    type="search"
                    onChange={(e) => setdbSearch(e.target.value)}
                    value={dbsearch}
                    fullWidth
                    placeholder="search by data"
                    sx={schemaStyle.search}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <List>
                    {custom2
                      .filter((val: any) => {
                        if (dbsearch === '') {
                          return val;
                        } else if (val.title.toLowerCase().includes(dbsearch.toLowerCase())) {
                          return val;
                        }
                      })
                      .map((val: any, _index: any) => {
                        return (
                          <>
                            {/* <ListItem
                              sx={val.title === data2.title ? schemaStyle.listView : schemaStyle.menulist1}
                              button
                              key={index}
                              disabled={!val?.isEnabled}
                              onClick={(e: any) => {
                                handleData2(e.target?.checked, val);
                              }}
                            >
                              {val.title === data2.title ? (
                                <Box
                                  style={{
                                    display: 'flex',
                                    margin: '5px 0px',
                                  }}
                                >
                                  <Box flexGrow={1}>
                                    <Typography>{val.title}</Typography>
                                  </Box>
                                  <Box>
                                    <CheckCircleIcon
                                      style={{
                                        position: 'absolute',
                                        right: '7px',
                                      }}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <Typography>{val.title}</Typography>
                              )}
                            </ListItem> */}
                            <ListItem
                              sx={
                                desttinationChecked.indexOf(val) !== -1 ? schemaStyle.listView : schemaStyle.menulist1
                              }
                              onClick={(_e: any) => handleToggle2(val)}
                              // disabled={checked.indexOf(val) !== -1}
                              disabled={!val?.isEnabled}
                              secondaryAction={
                                <Checkbox
                                  checked={desttinationChecked.indexOf(val) !== -1}
                                  // checked={val.title === data2.title}
                                  icon={<></>}
                                  checkedIcon={
                                    <CheckCircleIcon
                                      style={{
                                        position: 'absolute',
                                        right: '7px',
                                      }}
                                    />
                                  }
                                />
                              }
                            >
                              <ListItemText primary={val.title} />
                            </ListItem>
                          </>
                        );
                      })}
                  </List>
                </Box>
                <Divider />
                <Button onClick={() => mapSchemas()}>Map</Button>
              </>
            )}
          </Box>
        </Grid>
        {true && (
          <Grid item md={4} xs={12}>
            <Box sx={schemaStyle.rootsection}>
              <Typography sx={schemaStyle.tittlesection}>{`Mapped Schema (${selected?.length})`}</Typography>
              <Box sx={schemaStyle.list}>
                <TextField
                  size="small"
                  type="search"
                  onChange={(e) => mapsetSearch(e.target.value)}
                  value={mapsearch}
                  fullWidth
                  placeholder="search by data"
                  sx={schemaStyle.search}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <List>
                  {selected?.length > 0 ? (
                    <>
                      {selected
                        .filter((val: any) => {
                          if (mapsearch === '') {
                            return val;
                          } else if (val.uploaddata.toLowerCase().includes(mapsearch.toLowerCase())) {
                            return val;
                          }
                        })
                        .map((val: any, index: any) => {
                          return (
                            <>
                              <ListItem sx={schemaStyle.menulist} button>
                                <Box
                                  style={{
                                    display: 'flex',
                                    margin: '5px 0px',
                                    alignItems: 'center',
                                  }}
                                >
                                  <>{val.uploaddata}</> &nbsp;
                                  <>
                                    {' '}
                                    <MappedArrow style={{ width: 20 }} />
                                  </>{' '}
                                  &nbsp; <>{val.dbdata}</>
                                  <>
                                    <CloseIcon
                                      style={{
                                        position: 'absolute',
                                        right: '7px',
                                      }}
                                      fontSize="small"
                                      onClick={() => onDelete(index)}
                                    />
                                  </>
                                </Box>
                              </ListItem>
                              {/* end */}
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {/* <Typography sx={schemaStyle.tittlesection}>
                        {`Vendor Schema (${custom?.length})`}
                      </Typography>
                      <Box sx={schemaStyle.list}>
                        <> */}
                      <Box
                        style={{
                          width: '60%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <Typography color={'textSecondary'} style={{ padding: '6px 0px' }}>
                          No Schema mapped yet
                        </Typography>
                      </Box>
                      {/* </>
                      </Box> */}
                    </>
                  )}
                </List>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
      <Box sx={schemaStyle.footer}>
        <Button
          color="primary"
          variant="contained"
          sx={schemaStyle.sumbit}
          style={{
            // textTransform: "capitalize",
            background: 'transparent linear-gradient(90deg, #DE57E5 0%, #BB63FB 100%) 0% 0% no-repeat padding-box',
          }}
          onClick={next}
          // disabled={show ? false : true}
        >
          {`Save`}
        </Button>
        &nbsp;
      </Box>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </Box>
  );
};
