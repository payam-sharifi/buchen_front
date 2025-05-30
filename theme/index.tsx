'use client';

import * as React from 'react';
import { useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//
import lightTheme from './palette';
import darkTheme from './paletteDark';

import shadowsLight from './shadows';
import shadowsDark from './shadowsDark';
import breakpoints from './breakpoints';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
// conf
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { useAppSelector } from '#/redux/hooks';
import { useParams } from 'next/navigation';
// ----------------------------------------------------------------------
// import { faIR } from '@mui/x-data-grid';
// import { faIR as pickersFaIR } from '@mui/x-date-pickers/locales';
// import { faIR as coreFaIR } from '@mui/material/locale';
import { faIR } from '@mui/material/locale';
import './styleIcon.css';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkTheme = useAppSelector((state) => state.settingSlice.darkTheme);

  const path = useParams();
  const dir = path.lang !== 'en' ? 'rtl' : 'ltr';
  const palette = isDarkTheme == 'ok' ? darkTheme : lightTheme;
  const shadows = isDarkTheme == 'ok' ? shadowsDark : shadowsLight;

  const themeOptions: any = useMemo(
    () => ({
      direction: dir,
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      breakpoints: breakpoints,
    }),
    [dir, palette],
  );

  const theme: any = createTheme(
    themeOptions,
    faIR, // core translations
  );
  theme.components = componentsOverride(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
