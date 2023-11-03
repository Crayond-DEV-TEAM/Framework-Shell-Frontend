/* eslint-disable react/no-children-prop */
import { CheckBox } from '@core/ui/atoms/checkBox';
import { Input } from '@core/ui/atoms/input';
import { Box, FormControlLabel } from '@mui/material';
import { slackDialog_style } from './style';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';

export function SlackDialog(): JSX.Element {
  const { slackConfiguration, updateConfig, setDefault } = useAlertConfig();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDefault(isChecked, 'slack');
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateConfig(name, value, 'slack');
  };

  return (
    <Box sx={slackDialog_style.leftContent}>
      <Box sx={slackDialog_style.field}>
        <Label isRequired={true}>Identification Name</Label>
        <Input name="identification_name" value={slackConfiguration?.identification_name} onChange={handleChange} />
      </Box>
      <Box sx={slackDialog_style.field}>
        <Label isRequired={true}>Slack Bot Token</Label>
        <Input name="slack_bot_token" value={slackConfiguration?.slack_bot_token} onChange={handleChange} />
      </Box>
      <FormControlLabel
        label="Mark As Default"
        control={<CheckBox checked={slackConfiguration?.isDefault} onChange={handleCheckboxChange} />}
      />
    </Box>
  );
}
