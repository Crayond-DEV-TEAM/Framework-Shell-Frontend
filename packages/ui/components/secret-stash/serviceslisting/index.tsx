import { IconButton, Skeleton, Stack, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { servicesListingStyle } from './styles';
import { AddIcon, SearchIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { MessageCard } from '@atoms/messageCard';

export interface ServicesListingProps {
  className?: any;
  sx?: SxProps<Theme>;
  onMessageTable?: (key: any, value: string) => void;
  setList?: (key: any, value: string) => void;
  services?: any;
  searchTerm?: string;
  handleOpen?: () => void;
  handleServiceClick?: (e: any, index: number) => void;
  handleSearch?: (e: any) => void;
  onEditServices?: (e: any, index: number) => void;
  fetching: boolean;
  slugIndex: string;
}

export const ServicesListing = (props: ServicesListingProps): JSX.Element => {
  const {
    className = {},
    onMessageTable = () => false,
    handleOpen = () => false,
    setList = {},
    sx = {},
    services = [],
    fetching = false,
    handleServiceClick = () => false,
    slugIndex,
    searchTerm = '',
    handleSearch = () => false,
    onEditServices = () => false,
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...servicesListingStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={servicesListingStyle.header}>
        <Typography sx={servicesListingStyle.titleSx}>{'Services'}</Typography>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ py: 2, px: 1.25 }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
        />
      </Box>
      <Box sx={servicesListingStyle.totalGroupSx}>
        {Array.isArray(services) && services?.length > 0 ? (
          services?.map((x: any, index: any) => {
            return (
              <Box key={index}>
                <MessageCard
                  title={x.name}
                  isActive={x.isActive}
                  index={x?.id}
                  select={slugIndex}
                  onMessaageClick={() => handleServiceClick(x, index)}
                  // onDelete={() => deleteMessageGroups({ id: x.id })}
                  onEdit={() => onEditServices(x, index)}
                />
              </Box>
            );
          })
        ) : (
          <Box>
            {fetching ? (
              <Stack spacing={0.25} px={2}>
                {Array.from(Array(10).keys()).map((_) => (
                  <Skeleton height={40} width={'100%'} key={_} />
                ))}
              </Stack>
            ) : <Typography variant="body2" color="textSecondary">
              You are yet to add a message group.
            </Typography>}

          </Box>
        )}
      </Box>
    </Box>
  );
};
