import { LanguageConfig } from '@core/ui/components';
import { Box } from '@mui/material';

import { LanguageConfigStyle } from './style';
export default function LanguageConfigPage() {
  return (
    <Box
      sx={{
        ...LanguageConfigStyle.rootSx,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '761px', margin: 'auto' }}>
        <LanguageConfig />
      </Box>
    </Box>
  );
}
