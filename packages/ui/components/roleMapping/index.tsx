import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { roleMappingStyle } from './style';
import { ModalAddPermission, TableHeader } from '..';
import { Header, tableData, tableJson } from './utils';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { useEffect, useState } from 'react';
import { useRoleMapping } from '@core/store';
export interface RoleMappingProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const RoleMapping = (props: RoleMappingProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const [searchTerm, setSearchterm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);

  const { getRolesMappingList, RolesMappingList } = useRoleMapping();

  const handleClose = () => {
    setValues(false);
  };
  const handleOpen = () => {
    setValues(true);
  };
  // debugger;
  const filteredMessageGroup = RolesMappingList.filter((x: any) =>
    x.username.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // const handleSwitch = (id: string, data: any, e: any) => {
  //   if (!switchList.includes(id)) {
  //     setSwitchList([...switchList, id]);
  //   } else {
  //     const index = switchList.indexOf(id);
  //     if (index > -1) {
  //       switchList.splice(index, 1);
  //       setSwitchList([...switchList]);
  //     }
  //   }
  //   if (e.target.checked) {
  //     console.log(id);
  //     setSwitchList(true);
  //   } else {
  //     console.log(id);
  //     setSwitchList(false);
  //   }
  // };

  const handleSwitch = (id: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
  };

  useEffect(() => {
    getRolesMappingList();
  }, []);

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
          dataList={filteredMessageGroup}
          tableData={tableData}
          switchList={switchList}
          handleSwitch={handleSwitch}
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
          tableMinHeight={'calc(100vh - 308px)'}
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
                setSearchTerm={setSearchterm}
                searchTerm={searchTerm}
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
