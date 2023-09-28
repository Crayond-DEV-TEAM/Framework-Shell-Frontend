import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { organisationFormStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface OrganisationFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  createEditOrganisation: any;
  handlechange: (key: string, value: string | number) => void;
}

export const OrganisationForm = (props: OrganisationFormProps): JSX.Element => {
  const { className = '', sx = {}, handlechange, createEditOrganisation, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...organisationFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Organisation Name
        </Label>
        <Input
          size="small"
          placeholder="Organisation Name"
          required
          value={createEditOrganisation?.organisationName}
          textFieldStyle={organisationFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('organisationName', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Description
        </Label>
        <Input
          size="small"
          // placeholder="Description"
          required
          rows={4}
          rowsMax={6}
          isMulti={true}
          value={createEditOrganisation?.description}
          textFieldStyle={organisationFormStyle.inputBigSx}
          id="description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('description', e.target.value)
          }
          // isError={Boolean(formErrors.description)}
          // errorMessage={formErrors.description}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Email Id
        </Label>
        <Input
          size="small"
          placeholder="Email Id"
          required
          value={createEditOrganisation?.emailId}
          textFieldStyle={organisationFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('emailId', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Mobile Number
        </Label>
        <Input
          size="small"
          placeholder="Mobile Number"
          required
          value={createEditOrganisation?.mobile}
          textFieldStyle={organisationFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('mobile', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Address
        </Label>
        <Input
          size="small"
          placeholder="Address"
          required
          rows={4}
          rowsMax={6}
          isMulti={true}
          value={createEditOrganisation?.address}
          textFieldStyle={organisationFormStyle.inputBigSx}
          id="description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('address', e.target.value)
          }
          // isError={Boolean(formErrors.description)}
          // errorMessage={formErrors.description}
        />
      </Box>
      <Box sx={{ m: '16px' }} />
      <Box sx={organisationFormStyle.inputGroupSx}>
        <Label sx={organisationFormStyle.labelSx} htmlFor="addTitle" isRequired>
          Domain
        </Label>
        <Input
          size="small"
          placeholder="Domain"
          required
          value={createEditOrganisation?.domainUrl}
          textFieldStyle={organisationFormStyle.inputSx}
          id="title"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handlechange('domainUrl', e.target.value)
          }
          // isError={Boolean(formErrors.name)}
          // errorMessage={formErrors.name}
        />
      </Box>
    </Box>
  );
};
