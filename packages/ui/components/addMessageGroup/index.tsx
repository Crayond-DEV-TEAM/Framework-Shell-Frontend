import { DropDown, LanguageCard, ToggleButtons } from '@atoms/index';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography, Divider } from '@mui/material';
import { forwardRef, useState, useEffect } from 'react';
import { addMessageGroupStyle } from './style';
import { useMessageGroupDetails, useLanguageConfiguration } from '@core/store';
export interface AddMessageGroupProps {
  className?: string;
  handleChange?: (key: string, value: string) => void;
  updateStatusReport?: (e: any) => void;
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
    options,
    groupState,
    ...rest
  } = props;

  const { MessagesList } = useMessageGroupDetails();
  const { addLanguage } = useLanguageConfiguration();

  const [addTableData, setaddTableData] = useState<any>();

  console.log(language, 'languagelanguagelanguagelanguage');
  console.log(groupState, 'groupStategroupStategroupStategroupState');
  useEffect(() => {
    setaddTableData(isEdit ? groupState?.msg_grp_msg_data : language);
  }, [groupState, groupState?.severtiy]);

  // const sevority = isEdit ? groupState?.severity.id : groupState?.severity_id;
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
      <Grid container sx={addMessageGroupStyle.totalGrid}>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ borderRight: '1px solid #E0E0E0', p: 3 }}>
          <Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="title" isRequired>
                Title
              </Label>
              <Input
                size="small"
                placeholder="Add Title"
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
                id="description"
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
              <ToggleButtons
                onChange={(e: any) => handleChange('severity_id', e)}
                value={groupState.severity_id}
                options={options}
              />
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ p: 3 }}>
          <Box sx={addMessageGroupStyle}>
            <Divider orientation="vertical" />
            <Box>
              <Typography sx={{ ...addMessageGroupStyle.labelSx, pb: 2 }}>
                Please provide message titles in respective language
              </Typography>
              <Box sx={addMessageGroupStyle.totalLanguagesSx}>
                {language &&
                  language?.map((val: any, i: number) => {
                    return (
                      <Box key={i}>
                        <LanguageCard
                          title={val?.language_name}
                          value={groupState}
                          onChange={handleChange}
                          index={i}
                          placeholder={val?.language_name}
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
