import { Skeleton, Box } from '@mui/material';
export const Repositorysimmer = () => {
  return (
    <Box>
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '20px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '30px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '40px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '50px', mt: '20px' }} />
      {/* <Skeleton variant="rounded" width={160} height={20} sx={{ ml: '61px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={20} sx={{ ml: '61px', mt: '20px' }} /> */}
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '50px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '40px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '30px', mt: '20px' }} />
      <Skeleton variant="rounded" width={160} height={17} sx={{ ml: '20px', mt: '20px' }} />
    </Box>
  );
};
