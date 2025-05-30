'use client';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
  Grid,
  useTheme,
  Typography,
  Button,
  alpha,
  LinearProgress,
  IconButton,
  Box,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styled from '@emotion/styled';
import moment from 'jalali-moment';
import { AddDescriptionModal } from './AddDescriptionModal';
import { useColorStyles } from '#/Hooks/useColorStyles';

enum Plantype {
  FOLLOWUP = 1,
  SESION = 2,
  X = 3,
  Y = 4,
}

const Image = styled('img')({
  width: '20px',
  height: '20px',
  borderRadius: '100%',
});



const DetailOfSession = ({
  sessionDetailData,
  isLoading,
  isSuccess,
}: {
  sessionDetailData: any;
  isLoading: boolean;
  isSuccess: boolean;
}) => {
  const { lang, id } = useParams();
  const theme = useTheme();
  const router = useRouter();
  const t = useTranslations();
  const [openModalRes, setOpenModalRes] = useState(false);
  const { getbgcolor, getbordercolor } = useColorStyles();


  return (
    <>
      {isLoading && <LinearProgress />}
      {isSuccess && (
        <Grid
          container
          sx={{ backgroundColor: 'background.paper', p: 2, mt: 0.2 }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">
              {sessionDetailData?.data?.title
                ? sessionDetailData?.data?.title
                : '-'}{' '}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {sessionDetailData?.data?.planDate
                ? moment(sessionDetailData?.data?.planDate)
                  .locale(lang)
                  .format('dddd، D MMMM')
                : moment().locale(lang).format('dddd، D MMMM')}{' '}
              {!sessionDetailData?.data?.isAllDay &&
                moment(sessionDetailData?.data?.sessionDateStart)
                  .locale(lang)
                  .format('hh:mm')}
              {!sessionDetailData?.data?.isAllDay && ' - '}
              {!sessionDetailData?.data?.isAllDay &&
                moment(sessionDetailData?.data?.sessionDateEnd)
                  .locale(lang)
                  .format('hh:mm')}
            </Typography>
            {sessionDetailData?.data?.description && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mt: 0.5 }}
              >
                {sessionDetailData?.data?.description}
              </Typography>
            )}
          </Grid>
          {/* 1 */}

          {sessionDetailData?.data?.sessionLink && (
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="start"
              justifyContent="start"
              mt={2}
            >
              <PmlmIcon
                src={'icon-link'}
                color={theme.palette.grey[800]}
                fontSize={'24px'}
              />
              <Grid
                sx={[
                  theme.direction === 'rtl' ? { mr: 1 } : { mr: 1 },
                  { flexGrow: 1 },
                ]}
              >
                <Typography variant="subtitle1">{t('Session_link')}</Typography>
                <Link href={`${sessionDetailData?.data?.sessionLink}`}>
                  <Typography
                    sx={{
                      textDecoration: 'underline',
                      color: 'info.main',
                      mt: 0.5,
                      wordBreak: 'break-all',
                    }}
                  >
                    {sessionDetailData?.data?.sessionLink}
                  </Typography>{' '}
                </Link>
              </Grid>
            </Grid>
          )}
          {/* 2 */}
          {sessionDetailData?.data?.location !== '///' && (
            <>
              <Grid item xs={12} mt={2}>
                <Grid display="flex" alignItems="center" justifyContent="start">
                  <PmlmIcon
                    src={'icon-typelocation-dot'}
                    color={theme.palette.grey[800]}
                    fontSize={'24px'}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={[theme.direction === 'rtl' ? { mr: 1 } : { ml: 1 }]}
                  >
                    {t('Meeting_place')}{' '}
                  </Typography>
                </Grid>
                <Grid sx={[theme.direction === 'rtl' ? { mr: 4 } : { ml: 4 }]}>
                  <Link href={`${sessionDetailData?.data?.location}`}>
                    <Typography
                      sx={{
                        textDecoration: 'underline',
                        color: 'info.main',
                        mt: 0.5,
                        wordBreak: 'break-all',
                      }}
                    >
                      {sessionDetailData?.data?.location}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={'grey.800'}
                    mt={1}
                  >
                    {t('F_Address')} :{' '}
                    {sessionDetailData?.data?.location.split('///')[1]
                      ? sessionDetailData?.data?.location.split('///')[1]
                      : '-'}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
          {/* 3 */}

          {sessionDetailData?.data?.attachmentListWithURL.length !== 0 && (



            <>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent="start"
                mt={3}
              >

                <PmlmIcon
                  src={'icon-paperclip-vertical'}
                  color={theme.palette.grey[800]}
                  fontSize={'24px'}
                />
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color={'grey.800'}
                >
                  {t('Paperclip')}{' '}
                </Typography>
              </Grid>
              <Grid
                sx={[
                  theme.direction === 'rtl' ? { mr: 1 } : { mr: 1 },
                  { flexGrow: 1 },
                ]}
              >

                <Grid container sx={{ width: '100%', mt: 0.5 }} spacing={1}>
                  {sessionDetailData?.data?.attachmentListWithURL
                    ? sessionDetailData?.data?.attachmentListWithURL?.map(
                      (j: any) => (
                        <Grid item xs={6} md={3}>
                          <IconButton onClick={() => window.open(j.attachmentURL, '_blank')} >
                            <Grid
                              sx={{
                                backgroundColor: 'grey.300',
                                borderRadius: '8px',
                                py: 1,
                                px: 1.5,
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={'grey.800'}
                              >
                                {j.title}.{j.typeFile}
                              </Typography>
                              {/* <Typography variant="caption" color={'grey.700'}>
                            2.7 mg
                          </Typography> */}
                            </Grid>
                          </IconButton>
                        </Grid>
                      ),
                    )
                    : '-'}
                </Grid>
              </Grid>
            </>

          )}
          {/* 4  */}

          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="start"
            mt={2}
          >
            <PmlmIcon
              src={'icon-typecircle-solid'}
              color={getbordercolor(sessionDetailData?.data?.planTagId)}
              fontSize={'24px'}
            />

            <Grid
              sx={[
                theme.direction === 'rtl' ? { mr: 1 } : { mr: 1 },
                { flexGrow: 1 },
              ]}
            >
              <Typography variant="subtitle1">
                {t(sessionDetailData?.data?.nameTags)}{' '}
              </Typography>
            </Grid>
          </Grid>
          {/* 5 */}
          {sessionDetailData?.data?.listContributeModel.length !== 0 && (
            <Grid
              item
              xs={12}
              mt={1}
              onClick={() =>
                router.push('/' + lang + '/planning/contributers/' + id)
              }
            >
              <Button variant="text" color="inherit" fullWidth sx={{ px: 0 }}>
                <Grid
                  container
                  display="flex"
                  alignItems="center"
                  justifyContent="start"
                >
                  <PmlmIcon
                    src={'icon-users'}
                    color={theme.palette.grey[800]}
                    fontSize={'24px'}
                  />

                  <Typography variant="subtitle1" sx={{ px: 1 }}>
                    {t('session_members')}{' '}
                  </Typography>
                </Grid>
              </Button>
              <Grid sx={[theme.direction === 'rtl' ? { mr: 2 } : { ml: 2 }]}>
                <Grid container sx={{ width: '100%', justifyContent: 'start' }}>

                  {sessionDetailData.data?.listContributeModel?.map(
                    (j: any, index: any) => (
                      <Grid item xs={6} sx={{ py: 0.3, px: 0.3 }}>
                        <Grid
                          sx={{
                            bgcolor: 'grey.300',
                            borderRadius: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            py: 0.5,
                            px: 1.3,
                          }}
                        >
                          {j.profilePhotoUrl ? (
                            <Image src={j.profilePhotoUrl} />
                          ) : (
                            <PmlmIcon
                              src={'icon-typeuser-solid'}
                              color={theme.palette.grey[400]}
                              fontSize={'24px'}
                            />
                          )}
                          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color={'grey.800'}
                              sx={[
                                theme.direction === 'rtl' ? { mr: 0.5 } : { ml: 0.5 },
                              ]}
                            >

                              {j.customerName}
                            </Typography>
                            </Grid>
                        
                              
                            {(!sessionDetailData?.data?.isOwner && index == 0) &&
                              <>
                                {'-'}
                                < Typography
                                  variant="caption"
                                  fontWeight="bold"
                                  color={'grey.800'}
                                  sx={{ color: theme.palette.grey[600] }}
                                >
                            {t('the_creator')}
                                </Typography>
                              </>
                            } 
                   
                        

                          {sessionDetailData?.data?.isOwner && (
                            <>
                              {' - '}
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={'grey.800'}
                                sx={{ color: theme.palette.grey[600] }}
                              >

                                {j.semat_Desc}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    ),
                  )}
                  {sessionDetailData?.data?.cnt > 4 && 
                    <Grid item xs={6} sx={{ py: 0.3, px: 0.3 }}
                      onClick={() =>
                        router.push('/' + lang + '/planning/contributers/' + id)
                      }
                    >
                      <Grid
                        sx={{
                          bgcolor: 'grey.300',
                          borderRadius: '25px',
                          display: 'flex',
                          alignItems: 'center',
                          py: 0.5,
                          px: 1.3,
                        }}
                      >
                        <PersonIcon sx={{ fontSize: '20px', color: "grey", marginLeft: '3px' }} />
                        <Typography
                        >

                          {` + ${' '} ${sessionDetailData?.data?.cnt - 4} ${t('another_person')} ${' '} `}
                        </Typography>
                      </Grid>
                    </Grid>
                  }

                </Grid>

              </Grid>
            </Grid>
          )}
          {!sessionDetailData?.data?.isOwner && (
            <Button
              variant="contained"
              sx={{ fontSize: '14px', mt: 4 }}
              fullWidth
              onClick={() => setOpenModalRes(true)}
            >
              {t('realized')}
            </Button>
          )}
        </Grid >
      )}
      <AddDescriptionModal
        open={openModalRes}
        handleClose={() => setOpenModalRes(false)}
      />
    </>
  );
};
export default DetailOfSession;
