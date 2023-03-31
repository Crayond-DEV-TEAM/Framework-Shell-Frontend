import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Input, Label } from '..';

import { languageCardStyle } from './style';

export interface LanguageCardProps {
  className?: string;
  handleLanguageChange?: (key: any, value: any) => void;
  language?: any;
  sx?: SxProps<Theme>;
}

export const LanguageCard = (props: LanguageCardProps): JSX.Element => {
  const { className = '', sx = {}, language, handleLanguageChange = () => false, ...rest } = props;

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
      {language?.map((val: any, i: any) => {
        return (
          <Box key={i} sx={languageCardStyle.rootMainSx}>
            <Label sx={languageCardStyle.labelSx} htmlFor="username">
              {'languageName'}
            </Label>
            <Box sx={{ pt: 1 }}>
              <Input
                size="small"
                value={val?.value}
                onChange={(event) => handleLanguageChange(i, event.target.value)}
                textFieldStyle={{ backgroundColor: 'primary.contrastText' }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
