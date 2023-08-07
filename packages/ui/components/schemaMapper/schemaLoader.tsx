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
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Check from '@mui/icons-material/Check';
import { schemaStyle } from './style';
import { JSONEditor, SchemaMapper } from '..';
import { useSchemaLoader } from '@core/store';
import { APIEditor } from '@components/APIEditor';

export interface SchemaLoaderProps {
  className?: string;
  isStepper?: boolean;
  sx?: SxProps<Theme>;
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

const steps = ['Load Vendor Schema', 'Load Destination Schema', 'Map Schemas'];

export const SchemaLoader = (props: SchemaLoaderProps): JSX.Element => {
  const [activeSteps, setActiveSteps] = useState(0);
  const [vendorFeedSource, setVendorFeedSource] = useState('JSON');
  const [destinationfeedSource, setDestinationFeedSource] = useState('JSON');
  const {
    vendorSchema,
    destinatinSchema,
    setVendorSchema,
    setDestinationSchema,
    vendorAPI,
    destinationAPI,
    setVendorAPI,
    setDestinationAPI,
  } = useSchemaLoader();

  const steppedData = (activeStep: any) => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ m: 2, px: 10 }}>
            <FormControl>
              <FormLabel>Feed Source</FormLabel>
              <RadioGroup row value={vendorFeedSource} onChange={(e: any) => setVendorFeedSource(e.target.value)}>
                <FormControlLabel value={'API'} control={<Radio />} label={'API'} />
                <FormControlLabel value={'JSON'} control={<Radio />} label={'JSON'} />
              </RadioGroup>
            </FormControl>
            {vendorFeedSource === 'JSON' && (
              <JSONEditor
                schema={vendorSchema}
                setSchema={setVendorSchema}
                onNext={() => {
                  let step = activeSteps;
                  setActiveSteps(++step);
                }}
              />
            )}
            {vendorFeedSource === 'API' && (
              <APIEditor
                api={vendorAPI}
                setAPI={setVendorAPI}
                onNext={() => {
                  let step = activeSteps;
                  setActiveSteps(++step);
                }}
              />
            )}
          </Box>
        );
        break;
      case 1:
        return (
          <Box sx={{ m: 2, px: 10 }}>
            <FormControl>
              <FormLabel>Feed Source</FormLabel>
              <RadioGroup
                row
                value={destinationfeedSource}
                onChange={(e: any) => setDestinationFeedSource(e.target.value)}
              >
                <FormControlLabel value={'API'} control={<Radio />} label={'API'} />
                <FormControlLabel value={'JSON'} control={<Radio />} label={'JSON'} />
              </RadioGroup>
            </FormControl>
            {destinationfeedSource === 'JSON' && (
              <JSONEditor
                schema={destinatinSchema}
                setSchema={setDestinationSchema}
                onNext={() => {
                  let step = activeSteps;
                  setActiveSteps(++step);
                }}
              />
            )}
            {destinationfeedSource === 'API' && (
              <APIEditor
                api={destinationAPI}
                setAPI={setDestinationAPI}
                onNext={() => {
                  let step = activeSteps;
                  setActiveSteps(++step);
                }}
              />
            )}
          </Box>
        );
        break;
      case 2:
        return <SchemaMapper />;
        break;
      default:
        return <p>Step 0</p>;
        break;
    }
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Stepper alternativeLabel activeStep={activeSteps}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steppedData(activeSteps)}
    </Box>
  );
};
