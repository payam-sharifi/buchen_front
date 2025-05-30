'use client';
import { Container } from '@mui/material';
import React from 'react';
import { useParams,  } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AddedListFollowUp from '#/ui/main/planning/tracking/NewTracking';
import BackHeader from '#/ui/component/BackHeader';
import EditTracking from '#/ui/main/planning/tracking/EditTracking';
import { useGetTrackingDetailForEditQuery } from '#/redux/services/user/planningApi';

export default function Page() {
  const t = useTranslations();
  const { lang, id } = useParams();

  return (
    <Container maxWidth="md" sx={{ px: { xs: 0 } }}>
      <BackHeader safeExit={true} link={'/planning'} text={id === '0' ?t('Follow_Up') : t('Edit_Tracking')} />
      {id === '0' ? <AddedListFollowUp /> : <EditTracking  />}
    </Container>
  );
}
