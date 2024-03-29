import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

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

  const { ServiceListMaster, UserListMaster, addUserInvite, OrganisationDetails } = useAdminLanding();


  const accessMaster = [
    { id: '1', name: 'Full Access' },
    { id: '2', name: 'Restricted' },
  ];

  // useEffect(() => {
  //   getUserList(OrganisationDetails.id);
  //   getServiceList(OrganisationDetails.id);
  // }, []);

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
            // isError={Boolean(formErrors.name)}
            // errorMessage={formErrors.name}
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
        <div>
          <Accordion
            sx={{
              boxShadow: 'none',
              // borderBottom: '1px solid #EAEAEA',
              // // margin: '0px',
              // '.MuiAccordion-root.Mui-expanded .MuiPaper-root': {
              //   margin: '0px',
              // },
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
                onChange={handlechange}
                createEditState={createEditAdmin.mapServices}
                admin={true}
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
        </div>
      </Box>
    </Box>
  );
};
