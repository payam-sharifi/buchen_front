'use client';
import React from 'react';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function NoWifi() {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Grid
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid>
        <Grid color={theme.palette.background.paper} textAlign={'center'}>
          <Image
            src={'https://file.pmlm.ir/content/image/icons/pmlm-logo.svg'}
            alt={'logo'}
            width={160}
            height={60}
            style={{ margin: 'auto' }}
          />
          <Typography variant={'subtitle2'} sx={{ p: 1 }}>
            {t('Rules_Item2_10')}
          </Typography>
        </Grid>
        <Grid sx={{ position: 'absolute', bottom: 10, right: 10, left: 10 }}>
          <Button
            onClick={() => window.location.reload()}
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.primary.main,
            }}
          >
            <Typography sx={{ p: 1 }}>{t('Rules_Item2_09')}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
