import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Input, Label } from '..';

import { languageCardStyle } from './style';

export interface LanguageCardProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const LanguageCard = (props: LanguageCardProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

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
      <Label sx={languageCardStyle.labelSx} htmlFor="username">
        {'languageName'}
      </Label>
      <Box sx={{ pt: 1 }}>
        <Input size="small" value="Sign In" textFieldStyle={{ backgroundColor: 'primary.contrastText' }} />
      </Box>
    </Box>
  );
};
