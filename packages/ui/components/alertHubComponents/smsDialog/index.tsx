/* eslint-disable react/no-children-prop */
import { CheckBox } from '@core/ui/atoms/checkBox';
import { Input } from '@core/ui/atoms/input';
import { Box, FormControlLabel } from '@mui/material';
import { smsDialog_style } from './style';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';

export function SmsDialog(): JSX.Element {
  const { smsConfiguration, updateConfig, setDefault } = useAlertConfig();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDefault(isChecked, 'sms');
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateConfig(name, value, 'sms');
  };

  return (
    <Box sx={smsDialog_style.leftContent}>
      <Box sx={smsDialog_style.field}>
        <Label isRequired={true}>Identifier</Label>
        <Input name="identifier" value={smsConfiguration?.identifier} onChange={handleChange} />
      </Box>
      <Box sx={smsDialog_style.field}>
        <Label isRequired={true}>Provider Name</Label>
        <Input name="provider_name" value={smsConfiguration?.provider_name} onChange={handleChange} />
      </Box>
      <Box sx={smsDialog_style.field}>
        <Label isRequired={true}>Providers Id</Label>
        <Input name="provider_sid" value={smsConfiguration?.provider_sid} onChange={handleChange} />
      </Box>
      <Box sx={smsDialog_style.field}>
        <Label isRequired={true}>Provider API Key</Label>
        <Input name="provider_api_key" value={smsConfiguration?.provider_api_key} onChange={handleChange} />
      </Box>
      <Box sx={smsDialog_style.field}>
        <Label isRequired={true}>Sender Id</Label>
        <Input name="sender_id" value={smsConfiguration?.sender_id} onChange={handleChange} />
      </Box>
      <FormControlLabel
        label="Mark As Default"
        control={<CheckBox checked={smsConfiguration?.isDefault} onChange={handleCheckboxChange} />}
      />
    </Box>
  );
}
