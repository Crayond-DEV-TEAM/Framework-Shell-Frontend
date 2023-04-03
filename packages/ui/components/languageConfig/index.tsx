import { Button } from '@atoms/button';
import { DropDown } from '@atoms/dropDown';
import { DeleteChip, LanguageTop } from '@atoms/icons';
import SearchIcon from '@mui/icons-material/Search';
import { SearchField } from '@atoms/searchField';
import { Chip, Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState, useEffect } from 'react';
import { useLanguage } from '../../../store';
import { languageConfigStyle } from './style';

export interface LanguageConfigProps {
  className?: string;
  sx?: SxProps<Theme>;
  select?: string;
  payload?: any;
}
interface ChipData {
  key: number;
  label: string;
}

export const LanguageConfig = forwardRef((props: LanguageConfigProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    langState,
    loading,
    languagedisplay,
    handleGroupChange,
    addedlanguagedisplay,
    handleDropChange,
    addedLangState,
    dropState,
    savelanguages,
    handleLanguageChange,
    selectedState,
    savelangState,
    responseState,
    statusState,
  } = useLanguage((state) => ({
    languagedisplay: state.languagedisplay,
    langState: state.langState,
    handleGroupChange: state.handleGroupChange,
    handleLanguageChange: state.handleLanguageChange,
    handleDropChange: state.selectedState,
    addedLangState: state.addedLangState,
    addedlanguagedisplay: state.addedlanguagedisplay,
    savelanguages: state.savelanguages,
    //setUser: state.setUser,
    loading: state.loading,
    selectedState: state.selectedState,
    dropState: state.dropState,
    savelangState: state.savelangState,
    responseState: state.responseState,
    statusState: state.statusState,
  }));
  console.log(statusState, 'console.log(addedLangStat;');
  console.log(addedLangState, 'jhdkjhk');
  const { className = '', sx = {}, select = '', payload = {}, ...rest } = props;
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'English' },
    { key: 1, label: 'Tamil' },
    { key: 2, label: 'Hindi' },
    { key: 3, label: 'Arabic' },
  ]);
  const [onSearch, setOnSearch] = useState('');
  const [drop, setDrop] = useState('');
  const [check, setCheck] = useState([]);
  const [lang, setLang] = useState([]);
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  const langSearch = async () => {
    const response = await languagedisplay();
    convertArrayToObject(langState);
  };
  const convertArrayToObject = (langState: any) => {
    const array = [];
    for (const data of langState) {
      const obj = {
        label: data.language_name,
        value: data.language_name,
      };
      array.push(obj);
    }
    setCheck(array);
  };

  const addLangdisp = async () => {
    const response = await addedlanguagedisplay({});
    convertArrayObjectTwo(addedLangState);
  };

  const convertArrayObjectTwo = (addedLangState: any) => {
    const array = [];
    for (const data of addedLangState) {
      const obj = {
        label: data.language.label,
        value: data.language.value,
      };
      array.push(obj);
    }
    setLang(array);
  };

  const saveLang = async () => {
    const payloadsave = selectedState.selectedState;
    const res = await savelanguages(payloadsave);
    addLangdisp();
  };
  const searchfunc = (val: any) => {
    setOnSearch(val);
    handleGroupChange('selectedState', val);
    handleLanguageChange([{ language: { label: val } }]);
  };
  console.log(handleLanguageChange, 'handleLanguageChange');
  const handledropopen = (val: any) => {
    handleGroupChange('dropState', val);
    setDrop(val);
  };

  // const addingFunc = () => {
  //   const a = selectedState + '' + addedLangState.language.language_name;
  //   console.log(a, 'addingFunc');
  // };

  const initialData = async () => {
    const languageResponse = await languagedisplay();
    convertArrayToObject(languageResponse);
    const displan = await addLangdisp();
    convertArrayObjectTwo(displan);
  };
  useEffect(() => {
    initialData();
  }, []);

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
      <Box>
        <SearchField
          startAdornment={<SearchIcon sx={{ fontSize: '20px', color: '#29302B' }} />}
          placeholder="Search and choose the language you're looking for..."
          totalSearchSx={languageConfigStyle.searchBoxSx}
          searchField_Style={languageConfigStyle.innerSearchSx}
          select
          selectOption={check}
          setOnSearch={searchfunc}
          onSearch={onSearch}
        />
      </Box>

      <Box sx={languageConfigStyle.sx}>
        <Box sx={languageConfigStyle.header}>
          <Typography sx={languageConfigStyle.selectLang}>Selected Language</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={languageConfigStyle.default}>Default Language</Typography>
            <Box sx={{ width: '172px', height: '36px', pl: 1 }}>
              <DropDown value={drop} selectOption={lang} onchange={handledropopen} />
            </Box>
          </Box>
        </Box>
        <Box sx={languageConfigStyle.content}>
          <Grid container spacing={1}>
            {addedLangState?.map((data: any) => {
              return (
                <Grid item key={data.key}>
                  <Chip
                    sx={{ backgroundColor: 'primary.main', width: 'auto', py: '10px', color: '#fff' }}
                    label={data.language.label}
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
            {/* {statusState === 200 ? ( */}
            {onSearch?.length === 0 ? (
              ''
            ) : (
              <>
                {responseState === 200 ? (
                  <Typography sx={languageConfigStyle.messageSuccess}>Changes saved.</Typography>
                ) : responseState !== undefined ? (
                  <Typography sx={languageConfigStyle.messageBox}>
                    Changes will be lost if you don&apos;t save.
                  </Typography>
                ) : null}
              </>
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
              onclick={() => saveLang()}
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
