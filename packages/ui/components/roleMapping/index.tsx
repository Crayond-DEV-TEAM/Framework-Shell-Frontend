import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { roleMappingStyle } from './style';
import { ModalAddPermission, TableHeader } from '..';
import { Header, tableData, tableJson } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useState } from 'react';

export interface RoleMappingProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const RoleMapping = (props: RoleMappingProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);

  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
  };
  // debugger;
  // const filteredMessageGroup = tableJson.filter((x: any) => x.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box
      sx={[
        {
          ...roleMappingStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={roleMappingStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={tableJson}
          tableData={tableData}
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
          tableMinWidth={'1000px'}
          tableMinHeight={'49vh'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
          HeaderComponent={{
            variant: 'CUSTOM',
            component: (
              <TableHeader
                isFilterRequired={false}
                isBtnRequired={false}
                tableHeader={'Role Mapping'}
                // setSearchTerm={setSearchTerm}
              />
            ),
          }}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Add Role'}
        Bodycomponent={<ModalAddPermission dropdown={true} />}
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
        dialogRootStyle={roleMappingStyle.dialogSx}
      />
    </Box>
  );
};
