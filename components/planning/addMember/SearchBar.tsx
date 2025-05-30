'use client';
import { Box, Button, InputAdornment, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React, { FC, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { OutLinedTextField } from '#/ui/component/InputComp';
import {
  useGetMiniSearchCategoriesQuery,
  useGetMiniSearchResultMutation,
} from '#/redux/services/filterApi';
import RemoveMemberPopover from '#/ui/main/planning/addMember/RemoveMemberPopover';
import { styled, useTheme } from '@mui/material/styles';
import { PmlmIcon } from '#/ui/component/PmlmIcon';

type propsType = {
  searchText: string;
  focusedSerch: boolean;
  setSearchText: Dispatch<React.SetStateAction<string>>;
  resetSearchText: () => void;
  setFocusedSearch: Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar: FC<propsType> = ({
  searchText,
  setSearchText,
  focusedSerch,
  resetSearchText,
  setFocusedSearch,
}) => {
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
            focusedSerch
              ? resetSearchText()
              : router.push('/' + lang + '/planning/session/' + id);
          }}
          sx={{ py: 0 }}
        >
          {focusedSerch ? (
            <CloseIcon />
          ) : (
            <PmlmIcon
              fontSize={'35px'}
              src={
                theme.direction === 'rtl'
                  ? 'icon-typeChevrone-right-solid'
                  : 'icon-typeChevron-left'
              }
              color={theme.palette.text.primary}
            />
          )}
        </IconButton>
      </Grid>

      <Grid item xs={true} sx={{ px: 1.5 }}>
        <OutLinedTextField
          size="small"
          variant="filled"
          label={t('F_Filter_Key2')}
          value={searchText}
          onFocus={() => setFocusedSearch(true)}
          onChange={(e) => {
            setSearchText(e.target.value.toString());
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ px: 1 }}>
                <PmlmIcon
                  src={'icon-typemagnifying-glass-light'}
                  color={theme.palette.secondary.main}
                />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <RemoveMemberPopover />
    </Grid>
  );
};

export default SearchBar;
