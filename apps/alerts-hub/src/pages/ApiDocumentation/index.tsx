import { Box } from '@mui/material';
import { ApiDocumentation } from '@core/ui/components/apiDocumentation';
import { apiDocumentation_Style } from './style';

export default function ApiDocumentationPage() {
  return (
    <Box sx={apiDocumentation_Style.root}>
      <ApiDocumentation />
    </Box>
  );
}
