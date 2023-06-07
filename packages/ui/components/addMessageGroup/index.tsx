import { LanguageCard, ToggleButtons } from '@atoms/index';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useMessage } from '@core/store';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { addMessageGroupStyle } from './style';

export interface AddMessageGroupProps {
  isEdit?: boolean;
  options?: any;
  language?: any;
  status?: any;
}

export const AddMessageGroup = (props: AddMessageGroupProps): JSX.Element => {
  const { addEditMessageState, handleAddEditStateChange, handleAddEditMessageChange } = useMessage();
  console.log(addEditMessageState, 'addEditMessageState');
  return (
    <Box sx={addMessageGroupStyle.rootSx}>
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
                value={addEditMessageState?.title}
                textFieldStyle={addMessageGroupStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleAddEditStateChange('title', e.target.value)
                }
                isError={addEditMessageState?.error?.title ? true : false}
                errorMessage={addEditMessageState?.error?.title ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx} htmlFor="Add description" isRequired>
                Description
              </Label>
              <Input
                size="small"
                placeholder="Add description"
                value={addEditMessageState?.description}
                required
                id="description"
                // textFieldStyle={{ height: '112px' }}
                rows={5}
                rowsMax={10}
                isMulti={true}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleAddEditStateChange('description', e.target.value)
                }
                textFieldStyle={addMessageGroupStyle.inputSx}
                isError={addEditMessageState?.error?.description ? true : false}
                errorMessage={addEditMessageState?.error?.description ?? ''}
              />
            </Box>
            <Box sx={addMessageGroupStyle.inputGroupSx}>
              <Label sx={addMessageGroupStyle.labelSx}>Severity</Label>
              <ToggleButtons
                onChange={(e: any) => handleAddEditStateChange('severity', e)}
                value={addEditMessageState.severity}
                options={props.options}
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
                {props.language &&
                  props.language?.map((val: any, i: number) => {
                    return (
                      <Box key={i}>
                        <LanguageCard
                          title={val?.language_name}
                          value={addEditMessageState.messages?.[val?.configuration_id]?.message ?? ''}
                          onChange={(message: string) => handleAddEditMessageChange(val?.configuration_id, message)}
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
};

AddMessageGroup.displayName = 'AddMessageGroup';
