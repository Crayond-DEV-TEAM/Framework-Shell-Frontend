import { CheckBox } from '@atoms/checkBox';
import { DropDown } from '@atoms/dropDown';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';
import { Box, FormControlLabel } from '@mui/material';
import { emailDialog_style } from './style';

export function EmailDialog(props: any): JSX.Element {
  const emailSelect = [
    {
      label: 'MailChimp',
      value: 'MailChimp',
    },
    {
      label: 'SendGrid',
      value: 'SendGrid',
    },
    {
      label: 'Pinpoint',
      value: 'Pinpoint',
    },
  ];

  const { emailConfiguration, updateConfig, setDefault, setEmailProvider } = useAlertConfig();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setDefault(isChecked, 'email');
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    updateConfig(name, value, 'email');
  };

  const handleSelectChange = (value: any) => {
    setEmailProvider(value.target.value);
  };

  return (
    <Box sx={emailDialog_style.leftContent}>
      <Box sx={emailDialog_style.field}>
        <Label isRequired={true}>Identification Name</Label>
        <Input name="identification_name" value={emailConfiguration?.identification_name} onChange={handleChange} />
      </Box>
      <Box sx={emailDialog_style.field}>
        <DropDown
          header="Email Provider"
          selectOption={emailSelect}
          isrequired={true}
          onchange={handleSelectChange}
          value={emailConfiguration?.email_provider}
        />
      </Box>
      {emailConfiguration?.email_provider === 'MailChimp' ? (
        <Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Host</Label>
            <Input name="smtp_host" value={emailConfiguration?.smtp_host} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Port</Label>
            <Input name="smtp_port" value={emailConfiguration?.smtp_port} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Username</Label>
            <Input name="smtp_username" value={emailConfiguration?.smtp_username} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Password</Label>
            <Input name="smtp_password" value={emailConfiguration?.smtp_password} onChange={handleChange} />
          </Box>
        </Box>
      ) : emailConfiguration?.email_provider === 'SendGrid' ? (
        <Box sx={emailDialog_style.field}>
          <Label isRequired={true}>API Key</Label>
          <Input name="api_key" value={emailConfiguration?.api_key} onChange={handleChange} />
        </Box>
      ) : emailConfiguration?.email_provider === 'Pinpoint' ? (
        <Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Access Id</Label>
            <Input name="aws_access_id" value={emailConfiguration?.aws_access_id} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Secret Key</Label>
            <Input name="aws_secret_key" value={emailConfiguration?.aws_secret_key} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Region</Label>
            <Input name="aws_region" value={emailConfiguration?.aws_region} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Pinpoint Project Id</Label>
            <Input
              name="aws_pinpoint_project_id"
              value={emailConfiguration?.aws_pinpoint_project_id}
              onChange={handleChange}
            />
          </Box>
        </Box>
      ) : (
        ''
      )}
      {(emailConfiguration?.email_provider === 'MailChimp' || emailConfiguration?.email_provider === 'SendGrid') && (
        <Box sx={emailDialog_style.field}>
          <Label isRequired={true}>Mail Domain</Label>
          <Input name="mail_domain" value={emailConfiguration?.mail_domain} onChange={handleChange} />
        </Box>
      )}

      <Box sx={emailDialog_style.field}>
        <Label isRequired={true}>From mail</Label>
        <Input name="from_mail" value={emailConfiguration?.from_mail} onChange={handleChange} />
      </Box>
      <FormControlLabel
        label="Mark As Default"
        control={<CheckBox checked={emailConfiguration?.isDefault} onChange={handleCheckboxChange} />}
      />
    </Box>
  );
}
