import {
  alpha,
  Grid,
  Typography,
  useTheme,
  Button,

} from '@mui/material';
import React, { FC, Dispatch, SetStateAction, useEffect } from 'react';
import moment from 'jalali-moment';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { updateSelectedDate } from '#/redux/features/planningSlice';
import { GetListPlansData } from '#/redux/services/user/planningApi/planningApi';
import { useColorStyles } from '#/Hooks/useColorStyles';



type propsType = {
  sessions: any;
  hoursOfDay: string[];
  item: string;
  index?: number;
  selectedWeek: string;
  setOpenQuickAddModal: Dispatch<SetStateAction<boolean>>;
};

const DaysOfWeek: FC<propsType> = ({
  item,
  hoursOfDay,
  sessions,
  selectedWeek,
  setOpenQuickAddModal,
}) => {
  const { lang } = useParams();
  const route = useRouter();
  const dispatch = useAppDispatch();
 const { getbgcolor, getbordercolor } = useColorStyles()
  const selectedDate = useAppSelector((state: any) => state.planningSlice);

  const theme = useTheme();
  function truncateToFourWords(text: any) {
    const words = text.split(' ');
    if (words.length <= 2) {
      return text;
    }
    return words.slice(0, 2).join(' ') + '...';
  }

  useEffect(() => {
    dispatch(
      updateSelectedDate({
        date: '',
        start: '',
        end: '',
      }),
    );
  }, []);

  const isWeekend = () => {
    if (lang == 'fa') {
      return moment(item).isoWeekday() == 5;
    } else {
      return moment(item).isoWeekday() == 7;
    }
  };


  return (
    <>
      <Grid container sx={{}}>

        <Grid
          xs={12}
          item
          display="flex"
          direction="column"
          sx={{
            backdropFilter: `blur(${5}px)`,
            WebkitBackdropFilter: `blur(${5}px)`,
            zIndex: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            pt: 1,
            position: 'sticky',
            top: 0,
            height: '50px',
            color:
              moment(item).format('yyyy-MM-DD') === moment().format('yyyy-MM-DD')
                ? 'info.main'
                : isWeekend()
                  ? 'error.main'
                  : 'text.secondary',
          }}
        >
          <Typography textAlign="center" variant="caption">
            {moment(item).locale(lang).format('ddd')}
          </Typography>
          <Typography variant="caption" textAlign="center">
            {moment(item).locale(lang).format('D')}
          </Typography>
        </Grid>
      </Grid>



      <Grid container sx={{ mt: '' }}>
        {hoursOfDay.map((i, index) => (
          i == '11'
            ?

            //نمایش AllDay
            <Grid
              display="flex"
              key={i + selectedWeek}
              justifyContent="center"
              xs={12}
              onClick={() => {
                if (
                  (i.split(':00')[0] > moment().format('HH') &&
                    moment(item).format('DD') == moment().format('DD')) ||
                  moment(item).isAfter()
                ) {
                  selectedDate.startSelectedTime == i &&
                    selectedDate.selectedDate == moment(item).format()
                    ? setOpenQuickAddModal(true)
                    : dispatch(
                      updateSelectedDate({
                        date: moment(item).format(),
                        start: i,
                        end: hoursOfDay[index + 1],
                      }),
                    );
                }
              }}
              sx={{

                height: '50px',
                ...(i == selectedDate.startSelectedTime &&
                  moment(item).format('DD') ===
                  moment(selectedDate.selectedDate).format('DD') && {
                  border: `1.5px solid ${alpha(theme.palette.info.main, 0.67)}`,
                  borderRadius: '5px',
                }),
                ...(i.split(':00')[0] == moment().format('HH') &&
                  moment(item).format('DD') == moment().format('DD') && {
                  borderTop: `2px solid ${alpha(theme.palette.error.main, 0.87)}`,
                }),
              }}
            >

              {
                sessions?.map(
                  (j: any, index: any) =>
                    moment(item).format('DD') ===
                    moment(j.sessionDateStart).format('DD') && (
                      <Grid
                        key={j + index}
                        container
                        justifyContent={'center'}
                        ///  justifyContent={j.index % 2 == 0 ? 'flex-end' : 'flex-start'}
                        alignItems={'center'}
                      >

                        <Grid
                          item
                          draggable="true"
                          xs={12}
                          sx={{ my: 0, px: 0.2, top: '50%' }}
                        >

                          {j.isAllDay &&
                            (j.isDirty ?
                              <>

                                <Button
                                  fullWidth
                                  color="inherit"
                                  sx={{
                                    px: 0,
                                    py: 0,
                                    minWidth: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    j.planRequestTypeId == 1
                                      ? route.push(`planning/session/detail/${j.planRequestId}`)
                                      : route.push(`planning/tracking/${j.planRequestId}`);
                                  }}
                                >
                                  <Grid
                                    container
                                    display="flex"
                                    justifyContent="center"
                                    sx={{
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      px: 0.3,
                                      paddingBottom: 0.3,
                                      height: `30px`,
                                      borderRight: j.conflict < 3 ? '2px solid' : '5px solid',
                                      borderColor: getbordercolor(j.planTagId),

                                      background: `repeating-linear-gradient(135deg, ${getbgcolor(j.planTagId)}, ${getbgcolor(j.planTagId)} 2px, transparent 2px, transparent 5px)`,
                                      borderRadius: '12px',
                                    }}
                                  >
                                    {
                                      j.conflict < 2 && (
                                        <Typography
                                          textAlign="center"
                                          variant="body2"
                                          sx={{
                                            width: '100%',
                                            py: 1,
                                            wordWrap: 'break-word',
                                            color: 'text.primary',
                                          }}
                                        >
                                          {truncateToFourWords(j.planTitle)}
                                        </Typography>
                                      )
                                    }
                                  </Grid>
                                </Button>
                              </>
                              :
                              <>

                                <Button
                                  fullWidth// fullWidth={j.isAllday==true : j.index % 2 == 0? true :false : false}
                                  color="inherit"
                                  sx={{
                                    px: 0,
                                    py: 0,
                                    minWidth: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    j.planRequestTypeId == 1
                                      ? route.push(
                                        `planning/session/detail/${j.planRequestId}`,
                                      )
                                      : route.push(`planning/tracking/${j.planRequestId}`);
                                  }}
                                >
                                  <Grid
                                    container
                                    display="flex"
                                    justifyContent="center"
                                    sx={{
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      px: 0.3,
                                      paddingBottom: 0.3,
                                      height: `30px`,
                                      borderRight: j.conflict < 3 ? '2px solid' : '5px solid',
                                      borderColor: getbordercolor(j.planTagId),
                                      backgroundColor: getbgcolor(j.planTagId),
                                      borderRadius: '12px',
                                    }}
                                  >
                                    {j.conflict < 2 &&
                                      (<Typography
                                        textAlign="center"
                                        variant="body2"
                                        sx={{
                                          width: '100%',
                                          py: 1,
                                          wordWrap: 'break-word',
                                          color: 'text.primary',
                                        }}
                                      >
                                        {/* isAllDay */}

                                        {truncateToFourWords(j.planTitle)}
                                      </Typography>)}
                                  </Grid>
                                </Button>
                              </>)
                          }

                        </Grid >


                      </Grid >
                    ),
                )}
            </Grid >




            :
            <Grid
              display="flex"
              key={i + selectedWeek}
              justifyContent="center"
              xs={12}
              onClick={() => {
                if (
                  (i.split(':00')[0] > moment().format('HH') &&
                    moment(item).format('DD') == moment().format('DD')) ||
                  moment(item).isAfter()
                ) {
                  selectedDate.startSelectedTime == i &&
                    selectedDate.selectedDate == moment(item).format()
                    ? setOpenQuickAddModal(true)
                    : dispatch(
                      updateSelectedDate({
                        date: moment(item).format(),
                        start: i,
                        end: hoursOfDay[index + 1],
                      }),
                    );
                }
              }}
              sx={{

                height: '50px',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.05)}`,
                ...(i == selectedDate.startSelectedTime &&
                  moment(item).format('DD') ===
                  moment(selectedDate.selectedDate).format('DD') && {
                  border: `1.5px solid ${alpha(theme.palette.info.main, 0.67)}`,
                  borderRadius: '5px',
                }),
                ...(i.split(':00')[0] == moment().format('HH') &&
                  moment(item).format('DD') == moment().format('DD') && {
                  borderTop: `2px solid ${alpha(theme.palette.error.main, 0.87)}`,
                }),
              }}
            >
              {sessions?.map(
                (j: any, index: any) =>
                  i.split(':00')[0] == moment(j.sessionDateStart).format('HH') &&
                  moment(item).format('DD') ===
                  moment(j.sessionDateStart).format('DD') && (
                    <Grid
                      key={index + j}
                      container
                      justifyContent={'center'}
                      // justifyContent={j.index % 2 == 0 ? 'flex-end' : 'flex-start'}
                      alignItems={'center'}
                    >



                      <Grid
                        item
                        draggable="true"
                        xs={12}
                        sx={{ my: 0, px: 0.2, top: '50%' }}
                      >
                        {
                          !j.isAllDay && (
                            j.isDirty ?
                              <>

                                <Button
                                  fullWidth
                                  color="inherit"
                                  sx={{
                                    px: 0,
                                    py: 0,
                                    minWidth: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    j.planRequestTypeId == 1
                                      ? route.push(`planning/session/detail/${j.planRequestId}`)
                                      : route.push(`planning/tracking/${j.planRequestId}`);
                                  }}
                                >
                                  <Grid
                                    container
                                    display="flex"
                                    justifyContent="center"
                                    sx={{
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      px: 0.3,
                                      paddingBottom: 0.3,
                                      height: `${moment.utc(j.sessionDateEnd).diff(moment.utc(j.sessionDateStart), 'hours') === 0
                                        ? (1 / 2) * 50
                                        : moment.utc(j.sessionDateEnd).diff(moment.utc(j.sessionDateStart), 'hours') * 50
                                        }px`,
                                      borderTop: j.conflict < 3 ? '2px solid' : '5px solid',
                                      borderColor: getbordercolor(j.planTagId),
                                      background: `repeating-linear-gradient(135deg, ${getbgcolor(j.planTagId)}, ${getbgcolor(j.planTagId)} 5px, transparent 5px, transparent 10px)`,
                                      borderRadius: '12px',
                                    }}
                                  >
                                    {
                                      j.conflict < 2 &&
                                      (<Typography
                                        textAlign="center"
                                        variant="body2"
                                        sx={{
                                          width: '100%',
                                          py: 1,
                                          wordWrap: 'break-word',
                                          color: 'text.primary',
                                        }}
                                      >

                                        {truncateToFourWords(j.planTitle)}
                                      </Typography>)}
                                  </Grid>
                                </Button>

                              </>
                              :
                              <>
                                <Button
                                  fullWidth// fullWidth={j.isAllday==true : j.index % 2 == 0? true :false : false}
                                  color="inherit"
                                  sx={{
                                    px: 0,
                                    py: 0,
                                    minWidth: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    j.planRequestTypeId == 1
                                      ? route.push(
                                        `planning/session/detail/${j.planRequestId}`,
                                      )
                                      : route.push(`planning/tracking/${j.planRequestId}`);
                                  }}
                                >
                                  <Grid
                                    container
                                    display="flex"
                                    justifyContent="center"
                                    sx={{
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',

                                      px: 0.3,
                                      paddingBottom: 0.3,
                                      height: (`${moment
                                        .utc(j.sessionDateEnd)
                                        .diff(moment.utc(j.sessionDateStart), 'hours') ==
                                        0
                                        ? (1 / 2) * 50
                                        : moment
                                          .utc(j.sessionDateEnd)
                                          .diff(
                                            moment.utc(j.sessionDateStart),
                                            'hours',
                                          ) * 50
                                        }px`),

                                      borderTop: j.conflict < 3 ? '2px solid' : '5px solid',
                                      borderColor: getbordercolor(j.planTagId),
                                      backgroundColor: getbgcolor(j.planTagId),
                                      borderRadius: '12px',
                                    }}
                                  >
                                    {j.conflict < 2 &&
                                      (<Typography
                                        textAlign="center"
                                        variant="body2"
                                        sx={{
                                          width: '100%',
                                          py: 1,
                                          wordWrap: 'break-word',
                                          color: 'text.primary',
                                        }}
                                      >

                                        {truncateToFourWords(j.planTitle)}
                                      </Typography>)}
                                  </Grid>
                                </Button>
                              </>
                          )
                        }
                      </Grid>



                    </Grid>
                  ),
              )}
            </Grid>
        ))}



      </Grid >
    </>
  );
};
export default DaysOfWeek;
