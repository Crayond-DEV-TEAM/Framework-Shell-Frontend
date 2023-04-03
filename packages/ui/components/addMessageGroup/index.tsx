import { DropDown, LanguageCard, ToggleButtons } from '@atoms/index';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState, useEffect } from 'react';
import { addMessageGroupStyle } from './style';

export interface AddMessageGroupProps {
  className?: string;
  handleChange?: (key: string, value: string) => void;
  updateStatusReport?: (e: any) => void;
  languageBox?: (val: any) => void;
  groupState?: any;
  isEdit?: boolean;
  options?: any;
  language?: any;
  status?: any;
  sx?: SxProps<Theme>;
}

export const AddMessageGroup = forwardRef((props: AddMessageGroupProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    status,
    handleChange = () => false,
    updateStatusReport = () => false,
    language,
    isEdit,
    languageBox = () => false,
    options,
    groupState,
    ...rest
  } = props;
  const [addTableData, setaddTableData] = useState<any>();

  useEffect(() => {
    setaddTableData(isEdit ? groupState?.msg_grp_msg_data : language);
  }, [groupState, language, groupState?.severtiy]);

  return (
    <Box
      sx={[
        {
          ...addMessageGroupStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Grid container>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ borderRight: '1px solid #E3E3E3', pr: 2, py: 2 }}>
          <Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
                Title
              </Label>
              <Input
                size="small"
                placeholder="username"
                value={groupState?.title}
                textFieldStyle={addMessageGroupStyle.inputSx}
                id="username"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('title', e.target.value)
                }
                // isError={values?.error?.username ? true : false}
                // errorMessage={values?.error?.username ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
                Description
              </Label>
              <Input
                size="small"
                placeholder="Add description"
                value={groupState?.description}
                id="username"
                // textFieldStyle={{ height: '112px' }}
                rows={5}
                rowsMax={10}
                isMulti={true}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('description', e.target.value)
                }
                textFieldStyle={addMessageGroupStyle.inputSx}
                // isError={values?.error?.username ? true : false}
                // errorMessage={values?.error?.username ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
                Severity
              </Label>
              <ToggleButtons onChange={(e: any) => updateStatusReport(e)} value={status} options={options} />
            </Box>
            {/* <Box sx={addMessageGroupStyle.inputGroupSx}>
            <Label sx={addMessageGroupStyle.labelSx} htmlFor="username">
              Message Group
            </Label>
            <Box sx={{ height: '40px', pt: 1 }}>
              <DropDown />
            </Box>
          </Box> */}
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pl: 2, py: 2 }}>
          <Typography sx={addMessageGroupStyle.labelSx}>
            Please provide message titles in respective language
          </Typography>
          <Box sx={addMessageGroupStyle.totalLanguagesSx}>
            {addTableData &&
              addTableData?.map((val: any, i: number) => {
                return (
                  <Box key={i}>
                    <LanguageCard
                      title={isEdit ? val?.configuration?.language?.language_name : val?.language?.label}
                      value={isEdit ? val?.message : val?.language?.label}
                    />
                  </Box>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

AddMessageGroup.displayName = 'AddMessageGroup';
