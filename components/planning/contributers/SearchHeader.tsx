'use client';
import { Box, Button, InputAdornment, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React, { FC,  Dispatch } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { OutLinedTextField } from '#/ui/component/InputComp';

import { useTheme } from '@mui/material/styles';
import { PmlmIcon } from '#/ui/component/PmlmIcon';

type propsType = {
  searchText: string;
  setSearchText: Dispatch<React.SetStateAction<string>>;
};

const SearchBar: FC<propsType> = ({ searchText, setSearchText }) => {
  const pathneame = usePathname();
  const theme = useTheme();
  const { lang, id } = useParams();
  const router = useRouter();
  const t = useTranslations();

  return (
    <Grid
      container
      display="flex"
      maxWidth="md"
      sx={{
        bgcolor: 'background.paper',
        py: 1.5,
        position: 'absolute',
        top: 0,
        zIndex: 2,
      }}
    >
      <Grid
        item
        xs={'auto'}
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        <IconButton
          onClick={() => {
            // router.push('/' + lang + '/planning/session/' + id);
          router.back()
          }}
          sx={{ py: 0 }}
        >
          <PmlmIcon
            fontSize={'35px'}
            src={
              theme.direction === 'rtl'
                ? 'icon-typeChevrone-right-solid'
                : 'icon-typeChevron-left'
            }
            color={theme.palette.text.primary}
          />
        </IconButton>
      </Grid>

      <Grid item xs={true} sx={{ px: 1.5 }}>
        <OutLinedTextField
          size="small"
          variant="filled"
          label={t('F_Filter_Key2')}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value.toString());
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ px: 1 }}>
                {/* <PmlmIcon
                  src={'icon-typemagnifying-glass-light'}
                  color={theme.palette.secondary.main}
                /> */}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
