import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { serviceFormStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface ServiceFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  createEditService?: any;
  handlechange?: (key: string, value: string | number) => void;
}

export const ServiceForm = (props: ServiceFormProps): JSX.Element => {
  const { className = '', sx = {}, handlechange = () => false, createEditService, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...serviceFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={serviceFormStyle.inputGroupSx}>
        <Label sx={serviceFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Service Name
        </Label>
        <Input
          size="small"
          placeholder="Service Name"
          required
          value={createEditService?.serviceName}
          textFieldStyle={serviceFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('serviceName', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={serviceFormStyle.inputGroupSx}>
        <Label sx={serviceFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Description
        </Label>
        <Input
          size="small"
          // placeholder="Description"
          required
          rows={4}
          rowsMax={6}
          isMulti={true}
          value={createEditService?.description}
          textFieldStyle={serviceFormStyle.inputBigSx}
          id="description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('description', e.target.value)
          }
          // isError={Boolean(formErrors.description)}
          // errorMessage={formErrors.description}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={serviceFormStyle.inputGroupSx}>
        <Label sx={serviceFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Git URl
        </Label>
        <Input
          size="small"
          placeholder="URL"
          required
          value={createEditService?.gitUrl}
          textFieldStyle={serviceFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('gitUrl', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
    </Box>
  );
};
