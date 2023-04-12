import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Input, Label } from '..';

import { languageCardStyle } from './style';
import { title } from 'process';
import { useState } from 'react';

export interface LanguageCardProps {
  className?: string;
  title?: string;
  handleLanguageChange?: (key: any, value: any) => void;
  languageBox?: (val: any) => void;
  value?: any;
  placeholder?: any;
  index?: number;
  language?: any;
  onChange?: (key: any, value: any) => void;
  sx?: SxProps<Theme>;
}

export const LanguageCard = (props: LanguageCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = '',
    language,
    value = {},
    index = '',
    placeholder = '',
    onChange = () => false,
    languageBox = () => false,
    handleLanguageChange = () => false,
    ...rest
  } = props;
  const [languageState, SetLanguageState] = useState<any>(value);
  return (
    <Box
      sx={[
        {
          ...languageCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={languageCardStyle.rootMainSx}>
        <Label sx={languageCardStyle.labelSx} htmlFor="language">
          {title}
        </Label>
        <Box sx={{ pt: 1 }}>
          <Input
            size="small"
            value={value?.message}
            placeholder={placeholder}
            textFieldStyle={languageCardStyle.inputSx}
            onChange={(e: any) => onChange('message', e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
};
