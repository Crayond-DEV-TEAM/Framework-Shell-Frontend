import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';
import { Box, Grid } from '@mui/material';
import { pushDialog_style } from './style';

export function PushDialog(): JSX.Element {
  const { pushConfiguration, updateConfig } = useAlertConfig();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateConfig(name, value, 'push');
  };

  return (
    <Box sx={pushDialog_style.leftContent}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={4}>
          <Box sx={pushDialog_style.field}>
            <Label isRequired={true}>Project Id</Label>
            <Input
              textFieldStyle={pushDialog_style.inputStyle}
              name="projectId"
              value={pushConfiguration?.projectId}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box sx={pushDialog_style.field}>
            <Label isRequired={true}>Client Email</Label>
            <Input
              textFieldStyle={pushDialog_style.inputStyle}
              name="clientEmail"
              value={pushConfiguration?.clientEmail}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box sx={pushDialog_style.field}>
            <Label isRequired={true}>Server Key</Label>
            <Input
              textFieldStyle={pushDialog_style.inputStyle}
              name="pushServerKey"
              value={pushConfiguration?.pushServerKey}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={pushDialog_style.field}>
        <Label isRequired={true}>Private Key</Label>
        <Input
          textFieldStyle={pushDialog_style.inputStyle}
          isMulti
          rowMax={5}
          name="privateKey"
          value={pushConfiguration?.privateKey}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
