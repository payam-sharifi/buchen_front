'use client';
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  IconButton,
  Grid,
  Modal,
  Stack,
  Divider,
  Container,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { styled, useTheme } from '@mui/material/styles';
import { SearchBar, AddedList, SelectList } from '#/ui/main/planning/addMember';

export default function Page() {
  const pathneame = usePathname();
  const path = useParams();
  const router = useRouter();
  const t = useTranslations();
  const [searchText, setSearchText] = useState('');
  const [focusedSerch, setFocusedSearch] = useState(false);

  const resetSearchText = () => {
    setSearchText('');
    setFocusedSearch(false);
  };

  const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ px: { xs: 0 } }}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        resetSearchText={resetSearchText}
        focusedSerch={focusedSerch}
        setFocusedSearch={setFocusedSearch}
      />

     {focusedSerch && <SelectList   setFocusedSearch={()=>setFocusedSearch(false)} searchText={searchText} />}  

       <AddedList focusedSerch={focusedSerch} />
    </Container>
  );
}
