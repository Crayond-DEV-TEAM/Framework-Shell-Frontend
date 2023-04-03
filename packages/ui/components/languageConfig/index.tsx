import { Button } from '@atoms/button';
import { DropDown } from '@atoms/dropDown';
import { DeleteChip, LanguageTop } from '@atoms/icons';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '@atoms/searchField';
import { Chip, Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect } from 'react';
import { languageConfigStyle } from './style';
import { useLanguageConfiguration } from '@core/store';
import { SelectBoxInterface } from '@core/store/interface';

export interface LanguageConfigProps {
  className?: string;
  sx?: SxProps<Theme>;
  select?: string;
  payload?: any;
}

export const LanguageConfig = forwardRef((props: LanguageConfigProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, select = '', payload = {}, ...rest } = props;

  const {
    addLanguage,
    deleteLanguage,
    languages,
    saveLanguage,
    saving,
    errorOnSaving,
    updateDefaultLang,
    isSaved,
    defaultLang,
    getSavedLanguage,
    fetching,
    errorOnFetching,
    getAllLanguages,
    masterLanguages,
    masterLanguageError,
    masterLanguageLoading,
    message,
  } = useLanguageConfiguration();

  useEffect(() => {
    getAllLanguages();
    getSavedLanguage();
    // eslint-disable-nextline
  }, []);

  return (
    <Box
      sx={[{ ...languageConfigStyle.rootSx }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 4 }}>
        <LanguageTop />
        <Typography sx={languageConfigStyle.topText}>Language Configuration</Typography>
      </Box>
      <Box>
        <SearchField
          startAdornment={<SearchIcon sx={{ fontSize: '20px', color: '#29302B' }} />}
          placeholder="Search and choose the language you're looking for..."
          totalSearchSx={languageConfigStyle.searchBoxSx}
          searchField_Style={languageConfigStyle.innerSearchSx}
          select
          selectOption={masterLanguages}
          onSelect={addLanguage}
          onSearch={undefined}
        />
      </Box>

      <Box sx={languageConfigStyle.sx}>
        <Box sx={languageConfigStyle.header}>
          <Typography sx={languageConfigStyle.selectLang}>Selected Language</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={languageConfigStyle.default}>Default Language</Typography>
            <Box sx={{ width: '172px', height: '36px', pl: 1 }}>
              <DropDown value={defaultLang?.value} selectOption={languages} onSelect={updateDefaultLang} />
            </Box>
          </Box>
        </Box>
        <Box sx={languageConfigStyle.content}>
          <Grid container spacing={1}>
            {languages?.map((data: SelectBoxInterface, index: number) => {
              return (
                <Grid item key={index}>
                  <Chip
                    sx={{ backgroundColor: 'primary.main', width: 'auto', py: '10px', color: '#fff' }}
                    label={data.label}
                    onDelete={() => deleteLanguage(data, index)}
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
            {message.length > 0 && (
              <Typography sx={isSaved ? languageConfigStyle.messageSuccess : languageConfigStyle.messageBox}>
                {message}
              </Typography>
            )}

            <Button
              buttonStyle={{
                width: '62px',
                height: '28px',
                textTransform: 'capitalize',
                display: 'flex',
                justifyContent: 'flex-end',
                mr: 2.5,
              }}
              onclick={saveLanguage}
              loading={saving}
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
