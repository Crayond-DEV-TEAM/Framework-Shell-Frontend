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

export interface APIEditorProps {
  className?: string;
  isStepper?: boolean;
  sx?: SxProps<Theme>;
}

export const APIEditor = (props: any): JSX.Element => {
  const { api, setAPI, onNext } = props;
  const [apiurl, setApiUrl] = useState<API>({});
  const [error, setError] = useState<any>({
    method: false,
    url: false,
    header: false,
    body: false,
  });
  const validation = () => {
    if (apiurl.header && apiurl.header.length <= 0) {
      setError({ ...error, header: true });
      return false;
    } else if (apiurl.body && apiurl.body.length <= 0) {
      setError({ ...error, body: true });
      return false;
    } else if (apiurl.url && apiurl.url.length <= 0) {
      setError({ ...error, url: true });
      return false;
    }
    return true;
  };
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={2}>
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
            // isError={Boolean(error.method)}
            // errorMessage={formErrors.featuregroup}
          />
        </Grid>
        <Grid item xs={10}>
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
              //   errorMessage={formErrors.name}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={6}>
          <Label sx={apiStyle.labelSx} htmlFor="addTitle" isRequired>
            Request Header
          </Label>
          <Input
            required
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
            // errorMessage={formErrors.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Label sx={apiStyle.labelSx} htmlFor="addTitle" isRequired>
            Request Body
          </Label>
          <Input
            required
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
            // errorMessage={formErrors.description}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            // if (validation()) {
            setAPI(apiurl);
            onNext();
            // }
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
