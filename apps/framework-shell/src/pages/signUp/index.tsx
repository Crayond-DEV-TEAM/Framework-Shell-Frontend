import { Box } from '@mui/material';

import { signUpStyle } from './style';
import { SignUp } from '@core/ui/components';

export default function SignUpPage() {
  return (
    <Box sx={{ ...signUpStyle.rootSx }}>
      <SignUp />
    </Box>
  );
}
