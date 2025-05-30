import { PmlmIcon } from '#/ui/component/PmlmIcon';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

import { gregorianToJalaliText, TogregorianText } from '#/helper';
import { useGetTrackingDetailQuery } from '#/redux/services/user/planningApi';
import { useParams } from 'next/navigation';



type prop = {
  id: string;
};

const DetailOfFollowUp: FC<prop> = ({ id }) => {
  const { lang } = useParams()
  const t = useTranslations();
  const theme = useTheme();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const {
    data: detailOfTrackingData,
    isLoading,
    isSuccess,
  } = useGetTrackingDetailQuery({ TrackingId: Number(id) });

  const dateConvert = (dateTime: string) => {
    const dateParts = dateTime.split(' ');
    lang == "fa" ?
      setDate(gregorianToJalaliText(dateParts[0]))
      : setDate(TogregorianText(dateParts[0]));

    const timeParts = dateParts[1].split(':');
    const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
    setTime(formattedTime);
  };

  useEffect(() => {

    if (isSuccess) {
      dateConvert(detailOfTrackingData?.data.followDate || '');
    }
  }, [isSuccess]);

  return (
    <>
      <Grid
        sx={{
          mt: 2,
          backgroundColor: theme.palette.background.paper,
          p: 2,
          borderRadius: { xs: 0, lg: '8px' },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            border: '1px solid',
            borderColor: theme.palette.grey[200],
            borderRadius: '8px',
            p: 1.2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width={34} height={34} />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Stack
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'info.light',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PmlmIcon
                  src="icon-typeuser-solid"
                  color={theme.palette.grey[600]}
                  fontSize={'24px'}
                />

              </Stack>
              <Typography sx={{ mx: 1 }} variant="subtitle2" fontWeight={'600'}>
                {`${detailOfTrackingData?.data?.firstName} ${detailOfTrackingData?.data?.lastName}`}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => { }}
              sx={[
                {
                  p: 0.25,
                  bgcolor: 'info.lighter',
                  width: '34px',
                  height: '34px',
                },
                theme.direction === 'rtl' ? { ml: 1 } : { mr: 1 },
              ]}
            >
              <PmlmIcon
                color={theme.palette.info.main}
                src={'icon-typeeye-solid'}
                fontSize={'24px'}
              />
            </IconButton>

            <IconButton
              sx={{
                p: 0.25,
                bgcolor: 'success.lighter',
                width: '34px',
                height: '34px',
              }}
              onClick={() => { window.location.href = `tel:${detailOfTrackingData?.data?.mobile}` }}
            >
              <PmlmIcon
                src={'icon-typeCall-Solid'}
                color={theme.palette.success.main}
                fontSize={'24px'}
              />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
            {t('type_follow')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], mt: 0.5 }}
          >
            {isLoading ? (
              <Skeleton width="60%" />
            ) : (
              t(detailOfTrackingData?.data?.planFollowTitle)
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2.2 }}>
          <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
            {t('time_follow')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], mt: 0.5 }}
          >
            {isLoading ? (
              <Skeleton width="40%" />
            ) : (
              `${date} ${time != '00:00' ? time : ''}`
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2.2 }}>
          <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
            {t('product')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], mt: 0.5 }}
          >
            {isLoading ? (
              <Skeleton width="60%" />
            ) : (
              detailOfTrackingData?.data?.nameProduct
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          mt: 1.5,
          backgroundColor: theme.palette.background.paper,
          p: 2,
          borderRadius: { xs: 0, lg: '8px' },
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.grey[800] }}>
          {t('F_Description')}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
          {isLoading ? (
            <Skeleton width="80%" />
          ) : (
            detailOfTrackingData?.data?.description
          )}
        </Typography>
      </Grid>
    </>
  );
};

export default DetailOfFollowUp;
