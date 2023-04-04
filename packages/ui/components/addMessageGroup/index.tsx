import { DropDown, LanguageCard, ToggleButtons } from '@atoms/index';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography, Divider } from '@mui/material';
import { forwardRef, useState, useEffect } from 'react';
import { addMessageGroupStyle } from './style';

export interface AddMessageGroupProps {
  className?: string;
  handleChange?: (key: string, value: string) => void;
  updateStatusReport?: (e: any) => void;
  languageBox?: (val: any) => void;
  groupState?: any;
  onChangeMessage?: (key: any, value: any, state: any) => void;
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
    onChangeMessage = () => false,
    isEdit,
    languageBox = () => false,
    options,
    groupState,
    ...rest
  } = props;
  const [addTableData, setaddTableData] = useState<any>();

  useEffect(() => {
    setaddTableData(isEdit ? groupState?.msg_grp_msg_data : language);
  }, [groupState, groupState?.severtiy]);

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
      <Grid sx={addMessageGroupStyle.totalGrid}>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 2, pt: 2 }}>
          <Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="title" isRequired>
                Title
              </Label>
              <Input
                size="small"
                placeholder="title"
                required
                value={groupState?.title}
                textFieldStyle={addMessageGroupStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('title', e.target.value)
                }
                isError={groupState?.error?.title ? true : false}
                errorMessage={groupState?.error?.title ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="Add description" isRequired>
                Description
              </Label>
              <Input
                size="small"
                placeholder="Add description"
                value={groupState?.description}
                required
                id="Add description"
                // textFieldStyle={{ height: '112px' }}
                rows={5}
                rowsMax={10}
                isMulti={true}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleChange('description', e.target.value)
                }
                textFieldStyle={addMessageGroupStyle.inputSx}
                isError={groupState?.error?.description ? true : false}
                errorMessage={groupState?.error?.description ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx}>Severity</Label>
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
        <Grid>
          <Divider orientation="vertical" sx={addMessageGroupStyle.dividerSx} />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pl: 2, py: 2 }}>
          <Box sx={addMessageGroupStyle}>
            <Divider orientation="vertical" />
            <Box>
              <Typography sx={{ ...addMessageGroupStyle.labelSx, pb: 2 }}>
                Please provide message titles in respective language
              </Typography>
              <Box sx={addMessageGroupStyle.totalLanguagesSx}>
                {addTableData &&
                  addTableData?.map((val: any, i: number) => {
                    return (
                      <Box key={i}>
                        <LanguageCard
                          title={isEdit ? val?.configuration?.language?.language_name : val?.language?.language_name}
                          value={isEdit ? groupState?.msg_grp_msg_data[i]?.message : ''}
                          onChange={onChangeMessage}
                          index={i}
                          placeholder={
                            isEdit ? val?.configuration?.language?.language_name : val?.language?.language_name
                          }
                        />
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

AddMessageGroup.displayName = 'AddMessageGroup';
