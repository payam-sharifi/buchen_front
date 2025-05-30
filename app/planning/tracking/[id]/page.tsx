'use client';
import {
  useDeleteTrackingMutation,
  useGetTrackingDetailQuery,

} from '#/redux/services/user/planningApi';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import DeleteModal from '#/ui/main/planning/common/DeleteModal';
import DetailOfFollowUp from '#/ui/main/planning/tracking/DetailOfTracking';
import { Box, Container, Grid, IconButton, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch } from '#/redux/hooks';
import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';

import moment from 'moment';
export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [openDelModal, setOpenDelModal] = useState(false);
  const { lang, id } = useParams();
  const [deleteTracking] = useDeleteTrackingMutation();
  const deleteAction = () => {
    deleteTracking({ trackingId: Number(id) })
      .unwrap()
      .then((response: any) => {
        dispatch(setAlert(t(response?.status)));
        dispatch(setSuccess(t(response?.data)));
        dispatch(setMessage(t(response?.message)));
        router.push(`/${lang}/planning`);
      })
      .catch((error) => { });
  };
  const {
    data: detailOfTrackingData,
    isLoading,
    isSuccess,
  } = useGetTrackingDetailQuery({ TrackingId: Number(id) });



  return (
    <Container maxWidth="md" sx={{ px: '0px' }}>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          borderBottom: '1px solid',
          borderColor: theme.palette.grey[200],
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
              router.push(`/${lang}/planning`);
            }}
          >
            <PmlmIcon
              src={
                theme.direction === 'rtl'
                  ? 'icon-typeChevrone-right-solid'
                  : 'icon-typeChevron-left'
              }
              color={theme.palette.secondary.main}
            />
          </IconButton>
        </Grid>

        <Box sx={{ display: 'flex', mx: 1, alignItems: 'center' }}>
          <IconButton onClick={() => setOpenDelModal(true)}>
            <PmlmIcon
              src={'icon-typetrash-can'}
              color={theme.palette.secondary.main}
            />
          </IconButton>
          <IconButton
            sx={
              {
                display: moment(detailOfTrackingData?.data?.followDate, 'YYYY-MM-DD HH:mm:ss.S').isBefore(moment()) ? 'none' : 'block',
                mt: '10px'

              }
            }
          
            onClick={() => {
              router.push(`/${lang}/planning/tracking/new/${id}`);
            }}
          >
            <PmlmIcon
              src={'icon-typepen-regular'}
              color={theme.palette.secondary.main}
            />
          </IconButton>
        </Box>
      </Grid>
      <DeleteModal
        openModal={openDelModal}
        onClose={() => setOpenDelModal(false)}
        title={ t('tracking_delete')}
        content={t('sure_delete_follow_up_session')}
        action={deleteAction}
      />
      <DetailOfFollowUp id={id.toString()} />
    </Container>
  );
}
