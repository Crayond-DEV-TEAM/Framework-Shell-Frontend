import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createPlanStyle } from './style';
import TextField from '@mui/material/TextField';
import { CustomToggle } from '@atoms/customToggle';
import { ButtonGroupDropdown } from '..';

export interface CreatePlanProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreatePlan = (props: CreatePlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 19 },
    { title: 'The Godfather', year: 19 },
    { title: 'The Godfather: Part II', year: 19 },
    { title: 'The Dark Knight', year: 20 },
    { title: '12 Angry Men', year: 19 },
    { title: "Schindler's List", year: 20 },
    { title: 'Pulp Fiction', year: 20 },
    { title: 'The Lord of the Rings: The Return of the King', year: 20 },
    { title: 'The Good, the Bad and the Ugly', year: 19 },
    { title: 'Fight Club', year: 20 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 20 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 19 },
    { title: 'Forrest Gump', year: 19 },
    { title: 'Inception', year: 20 },
    { title: 'The Lord of the Rings: The Two Towers', year: 20 },
    { title: "One Flew Over the Cuckoo's Nest", year: 19 },
    { title: 'Goodfellas', year: 19 },
  ];

  return (
    <Box
      sx={[
        {
          ...createPlanStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      {/* <Autocomplete
        id="grouped-demo"
        options={top100Films.map((option) => option.title)}
        groupBy={(option) => option.year}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
      /> */}
      <ButtonGroupDropdown permissionList={top100Films} />
    </Box>
  );
};
