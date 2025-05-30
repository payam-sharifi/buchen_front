'use client';
import {
  Alert,
 
  Container,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';

import { useParams, useRouter } from 'next/navigation';
import { PmlmIcon } from '@/components/PmlmIcon';
import { useState } from 'react';


import NewSession from '@/components/planning/session/NewSession';
import { useDeleteDraftMutation } from '@/redux/services/planningApi';
import {
  setAlert,
  setMessage,
  setSuccess,
} from '@/redux/features/snackBarHandlerSlice';
import { useAppDispatch } from '@/redux/hooks';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import AlertCancelModal from '@/components/planning/common/AlertCancelModal';
export default function Page() {
  const [infoModal, setinfoModal] = useState(false);
  const [exitSafeModal, setExitSafe] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const { lang, id } = useParams();
  const dispatch = useAppDispatch();
  const [deleteDraftSession, loading] = useDeleteDraftMutation({});

  const deletDraft = () => {
    deleteDraftSession({
      sessionId: Array.isArray(id) ? parseInt(id[0]) : parseInt(id),
    })
      .unwrap()
      .then((response: any) => {
        dispatch(setAlert(response?.status));
        dispatch(setSuccess(response?.data));
        dispatch(setMessage(response?.message));

        setinfoModal(false);
        setAlertModal(true);
        setTimeout(() => {
          router.push(`/${lang}/planning/`);
        }, 4000);
      })
      .catch((error) => {});
  };

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
              id === '0'
                ? setExitSafe(true)
                // :router.back()
               : router.push(`/${lang}/planning/`);
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
          <Typography variant="h6">
            {id !== '0' ? 'Edit_Session' : 'New_Session'}
          </Typography>
        </Grid>
      </Grid>

      {/* Description and Edit Of Sesstion */}

      <NewSession />
      <AlertCancelModal
        openModal={exitSafeModal}
        onClose={() => setExitSafe(false)}
        title={'Unsaved_changes'}
        content={'exit_without_saving?'}
        action={() => router.push(`/${lang}/planning/`)}
      />

      <Snackbar
        open={alertModal}
        autoHideDuration={2000}
        onClose={() => setAlertModal(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1.5,
            px: 1,
            background: theme.palette.success.light,
            width: '95%',
            margin: '0 auto',
          }}
          icon={<CheckBoxRoundedIcon />}
        >
          {'Meet_cancel_alert'}
        </Alert>
      </Snackbar>
    </Container>
  );
}
