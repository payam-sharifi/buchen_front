import {
  Box,
  Grid,
  useTheme,
  alpha,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import React, { FC, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useParams, useRouter } from 'next/navigation';
import moment, { Moment } from 'jalali-moment';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { updateSelectedDate } from '#/redux/features/planningSlice';
import { useColorStyles } from '#/Hooks/useColorStyles';



type propTyps = {
  item: string;
  setOpenQuickAddModal: Dispatch<SetStateAction<boolean>>;

  sessions: any;
};

const Day: FC<propTyps> = ({ item, sessions, setOpenQuickAddModal }) => {
  const theme = useTheme();
  const route = useRouter();
  const { lang } = useParams();
  const { getbgcolor, getbordercolor } = useColorStyles()
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector((state: any) => state.planningSlice);

  function truncateToFourWords(text: any) {
    const words = text.split(' ');
    if (words.length <= 3) {
      return text;
    }
    return words.slice(0, 3).join(' ') + ' ... ';
  }

  const isWeekend = () => {
    if (lang == 'fa') {
      return moment(item).isoWeekday() == 5;
    } else {
      return moment(item).isoWeekday() == 7;
    }
  };

  useEffect(() => {
    dispatch(
      updateSelectedDate({
        date: '',
        start: '',
        end: '',
      }),
    );
  }, []);

  return (
    <Grid
      container
      onClick={() => {
        if (moment(item).add(1, 'day').isAfter())
          selectedDate.selectedDate == moment(item).format()
            ? setOpenQuickAddModal(true)
            : dispatch(
              updateSelectedDate({
                date: moment(item).format(),
                start: '',
                end: '',
              }),
            );
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottom: '1px solid #ccc',
        height: 'auto',
        width: '100%',
        ...(moment(item).format('DD') ===
          moment(selectedDate.selectedDate).format('DD') && {
          border: `1.5px solid ${alpha(theme.palette.info.main, 0.67)}`,
          borderRadius: '5px',
        }),
      }}
    >
      <Grid container item xs={12}>
        <Grid item display="flex" alignItems="center" sx={{ py: 1.5 }}>
          <Box
            sx={{
              mx: 2,
              color:
                moment(item).format('yyyy-MM-DD') ===
                  moment().format('yyyy-MM-DD')
                  ? 'info.main'
                  : isWeekend()
                    ? 'error.main'
                    : 'text.secondary',
            }}
          >
            <Typography> {moment(item).locale(lang).format('dddd')}</Typography>
            <Typography>
              {' '}
              {moment(item).locale(lang).format('D MMMM')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs sx={{ p: '10px' }}>
          {sessions?.map(
            (i: any, k: any) =>
              moment(item).format('yyyy-MM-DD') ===
              moment(i.sessionDateStart).format('yyyy-MM-DD') && (
                <Grid
                  item
                  draggable="true"
                  xs
                  sx={{ my: 1 }}
                  key={i.sessionDateStart + k}
                >
                  {
                    i.isDirty ?
                      <Button
                        fullWidth
                        color="inherit"
                        sx={{ p: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          i.planRequestTypeId == 1
                        ? route.push(`planning/session/detail/${i.planRequestId}`)
                        : route.push(`planning/tracking/${i.planRequestId}`);
                        }}
                      >
                        <Grid
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 1.5,
                            alignItems: 'center',
                            ...(theme.direction === 'rtl'
                              ? { borderRight: '5px solid' }
                              : { borderLeft: '5px solid' }),

                            borderColor: getbordercolor(i.planTagId),
                            backgroundColor: getbgcolor(i.planTagId),
                            background: `repeating-linear-gradient(135deg, ${getbgcolor(i.planTagId)}, ${getbgcolor(i.planTagId)} 5px, transparent 5px, transparent 10px)`,
                            borderRadius: '12px',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'grey.800',
                            }}
                          >
                            {truncateToFourWords(i.planTitle)}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'grey.800',
                            }}
                          >
                            {!i.isAllDay && moment(i.sessionDateStart).format('MM:ss')}
                          </Typography>
                        </Grid>
                      </Button>
                      : 
                      <Button
                      fullWidth
                      color="inherit"
                      sx={{ p: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        i.planRequestTypeId == 1
                        ? route.push(`planning/session/detail/${i.planRequestId}`)
                        : route.push(`planning/tracking/${i.planRequestId}`);
                      }}
                    >
                      <Grid
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1.5,
                          alignItems: 'center',
                          ...(theme.direction === 'rtl'
                            ? { borderRight: '5px solid' }
                            : { borderLeft: '5px solid' }),

                          borderColor: getbordercolor(i.planTagId),
                          backgroundColor: getbgcolor(i.planTagId),
                          borderRadius: '12px',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'grey.800',
                          }}
                        >
                          {truncateToFourWords(i.planTitle)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'grey.800',
                          }}
                        >
                          {!i.isAllDay && moment(i.sessionDateStart).format('HH:mm')}
                        </Typography>
                      </Grid>
                    </Button>


                  }


                </Grid>
              ),
          )}
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Divider sx={{ width: '100%' }} />
      </Grid>
    </Grid>
  );
};
export default Day;
