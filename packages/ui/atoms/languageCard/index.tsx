import { Box } from '@mui/material';
import { Input, Label } from '..';

import { languageCardStyle } from './style';

export interface LanguageCardProps {
  title: string;
  value: string;
  onChange: (message: string) => void;
  placeholder: string;
}

export const LanguageCard = (props: LanguageCardProps): JSX.Element => {
  const {
    title = '',
    value = '',
    placeholder = '',
    onChange = () => false,
  } = props;

  return (
    <Box sx={languageCardStyle.rootSx}>
      <Box sx={languageCardStyle.rootMainSx}>
        <Label sx={languageCardStyle.labelSx} htmlFor="language">
          {title}
        </Label>
        <Box sx={{ pt: 1 }}>
          <Input
            size="small"
            value={value}
            placeholder={placeholder}
            textFieldStyle={languageCardStyle.inputSx}
            onChange={(e: any) => onChange(e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
};
