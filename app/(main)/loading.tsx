'use client';
import React from 'react';
import {Grid, useTheme} from '@mui/material';
import Image from "next/image";

export default function Loading() {
  const theme = useTheme();

  return (
    <Grid sx={{
      backgroundColor: theme.palette.primary.main,
      height: '100vh',
      width: '100%',
      textAlign: 'center', display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Grid>
        <Grid color={theme.palette.background.paper} textAlign={'center'}>
          {/* <Image src={'https://file.pmlm.ir/content/image/icons/pmlm-logo.svg'} alt={'logo'} width={160} height={60} */}
                 {/* style={{margin: 'auto'}}/> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
