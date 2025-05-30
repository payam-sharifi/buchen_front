'use client';
import { Container, Grid, IconButton, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { useEffect, useState } from 'react';
import NewSession from '#/ui/main/planning/session/NewSession';
import { useDeleteDraftMutation } from '#/redux/services/user/planningApi';
import { useAppDispatch } from '#/redux/hooks';

export default function Page() {
  const [infoModal, setinfoModal] = useState(false);
  const [changeMode, setChangeMode] = useState(false);
  const [exitSafeModal, setExitSafe] = useState(false);
  const [checkMemberSession, setcheckMemberSession] = useState(false);
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { lang, id } = useParams();
  const dispatch = useAppDispatch();
  const [deleteDraftSession, loading] = useDeleteDraftMutation({});
  const pathname = usePathname();

  useEffect(() => {
    setcheckMemberSession(pathname.includes('membersession'));
  }, [pathname]);

  return (
    <Container maxWidth="md" sx={{ px: '0px' }}>
      {/* Header */}
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          sx={{
            width: '100%',
            ...(theme.direction === 'rtl'
              ? { p: 1.8, pr: 0 }
              : { p: 1.8, pl: 0 }),
          }}
        >
          <IconButton
            sx={[
              { p: 0 },
              theme.direction === 'rtl'
                ? { mr: 2, ml: 1.5 }
                : { ml: 2, mr: 1.5 },
            ]}
            onClick={() => {
              setExitSafe(true);
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
        </Grid>
      </Grid>

      {/* Description and Edit Of Sesstion */}

      {/* <NewSession mode={false} checkMemberSession={checkMemberSession}/> */}
    </Container>
  );
}
