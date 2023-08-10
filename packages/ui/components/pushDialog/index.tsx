import { CheckBox } from '@atoms/checkBox';
import { Input } from '@atoms/input';
import { Box, FormControlLabel, Grid } from '@mui/material';
import { pushDialog_style } from './style';

export function PushDialog(): JSX.Element {
  return (
    <Box sx={pushDialog_style.leftContent}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={pushDialog_style.field}>
            <Input header="FCM Server Key" value="Server Key" />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={pushDialog_style.field}>
            <Input header="FCM Project ID" value="ID-6548" />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={pushDialog_style.field}>
            <Input header="FCM Client EMail" value="jifs-sfr-sfrg" />
          </Box>
        </Grid>
      </Grid>
      <Box sx={pushDialog_style.field}>
        <Input isMulti rowMax={5} header="FCM Private Key" />
      </Box>
      <FormControlLabel label="Mark As Default" control={<CheckBox />} />
    </Box>
  );
}
