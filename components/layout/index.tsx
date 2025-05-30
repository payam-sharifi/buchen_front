'use client';
import React, { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  AuthorizationNeeded,
  useIsAutenticated,
} from '@/components/AuthorizationNeeded';
import { Grid } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAutenticated = useIsAutenticated();
  const { lang } = useParams();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (!isAutenticated) {
      if (searchParam.get('gate') === 'course') {
        router.push(
          `/${lang}/auth/login?gate=course&id=${useSearchParams().get('id')}`,
        );
      } else if (searchParam.get('gate') === 'learningPath') {
        router.push(
          `/${lang}/auth/login?gate=learningPath&id=${useSearchParams().get('id')}`,
        );
      } else {
        router.push(`/${lang}/auth/login`);
      }
    }
  }, []);

  return <AuthorizationNeeded>{children}</AuthorizationNeeded>;
}
