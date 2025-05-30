'use client';
import { Container } from '@mui/material';
import React from 'react';
import { useParams,  } from 'next/navigation';

import AddedListFollowUp from '@/components/planning/tracking/NewTracking';
import BackHeader from '@/components/BackHeader';
import EditTracking from '@/components/planning/tracking/EditTracking';


export default function Page() {

  const { lang, id } = useParams();

  return (
    <Container maxWidth="md" sx={{ px: { xs: 0 } }}>
      <BackHeader safeExit={true} link={'/planning'} text={id === '0' ?('Follow_Up') : ('Edit_Tracking')} />
      {id === '0' ? <AddedListFollowUp /> : <EditTracking  />}
    </Container>
  );
}
