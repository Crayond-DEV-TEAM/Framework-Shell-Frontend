import { CheckBox } from '@atoms/checkBox';
import { DropDown } from '@atoms/dropDown';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { useAlertConfig } from '@core/store';
import { Box, FormControlLabel } from '@mui/material';
import { emailDialog_style } from './style';

export function EmailDialog(props: {
  emailConfiguration: any
}): JSX.Element {
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

  const { updateConfig, setDefault, setEmailProvider } = useAlertConfig();

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

  console.log(props?.emailConfiguration, 'props?.emailConfiguration');
  

  return (
    <Box sx={emailDialog_style.leftContent}>
      <Box sx={emailDialog_style.field}>
        <Label isRequired={true}>Identification Name</Label>
        <Input name="identification_name" value={props?.emailConfiguration?.identification_name} onChange={handleChange} />
      </Box>
      <Box sx={emailDialog_style.field}>
        <DropDown
          header="Email Provider"
          selectOption={emailSelect}
          isrequired={true}
          onchange={handleSelectChange}
          value={props?.emailConfiguration?.email_provider}
        />
      </Box>
      {props?.emailConfiguration?.email_provider === 'MailChimp' ? (
        <Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Host</Label>
            <Input name="smtp_host" value={props?.emailConfiguration?.smtp_host} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Port</Label>
            <Input name="smtp_port" value={props?.emailConfiguration?.smtp_port} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Username</Label>
            <Input name="smtp_username" value={props?.emailConfiguration?.smtp_username} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>SMTP Password</Label>
            <Input name="smtp_password" value={props?.emailConfiguration?.smtp_password} onChange={handleChange} />
          </Box>
        </Box>
      ) : props?.emailConfiguration?.email_provider === 'SendGrid' ? (
        <Box sx={emailDialog_style.field}>
          <Label isRequired={true}>API Key</Label>
          <Input name="api_key" value={props?.emailConfiguration?.api_key} onChange={handleChange} />
        </Box>
      ) : props?.emailConfiguration?.email_provider === 'Pinpoint' ? (
        <Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Access Id</Label>
            <Input name="aws_access_id" value={props?.emailConfiguration?.aws_access_id} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Secret Key</Label>
            <Input name="aws_secret_key" value={props?.emailConfiguration?.aws_secret_key} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Region</Label>
            <Input name="aws_region" value={props?.emailConfiguration?.aws_region} onChange={handleChange} />
          </Box>
          <Box sx={emailDialog_style.field}>
            <Label isRequired={true}>Aws Pinpoint Project Id</Label>
            <Input
              name="aws_pinpoint_project_id"
              value={props?.emailConfiguration?.aws_pinpoint_project_id}
              onChange={handleChange}
            />
          </Box>
        </Box>
      ) : (
        ''
      )}
      {(props?.emailConfiguration?.email_provider === 'MailChimp' || props?.emailConfiguration?.email_provider === 'SendGrid') && (
        <Box sx={emailDialog_style.field}>
          <Label isRequired={true}>Mail Domain</Label>
          <Input name="mail_domain" value={props?.emailConfiguration?.mail_domain} onChange={handleChange} />
        </Box>
      )}

      <Box sx={emailDialog_style.field}>
        <Label isRequired={true}>From mail</Label>
        <Input name="from_mail" value={props?.emailConfiguration?.from_mail} onChange={handleChange} />
      </Box>
      <FormControlLabel
        label="Mark As Default"
        control={<CheckBox checked={props?.emailConfiguration?.isDefault} onChange={handleCheckboxChange} />}
      />
    </Box>
  );
}
