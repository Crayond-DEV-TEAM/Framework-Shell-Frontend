import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { rolesStyle } from './style';
import { ModalAddMessage, ModalAddPermission, TableHeader } from '..';
import { Header, tableData, tableJson } from './utils';
import { useState } from 'react';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { DeleteDailog } from '@atoms/deletedailog';
import { Button } from '@atoms/button';
import { dummyTableData } from '@core/store/utils';

export interface RolesProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Roles = (props: RolesProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [values, setValues] = useState(false);

  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
  };
  const handleTableEdit = (id: string) => {
    setValues(true);
    // setIsEdit(true);
    // onEditClicked(id);
  };
  const [selected, setSelected] = useState(false);

  const handlemodalOpen = () => {
    setSelected(true);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };

  const handleTableDelete = (id: string) => {
    handlemodalOpen();
  };

  // debugger;
  const filteredMessageGroup = tableJson.filter((x: any) => x.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box
      sx={[
        {
          ...rolesStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={rolesStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={tableJson}
          tableData={tableData(handleTableEdit, handleTableDelete)}
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
          tableMinWidth={'700px'}
          tableMinHeight={'calc(100vh - 50vh)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          HeaderComponent={{
            variant: 'CUSTOM',
            component: (
              <TableHeader
                isFilterRequired={false}
                buttonName={'Add Role'}
                tableHeader={'Roles'}
                setSearchTerm={setSearchTerm}
                handleOpen={handleOpen}
              />
            ),
          }}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Add Role'}
        Bodycomponent={
          <ModalAddPermission title={'Permission Name'} description="Description" modalForm={true} dropdown={true} />
        }
        handleCloseDialog={handleClose}
        Footercomponent={
          <FooterComponent
            check={true}
            // checked={editMessageList.is_status}
            // SwitchChange={(e: any) => handleeditChange('is_status', e.target.checked)}
            // onSave={Edit}
            onCancel={handleClose}
            // loading={addMessageLoading}
          />
        }
        dialogRootStyle={rolesStyle.dialogSx}
      />
      <DeleteDailog
        isDialogOpened={selected}
        Bodycomponent={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this?</Typography>
            <Box sx={rolesStyle.totalFooterSx}>
              <Box sx={rolesStyle.btnSx}>
                <Box sx={rolesStyle.btnBg}>
                  <Button buttonStyle={rolesStyle.cancelbtnText} onClick={handlemodalClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={rolesStyle.savebtnBg}>
                  <Button buttonStyle={rolesStyle.savebtnText}>Delete</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
