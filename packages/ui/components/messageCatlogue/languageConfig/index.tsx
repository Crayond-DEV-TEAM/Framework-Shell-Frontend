import { Button } from '@atoms/button';
import { DropDown } from '@atoms/dropDown';
import { DeleteChip, LanguageTop } from '@atoms/icons';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '@atoms/searchField';
import { Chip, Grid, Skeleton, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { languageConfigStyle } from './style';
import { useLanguageConfiguration, useSlug } from '@core/store';
// import { enqueueSnackbar } from 'notistack';
import { SelectBoxInterface } from '@core/store/interface';
import { DeleteDailog } from '@atoms/deletedailog';
import { useNavigate } from 'react-router-dom';
import { messageRoutes } from '@core/routes';

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

  const { slugs } = useSlug();

  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setSelected(true);
    // setIsEdit(false);
  };
  const handlemodalClose = () => {
    setSelected(false);
  };
  const handleDelete = () => {
    debugger;
    deleteLanguage(null, null);
    setSelected(false);
  };
  console.log(languages, 'message');

  const OnsaveLangugae = () => {
    saveLanguage();
    setTimeout(() => {
      navigate(messageRoutes.messagegroup, { state: languages });
    }, 5000);
  };

  useEffect(() => {
    if (slugs?.['MESSAGE-CATALOG']) {
      getAllLanguages();
      getSavedLanguage();
    }
  }, [slugs?.['MESSAGE-CATALOG']]);

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
          placeholder="Search and choose the language you're looking for..."
          options={masterLanguages}
          onSelect={addLanguage}
          onSearch={() => false}
          loading={masterLanguageLoading}
        />
      </Box>
      {masterLanguageError === true && (
        <Typography sx={{ fontSize: '12px', color: 'red', ml: 1 }}>
          Oops! Something went wrong, Try Again Later
        </Typography>
      )}
      <Box sx={{ padding: '8px' }} />
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
            {fetching === true ? (
              <Box sx={{ display: 'flex' }}>
                <Skeleton
                  variant="rounded"
                  width={98}
                  height={37}
                  sx={{ borderRadius: '19px', marginLeft: '10px', marginTop: '5px' }}
                />
                <Skeleton
                  variant="rounded"
                  width={98}
                  height={37}
                  sx={{ borderRadius: '19px', marginLeft: '10px', marginTop: '5px' }}
                />
                <Skeleton
                  variant="rounded"
                  width={98}
                  height={37}
                  sx={{ borderRadius: '19px', marginLeft: '10px', marginTop: '5px' }}
                />
              </Box>
            ) : (
              <>
                {languages?.map((data: SelectBoxInterface, index: number) => {
                  return (
                    <Grid item key={index}>
                      <Chip
                        sx={{
                          backgroundColor: 'primary.main',
                          width: 'auto',
                          py: '10px',
                          color: '#fff',
                          ' & .MuiChip-deleteIcon': {
                            margin: '-3px 7px 0 -6px',
                          },
                        }}
                        label={data.label}
                        onDelete={handleOpen}
                        deleteIcon={<DeleteChip height={'16px'} width={'12px'} />}
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            position: 'relative',
            // top: '200px',
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
            onclick={OnsaveLangugae}
            loading={saving}
          >
            Save
          </Button>
        </Box>
      </Box>
      <DeleteDailog
        isDialogOpened={selected}
        Bodycomponent={
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Are you sure want to delete this ?</Typography>
            <Box sx={languageConfigStyle.totalFooterSx}>
              <Box sx={languageConfigStyle.btnSx}>
                <Box sx={languageConfigStyle.btnBg}>
                  <Button buttonStyle={languageConfigStyle.cancelbtnText} onClick={handlemodalClose}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={languageConfigStyle.savebtnBg}>
                  <Button buttonStyle={languageConfigStyle.savebtnText} onClick={handleDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
});

LanguageConfig.displayName = 'LanguageConfig';
