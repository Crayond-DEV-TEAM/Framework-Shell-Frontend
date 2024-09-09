import type { SxProps, Theme } from '@mui/material';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

import { adminSecFormStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddChipDropdown } from '@atoms/addChipDropdown';
import { AddChipMultipleDropdown } from '@atoms/addChipMultipleDropdown';
import { useAdminLanding } from '@core/store';

export interface AdminSecFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  createEditAdmin?: any;
  handlechange?: (key: string, value: string | number) => void;
}

export const AdminSecForm = (props: AdminSecFormProps): JSX.Element => {
  const { className = '', sx = {}, createEditAdmin, handlechange = () => false, ...rest } = props;

  const { ServiceListMaster, UserListMaster, addUserInvite, OrganisationDetails, seteditAdmin } = useAdminLanding();

  const accessMaster = [
    { id: '1', name: 'Full Access' },
    { id: '2', name: 'Restricted' },
  ];

  console.log(ServiceListMaster);

  return (
    <Box
      sx={[
        {
          ...adminSecFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={adminSecFormStyle.padd}>
        <Box sx={adminSecFormStyle.inputGroupSx}>
          <Label sx={adminSecFormStyle.labelSx} htmlFor="addTitle" isRequired>
            Project Name
          </Label>
          <Input
            size="small"
            placeholder="Project name"
            required
            value={createEditAdmin.projectTitle}
            textFieldStyle={adminSecFormStyle.inputSx}
            id="title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handlechange('projectTitle', e.target.value)
            }
            // isError={Boolean(createEditAdmin?.errors?.projectTitle)}
            // errorMessage={createEditAdmin?.errors?.projectTitle}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={adminSecFormStyle.inputGroupSx}>
          <Label sx={adminSecFormStyle.labelSx} htmlFor="addTitle" isRequired>
            Description
          </Label>
          <Input
            size="small"
            // placeholder="Description"
            required
            rows={4}
            rowsMax={6}
            isMulti={true}
            value={createEditAdmin?.description}
            textFieldStyle={adminSecFormStyle.inputBigSx}
            id="description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handlechange('description', e.target.value)
            }
            // isError={Boolean(formErrors.description)}
            // errorMessage={formErrors.description}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box pt={1}>
          <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Services</Typography>
          <Box pt={2}>
            <Autocomplete
              multiple
              id="tags-outlined"
              value={createEditAdmin.mapServices}
              onChange={(event: any, newValue: any | null) => {
                seteditAdmin({ key: 'mapServices', value: newValue });
              }}
              options={ServiceListMaster}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Services" placeholder="Services" />}
            />
          </Box>
          <Accordion
            sx={{
              boxShadow: 'none',
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{ padding: 0 }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Mapped Users</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              <AddChipMultipleDropdown
                createEditAdmin={createEditAdmin}
                dataList={UserListMaster}
                handleChange={handlechange}
                accessMaster={accessMaster}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

//  if Accordion need use this code
{
  /* <Accordion
            sx={{
              boxShadow: 'none',
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: 0 }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Services</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              <AddChipDropdown
                permissionList={ServiceListMaster}
                createEditState={createEditAdmin.mapServices}
                admin={true}
              />
            </AccordionDetails>
          </Accordion> */
}
