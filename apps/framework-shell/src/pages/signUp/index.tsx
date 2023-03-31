import { SignUp } from '@core/ui/components/signUp';
import { Box } from '@mui/material';

import { signUpStyle } from './style';

export default function SignUpPage() {
  return (
    <Box sx={{ ...signUpStyle.rootSx }}>
      <SignUp />
    </Box>
  );
}
