'use client';
import { Grid, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { PmlmIcon } from '@/components/PmlmIcon';
import AlertCancelModal from '@/components/planning/common/AlertCancelModal';


type PropsType = {
  link?: string;
  text?: string;
  safeExit?: boolean
};

const BackHeader: FC<PropsType> = ({ link, text, safeExit = false }) => {
  const theme = useTheme();
  const router = useRouter();
  const { lang } = useParams();
  const [exitSafeModal, setExitSafe] = useState(false);

  return (
    <Grid
      container
      justifyContent="start"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        ...(theme.direction === 'rtl' ? { p: 1.8, pr: 0 } : { p: 1.8, pl: 0 }),
      }}
    >
      <IconButton
        sx={[
          { p: 0 },
          theme.direction === 'rtl' ? { mr: 2, ml: 1.5 } : { ml: 2, mr: 1.5 },
        ]}
        onClick={() => {
          safeExit ? setExitSafe(true) :
            link ? router.push('/' + lang + '/' + link) : router.back();
        }}
      >
        <PmlmIcon
          src={
            theme.direction === 'rtl'
              ? 'icon-typeChevrone-right-solid'
              : 'icon-typeChevron-left'
          }
        />
      </IconButton>
      <Typography variant="h6">{text}</Typography>
      <AlertCancelModal
        openModal={exitSafeModal}
        onClose={() => setExitSafe(false)}
        title={'Unsaved_changes'}
        content={'exit_without_saving?'}
        action={() => router.push(`/${lang}/planning/`)}
      />
    </Grid>
  );
};
export default BackHeader;
