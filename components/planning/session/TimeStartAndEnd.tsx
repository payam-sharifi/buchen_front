import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';

import { useTranslations } from 'next-intl';
import FormDatePicker from '#/ui/component/FormDatePicker2';
import FormSelect from '#/ui/component/FormSelect2';
import Image from 'next/image';
import infoWarning from 'public/images/infoWarning.png';
import { useAppSelector } from '#/redux/hooks';

import {
  DetectConfilictParamsType,
  sessionDetailDtoType,
} from '#/redux/services/user/planningApi/planningApi';
import { useDetectConfilictMutation } from '#/redux/services/user/planningApi';
import { dateString2Date } from '#/helper';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import moment from 'jalali-moment';
import { useParams } from 'next/navigation';

type PropType = {
  isShowConflict?: boolean;
  TimeChecked?: boolean;
  methods: any;
  sessionDetailData?: sessionDetailDtoType;
  setIsShowConflict: Dispatch<SetStateAction<boolean>>;
  converDateTimeFormat: (selectedDate: string, time: string) => any;
};
const date = new Date();
const TimeStartAndEnd: React.FC<PropType> = ({
  isShowConflict = false,
  TimeChecked,
  methods,
  converDateTimeFormat,
  setIsShowConflict,
  sessionDetailData,
}) => {
  const [isConflict] = useDetectConfilictMutation({});
  const t = useTranslations();
  const theme = useTheme();
  const [today,setIstoday]=useState<boolean>(false)
  const selectedTime = useAppSelector((state: any) => state.planningSlice);
const {lang}=useParams()
  const shouldDisableDateBeforeToday = (date: Date) => {
    const initialTime = new Date();
    const today = new Date(initialTime.getTime() - 24 * 60 * 60 * 1000);
    return date <= today;
  };

  const getCurrentTimePlus30 = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const isDateToday = (date:any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    return now.getTime() === inputDate.getTime();
  };
  const timeSchedule = (startTime: string) => {
    const times = [];
    let [startHour, startMinute] = startTime.split(':').map(Number);

    startMinute += 30;
    if (startMinute >= 60) {
      startMinute = 0;
      startHour += 1;
      if (startHour >= 24) {
        startHour = 0;
      }
    }

    for (let hour = startHour; hour < 24; hour++) {
      for (
        let minute = hour === startHour ? startMinute : 0;
        minute < 60;
        minute += 30
      ) {
        const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push({ title: formattedTime, value: formattedTime });
      }
    }
    // console.log(times);
    return times;
  };

  const watchtoHoursForGetConflictInTimeSession = methods.watch('toHours');
  const watchfromHoursForGetConflictInTimeSession = methods.watch('fromHours');
  const watchsessionDateForGetConflictInTimeSession =
    methods.watch('sessionDate');

useEffect(()=>{
  if(watchsessionDateForGetConflictInTimeSession)
    setIstoday(isDateToday(watchsessionDateForGetConflictInTimeSession))

},[watchsessionDateForGetConflictInTimeSession])


  useEffect(() => {
    methods.setValue(
      'fromHours',
      sessionDetailData?.data?.startTime != null
        ? sessionDetailData?.data?.startTime.replace(/:\d{2}$/, '')
        : selectedTime.startSelectedTime,
    );
    methods.setValue(
      'toHours',
      sessionDetailData?.data?.endTime != null
        ? sessionDetailData?.data?.endTime.replace(/:\d{2}$/, '')
        : selectedTime.endSelectedTime,
    );
    
    methods.setValue(
      'sessionDate',
      sessionDetailData?.data?.planDate != null
        ? moment(sessionDetailData?.data?.planDate , 'YYYY-MM-DD').format(
            'YYYY/MM/DD',
          )
        : selectedTime.selectedDate || date.toString(),
    );
  }, [
    sessionDetailData,
    sessionDetailData?.data?.planDate,
    sessionDetailData?.data?.endTime,
    sessionDetailData?.data?.startTime,
  ]);

  useEffect(() => {
    const planDateStart = converDateTimeFormat(
      methods.getValues('sessionDate'),
      methods.getValues('fromHours'),
    );
    const planDateEnd = converDateTimeFormat(
      methods.getValues('sessionDate'),
      methods.getValues('toHours'),
    );

    (watchtoHoursForGetConflictInTimeSession ||
      watchfromHoursForGetConflictInTimeSession ||
      watchsessionDateForGetConflictInTimeSession) &&
      getConflictSessionTime({ planDateStart, planDateEnd });
  }, [
    watchtoHoursForGetConflictInTimeSession,
    watchfromHoursForGetConflictInTimeSession,
    watchsessionDateForGetConflictInTimeSession,
  ]);
  const getConflictSessionTime = (timeTable: DetectConfilictParamsType) => {
    isConflict(timeTable)
      .unwrap()
      .then((response: any) => {
        setIsShowConflict(response.data.result);
      })
      .catch((error) => {});
  };
  return (
    <>
      {!TimeChecked && (
        <>
          {' '}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <FormSelect
              defaultValue={selectedTime.startSelectedTime}
              required={true}
              name={'fromHours'}
               options={today ? timeSchedule(getCurrentTimePlus30()): timeSchedule("00:-30")}
              label={t('Start_Time')}
            />
            <FormSelect
              defaultValue={selectedTime.endSelectedTime}
              required={true}
              name={'toHours'}
              options={timeSchedule(methods.getValues('fromHours'))}
              label={t('End_Time')}
            />
          </Grid>
          {isShowConflict && (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',

                bgcolor: 'warning.light',
                py: 1,
                px: 1,
                borderRadius: '8px',
              }}
            >
              <PmlmIcon
                src={'icon-typedanger-solid'}
                color={theme.palette.warning.main}
              />
              <Typography variant="caption" sx={{ mx: 0.5 }}>
                {t('Conflict_Session')}
              </Typography>
            </Grid>
          )}
        </>
      )}
      <Grid xs={12} mt={1.5}>
        <FormDatePicker
          default={selectedTime.selectedDate || null}
          name={'sessionDate'}
          label={t('S_Date')}
          required
          shouldDisableDate={shouldDisableDateBeforeToday}
        />
      </Grid>
    </>
  );
};

export default TimeStartAndEnd;
