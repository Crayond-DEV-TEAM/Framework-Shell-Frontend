/* eslint-disable react/no-children-prop */
import { CheckBox } from '@core/ui/atoms/checkBox';
import { Input } from '@core/ui/atoms/input';
import { Box, FormControlLabel } from '@mui/material';
import { whatsappDialog_style } from './style';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';

export function WhatsappDialog(): JSX.Element {
  const { whatsappConfiguration, updateConfig, setDefault } = useAlertConfig();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDefault(isChecked, 'whatsapp');
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateConfig(name, value, 'whatsapp');
  };

  return (
    <Box sx={whatsappDialog_style.leftContent}>
      <Box sx={whatsappDialog_style.field}>
        <Label isRequired={true}>Identification Name</Label>
        <Input name="identification_name" value={whatsappConfiguration?.identification_name} onChange={handleChange} />
      </Box>
      <Box sx={whatsappDialog_style.field}>
        <Label isRequired={true}>Whatsapp Business Number</Label>
        <Input
          name="whatsapp_buisness_phone_number"
          value={whatsappConfiguration?.whatsapp_buisness_phone_number}
          onChange={handleChange}
        />
      </Box>
      <Box sx={whatsappDialog_style.field}>
        <Label isRequired={true}>API Version</Label>
        <Input name="api_version" value={whatsappConfiguration?.api_version} onChange={handleChange} />
      </Box>
      <Box sx={whatsappDialog_style.field}>
        <Label isRequired={true}>Access Token</Label>
        <Input
          isMulti
          rowMax={5}
          name="access_token"
          value={whatsappConfiguration?.access_token}
          onChange={handleChange}
        />
      </Box>
      <FormControlLabel
        label="Mark As Default"
        control={<CheckBox checked={whatsappConfiguration?.isDefault} onChange={handleCheckboxChange} />}
      />
    </Box>
  );
}
