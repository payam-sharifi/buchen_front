import React from 'react';
import { getDictionary } from '#/get-dictionary';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: 'fa' | 'ar' | 'en' };
}) {
  const dictionary = await getDictionary(lang);
  return {
    title:
      dictionary['metadata'].planning.title +
      ' | ' +
      dictionary['metadata'].pmlm.title,
    description:
      dictionary['metadata'].planning.description +
      ' | ' +
      dictionary['metadata'].pmlm.description,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
