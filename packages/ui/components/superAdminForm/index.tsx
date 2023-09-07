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

export interface SuperAdminFormProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SuperAdminForm = (props: SuperAdminFormProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

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
            // value={createEditCharges?.name}
            textFieldStyle={superAdminFormStyle.inputSx}
            id="title"
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            //   handleAddEditStateChange('name', e.target.value)
            // }
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
            // value={createEditCharges?.description}
            textFieldStyle={superAdminFormStyle.inputBigSx}
            id="description"
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            //   handleAddEditStateChange('description', e.target.value)
            // }
            // isError={Boolean(formErrors.description)}
            // errorMessage={formErrors.description}
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
              <AddChipDropdown />
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
              <Typography sx={{ fontWeight: 600, fontSize: '14px', padding: 0 }}>Add Users</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
              <AddChipMultipleDropdown />
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Box>
  );
};
