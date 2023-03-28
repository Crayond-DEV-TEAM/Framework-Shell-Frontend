import { Button } from '@atoms/button';
import { DropDown } from '@atoms/dropDown';
import { DeleteChip, LanguageTop } from '@atoms/icons';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '@atoms/searchField';
import { Chip, Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';

import { languageConfigStyle } from './style';

export interface LanguageConfigProps {
  className?: string;
  sx?: SxProps<Theme>;
}
interface ChipData {
  key: number;
  label: string;
}

export const LanguageConfig = forwardRef((props: LanguageConfigProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'English' },
    { key: 1, label: 'Tamil' },
    { key: 2, label: 'Hindi' },
    { key: 3, label: 'Arabic' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Box
      sx={[
        {
          ...languageConfigStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 4 }}>
        <LanguageTop />
        <Typography sx={languageConfigStyle.topText}>Language Configuration</Typography>
      </Box>
      <SearchField
        startAdornment={<SearchIcon sx={{ fontSize: '20px', color: '#29302B' }} />}
        placeholder="Search and choose the language you're looking for..."
        totalSearchSx={languageConfigStyle.searchBoxSx}
        searchField_Style={languageConfigStyle.innerSearchSx}
      />
      <Box sx={languageConfigStyle.sx}>
        <Box sx={languageConfigStyle.header}>
          <Typography sx={languageConfigStyle.selectLang}>Selected Language</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={languageConfigStyle.default}>Default Language</Typography>
            <Box sx={{ width: '172px', height: '36px', pl: 1 }}>
              <DropDown value={'English'} />
            </Box>
          </Box>
        </Box>
        <Box sx={languageConfigStyle.content}>
          <Grid container spacing={1}>
            {chipData.map((data) => {
              return (
                <Grid item key={data.key}>
                  <Chip
                    sx={{ backgroundColor: 'primary.main', width: 'auto', py: '10px', color: '#fff' }}
                    label={data.label}
                    onDelete={handleDelete(data)}
                    deleteIcon={<DeleteChip height={'12px'} width={'12px'} />}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Box
            sx={{
              position: 'relative',
              top: '200px',
              bottom: 0,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box sx={languageConfigStyle.messageBox}>
              <Typography sx={languageConfigStyle.messagetxt}>Changes will be lost if you don&apos;t save.</Typography>
            </Box>
            <Button
              buttonStyle={{
                width: '62px',
                height: '28px',
                textTransform: 'capitalize',
                display: 'flex',
                justifyContent: 'flex-end',
                mr: 2.5,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

LanguageConfig.displayName = 'LanguageConfig';
