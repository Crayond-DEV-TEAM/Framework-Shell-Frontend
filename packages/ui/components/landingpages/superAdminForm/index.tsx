import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { superAdminFormStyle } from './style';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddChipDropdown } from '@atoms/addChipDropdown';
import { AddChipMultipleDropdown } from '@atoms/addChipMultipleDropdown';
import { ToggleButtons } from '@atoms/toggleButton';
import { useAdminLanding, useUserLanding } from '@core/store';

export interface SuperAdminFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  ServiceMaster?: any;
  createEditOrganisation?: any;
  handleChange?: (key: string, value: any) => void;
  userMaster?: any;
}

export const SuperAdminForm = (props: SuperAdminFormProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    handleChange = () => false,
    createEditOrganisation,
    ServiceMaster,
    userMaster,
    ...rest
  } = props;
  const { addUserInvite } = useAdminLanding();

  // const onSaveUserInvite = () => {
  //   addUserInvite();
  // };

  return (
    <Box
      sx={[
        {
          ...superAdminFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={superAdminFormStyle.padd}>
        <Box sx={superAdminFormStyle.inputGroupSx}>
          <Label sx={superAdminFormStyle.labelSx} htmlFor="addTitle" isRequired>
            Organisation Name
          </Label>
          <Input
            size="small"
            placeholder="Organisation name"
            required
            value={createEditOrganisation?.organisationName}
            textFieldStyle={superAdminFormStyle.inputSx}
            id="title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('organisationName', e.target.value)
            }
            // isError={Boolean(formErrors.name)}
            // errorMessage={formErrors.name}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={superAdminFormStyle.inputGroupSx}>
          <Label sx={superAdminFormStyle.labelSx} htmlFor="addTitle" isRequired>
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
            textFieldStyle={superAdminFormStyle.inputBigSx}
            id="description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('description', e.target.value)
            }
            // isError={Boolean(formErrors.description)}
            // errorMessage={formErrors.description}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <Box sx={superAdminFormStyle.inputGroupSx}>
          <Label sx={superAdminFormStyle.labelSx} htmlFor="addTitle" isRequired>
            Email Id
          </Label>
          <Input
            size="small"
            placeholder="Email Id"
            required
            value={createEditOrganisation?.email_id}
            textFieldStyle={superAdminFormStyle.inputSx}
            id="title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleChange('email_id', e.target.value)
            }
            // isError={Boolean(formErrors.name)}
            // errorMessage={formErrors.name}
          />
        </Box>
        <Box sx={{ m: '16px' }} />
        <div>
          <Accordion
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
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Map Admin</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              {/* <Chip label="Chip Filled" sx={{ height: '28px', borderRadius: '8px' }} /> */}
              <AddChipMultipleDropdown
                createEditAdmin={createEditOrganisation}
                dataList={userMaster}
                handleChange={handleChange}
                // onSaveUserInvite={onSaveUserInvite}
              />
            </AccordionDetails>
          </Accordion>
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
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Add Services</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              {/* <AddChipMultipleDropdown dataList={ServiceMaster} handleChange={handleChange} /> */}
              <AddChipDropdown
                createEditState={createEditOrganisation?.mapServices}
                permissionList={ServiceMaster}
                onChange={handleChange}
                selectedOptions={createEditOrganisation?.mapServices}
              />
              {/* <ToggleButtons
                // value={addEditMessageState.severity}
                onChange={(e: any, id: any) => {
                  debugger;
                  // props.isEdit ? handleAddEditStateChange('severity', id) : handleAddEditStateChange('severity', e);
                }}
                options={ServiceMaster}
              /> */}
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Box>
  );
};
