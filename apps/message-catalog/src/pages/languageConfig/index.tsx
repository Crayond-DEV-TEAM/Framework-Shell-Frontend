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
      <Box sx={{ paddingRight: '300px', py: '84px', paddingLeft: '244px' }}>
        <LanguageConfig />
      </Box>
    </Box>
  );
}
