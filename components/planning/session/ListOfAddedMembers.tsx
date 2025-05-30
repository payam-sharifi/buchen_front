'use client';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import MembersShow from './MembersShow';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const AddedMemberList = ({
  membersItems,
  mode,
}: {
  membersItems: any;
  mode: any;
}) => {
  const t = useTranslations();

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // paddingX: '16px',
          paddingY: '12px',
          gap: '12px',
          my: '15px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <PeopleAltOutlinedIcon color={'info'} />
          <Typography sx={{ mx: 1 }} color="grey.800" variant="body2">
            {t('session_members')}
          </Typography>
        </Stack>

        <Typography variant="body2">
          {' '}
          {membersItems.length} {t('person_confirmed')}
        </Typography>
      </Grid>

      <Link href={mode ? 'planning/searchmembers' : ''}>
        <Grid container xs={12}>
          {membersItems.slice(0, 4).map((item: any, index: number) => (
            <Grid item sx={{ px: 1 }} key={index} xs="auto">
              <MembersShow item={item} />
            </Grid>
          ))}
          <Grid item sx={{ px: 1 }} xs="auto">
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '171px',

                my: 1,
                height: 'auto',
                backgroundColor: 'background.lightGray',
                borderRadius: '12px',
                py: 0.5,
              }}
            >
              {'+'}
              <PmlmIcon src="icon-typeuser-light" />

              {/* <Typography>{membersItems.length - 4} نفر دیگر </Typography> */}
            </Stack>
          </Grid>
        </Grid>
      </Link>
    </>
  );
};
export default AddedMemberList;
