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
import { useAdmin, useProfileUser, useService } from '@core/store';
import { useEffect, useState } from 'react';

export interface AdminSecFormProps {
  className?: string;
  sx?: SxProps<Theme>;
  createEditAdmin?: any;
  handlechange?: (key: string, value: string | number) => void;
}

export const AdminSecForm = (props: AdminSecFormProps): JSX.Element => {
  const { className = '', sx = {}, createEditAdmin, handlechange = () => false, ...rest } = props;
  const [service, setService] = useState();
  const [user, setUser] = useState();
  const { UserList, getUserList } = useProfileUser();
  const { ServiceList, getServiceList } = useService();
  const { OrganisationDetails } = useAdmin();

  console.log(createEditAdmin, 'createEditAdmincreateEditAdmin');

  const optionList = () => {
    // debugger;
    const dataTable: any = [];
    if (UserList) {
      UserList.map((tableData: any, i: any) =>
        dataTable.push({
          id: tableData.id,
          name: tableData.userName,
        }),
      );
      setUser(dataTable);
    }
  };
  const ServiceOptionList = () => {
    // debugger;
    const dataTable: any = [];
    if (ServiceList) {
      ServiceList.map((tableData: any, i: any) =>
        dataTable.push({
          id: tableData.id,
          name: tableData.serviceName,
        }),
      );
      setService(dataTable);
    }
  };

  useEffect(() => {
    ServiceOptionList();
  }, [ServiceList]);

  useEffect(() => {
    optionList();
  }, [UserList]);

  useEffect(() => {
    getUserList(OrganisationDetails.id);
    getServiceList(OrganisationDetails.id);
  }, []);

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
        <Box sx={adminSecFormStyle.inputGroupSx}>
          <Label sx={adminSecFormStyle.labelSx} htmlFor="addTitle" isRequired>
            Git URL
          </Label>
          <Input
            size="small"
            placeholder="Git URL"
            required
            value={createEditAdmin.gitUrl}
            textFieldStyle={adminSecFormStyle.inputSx}
            id="title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handlechange('gitUrl', e.target.value)
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
              <AddChipDropdown permissionList={service} onChange={handlechange} />
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
              <AddChipMultipleDropdown dataList={user} handleChange={handlechange} />
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Box>
  );
};