import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stepper,
  Typography,
  type SxProps,
  type Theme,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Check from '@mui/icons-material/Check';
import { apiStyle } from './style';
import { JSONEditor, SchemaMapper } from '..';
import { Input } from '@atoms/input';
import { DropDown } from '@atoms/dropDown';
import { Label } from '@atoms/label';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { API } from '@core/store/interface';
import { useSchemaLoader } from '@core/store';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import axios from 'axios';

export interface APIEditorProps {
  className?: string;
  isStepper?: boolean;
  sx?: SxProps<Theme>;
}

export const APIEditor = (props: any): JSX.Element => {
  const { updateAPI, fetching, errorOnFetch } = useSchemaLoader();
  const { activeStep, api, setSchema, setAPI, onNext } = props;
  const [resjson, setJson] = useState<any>('{}');
  const [apiurl, setApiUrl] = useState<API>({});
  const [error, setError] = useState<any>({
    method: false,
    url: false,
    header: false,
    body: false,
  });
  const validation = () => {
    let flag = true;
    console.log();
    if (apiurl.header && apiurl.header.length <= 0) {
      setError({ ...error, header: true });
      flag = false;
    } else if (apiurl.body && apiurl.body.length <= 0) {
      setError({ ...error, body: true });
      flag = false;
    } else if (apiurl.url && apiurl.url.length <= 0) {
      setError({ ...error, url: true });
      flag = false;
    } else if (apiurl.method && ['GET', 'POST', 'PUT', 'DELETE'].includes(apiurl?.method?.value) !== true) {
      setError({ ...error, method: true });
      flag = false;
    } else if (JSON.stringify(apiurl) === '{}') {
      setError({ ...error, method: true, url: true });
      flag = false;
    }
    // alert(flag);
    return flag;
  };

  const FetchFunction = () => {
    const payload = apiurl?.body ? JSON.parse(apiurl?.body) : {};
    const header = apiurl?.header ? JSON.parse(apiurl.header) : {};
    axios({ method: apiurl.method?.value, url: apiurl.url, data: payload, headers: header })
      .then((response: any) => {
        console.log(response.data);
        setJson(JSON.stringify(response.data, undefined, 4));
      })
      .catch(() => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        console.log('Success');
      });
  };
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ m: 2 }}>
            <Grid item xs={12} md={2}>
              <Label sx={apiStyle.labelSx} htmlFor="addTitle" isRequired>
                Network Call Method
              </Label>
              <CutstomizedAutocomplete
                placeholder="Silver"
                permissionList={[
                  { name: 'GET', value: 'GET' },
                  { name: 'POST', value: 'POST' },
                  { name: 'PUT', value: 'PUT' },
                  { name: 'DELETE', value: 'DELETE' },
                ]}
                onChange={(value) => {
                  setApiUrl({ ...apiurl, method: value });
                }}
                value={apiurl.method}
                isError={Boolean(error.method)}
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <Box sx={apiStyle.inputGroupSx}>
                <Label sx={apiStyle.labelSx} htmlFor="addTitle" isRequired>
                  API URL
                </Label>
                <Input
                  size="small"
                  placeholder="API URL"
                  required
                  value={apiurl.url}
                  textFieldStyle={apiStyle.inputSx}
                  id="name"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                    setApiUrl({ ...apiurl, url: e.target.value })
                  }
                  isError={Boolean(error.url)}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={2}>
              <Button variant="contained" sx={apiStyle.checkBtm} onClick={FetchFunction}>
                Fetch
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ m: 2 }}>
            <Grid item xs={5}>
              <Label sx={apiStyle.labelSx} htmlFor="addTitle">
                Request Header
              </Label>
              <Input
                // required
                value={apiurl?.header}
                textFieldStyle={apiStyle.inputSx}
                id="header"
                rows={5}
                rowsMax={6}
                isMulti={true}
                placeholder='{
                "id": "A1",
                "title": "A-size",
                "isEnabled": true
            }'
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  setApiUrl({ ...apiurl, header: e.target.value })
                }
                isError={Boolean(error.header)}
              />
            </Grid>
            <Grid item xs={6}>
              <Label sx={apiStyle.labelSx} htmlFor="addTitle">
                Request Body
              </Label>
              <Input
                // required
                value={apiurl?.body}
                textFieldStyle={apiStyle.inputSx}
                id="body"
                rows={5}
                rowsMax={6}
                isMulti={true}
                placeholder="Request Body"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  setApiUrl({ ...apiurl, body: e.target.value })
                }
                isError={Boolean(error.body)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            // required
            value={resjson}
            textFieldStyle={apiStyle.inputSx}
            id="header"
            rows={12}
            rowsMax={12}
            disabled
            isMulti={true}
            placeholder='{
                "id": "A1",
                "title": "A-size",
                "isEnabled": true
            }'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setApiUrl({ ...apiurl, header: e.target.value })
            }
            isError={Boolean(error.header)}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            if (validation()) {
              setAPI(apiurl);
              setSchema(JSON.parse(resjson));
              updateAPI(activeStep, 'API', onNext);
              // onNext();
            } else {
              enqueueSnackbar('Please fill the mandatory fields', { variant: 'error' });
            }
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
