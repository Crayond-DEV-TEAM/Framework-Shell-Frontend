import { Box } from '@mui/material';
import { ProfileStyle } from './style';
import { MyProfile } from '@core/ui/components';

export default function ProfilePage() {
  return (
    <Box sx={{ ...ProfileStyle.rootSx }}>
      <MyProfile />
    </Box>
  );
}


