import type { SxProps, Theme } from '@mui/material';
import { Box, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { userSectionStyle } from './style';
import { IdmBackgroundCard } from '@atoms/idmBackgroundCard';
import { CommonTable } from 'crayond-components-library-1';
import { Header, tableData, tableJson } from './utills';
import { Button } from '@atoms/button';
import { Drawer } from '@atoms/drawer';
import { AddChipDropdown } from '@atoms/addChipDropdown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MappedUserCard } from '@atoms/mappedUserCard';
import { TableHeader } from '@components/commonComponents';

export interface UserSectionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const UserSection = (props: UserSectionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [open, setOpen] = useState(false);
  const altText = [
    { option: 'text', access: 'Full Access' },
    { option: 'text dem', access: 'Restricted' },
    { option: 're text', access: 'Restricted' },
  ];
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // const filteredMessageGroup = tableJson.filter((x: any) =>
  //   // x.projectTitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  // );

  const handleTabledetail = () => {
    setOpen(true);
    console.log('');
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={[
        {
          ...userSectionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IdmBackgroundCard
        title="Organisation"
        subTitle="Projects"
        content={
          <Box sx={userSectionStyle.commonTable}>
            <CommonTable
              Header={Header}
              dataList={tableJson}
              tableData={tableData(handleTabledetail)}
              // switchList={switchList}
              // handleSwitch={handleSwitch}
              headerOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#818181',
                bgColor: '#EAEAEA',
                borderBottom: '0px',
                width: '100%',
                padding: '6px 16px 6px 7px',
              }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                borderBottom: '0px',
                // padding: '8px',
                padding: '3px 0px 3px 7px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              tableMinWidth={'80px'}
              stickyOptions={{
                stickyHeader: true,
                stickyLeft: [],
                stickyRight: [],
              }}
              tableMinHeight={'calc(100vh - 308px)'}
              tableMaxHeight={'calc(100vh - 308px)'}
              paddingAll={'0px'}
              marginAll={'0px 0px 0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    isFilterRequired={false}
                    // buttonName={'Projects'}
                    tableHeader={'Projects'}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    isBtnRequired={false}
                    // handleOpen={handleOpen}
                    // editTableMessage={addRole}
                  />
                ),
              }}
            />
          </Box>
        }
      />
      <Drawer
        show={open}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={{ padding: '0px 20px' }}
        // drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Project Title'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        rootStyle={{
          '& .MuiDrawer-paperAnchorRight': {
            width: '340px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
        }}
        // footer={
        //   <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        //     <Button
        //       fullWidth={false}
        //       size={'small'}
        //       onClick={handleDrawerClose}
        //       // sx={createPlanStyle.cancButton}
        //     >
        //       Cancel
        //     </Button>
        //     <Button
        //       fullWidth={false}
        //       size={'small'}
        //       // sx={createPlanStyle.saveButton}
        //     >
        //       Save
        //     </Button>
        //   </Box>
        // }
      >
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
              <Chip label="Chip Filled" sx={{ height: '28px', borderRadius: '8px' }} />
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
              <MappedUserCard altText={altText} />
            </AccordionDetails>
          </Accordion>
        </div>
        {/* <AddChipDropdown placeholder="options" permissionList={options} /> */}
      </Drawer>
    </Box>
  );
};
