'use client';
import {
  alpha,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import {
  useGetListPlansQuery,
  useGetListTagQuery,
} from '#/redux/services/user/planningApi';

import { useState, useEffect } from 'react';
import MonthsNavigation from '#/ui/main/planning/common/MonthsNavigation';
import WeeksNavigation from '#/ui/main/planning/common/weekView/WeeksNavigation';
import DaysOfWeek from '#/ui/main/planning/common/weekView/DaysOfWeek';

import AddPlanningModal from '#/ui/main/planning/common/AddPlanningModal';
import Header from '#/ui/main/planning/common/Header';

import FilterModal from '#/ui/main/planning/common/FilterModal';
import Day from '#/ui/main/planning/common/Day';
import moment from 'jalali-moment';

type viewType = 'week' | 'month';
const defaultView: viewType = localStorage.getItem('pmlm-calender-view') as
  | 'week'
  | 'month';

export default function Page() {
  const t = useTranslations();
  const theme = useTheme();
 
  const { lang } = useParams();
  const [openAddPlanningModal, setOpenAddPlanningModal] =
    useState<boolean>(false);
  const [view, setView] = useState<viewType>(defaultView || 'week');
  useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(moment().format());
  const [daysOfSelectedMonth, setDaysOfSelectedMonth] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<number[]>([]);

  const [openQnuickAddModal, setOpenQuickAddModal] = useState(false);

  const [selectedWeek, setSelectedWeek] = useState<string>(moment().format());
  const [daysOfSelectedWeek, setDaysOfSelectedWeek] = useState<string[]>([]);

  const {
    data: tagListData,
    isSuccess,
    isLoading,
  } = useGetListTagQuery({
    lang,
  });

  useEffect(() => {
    setSelectedTag(tagListData?.data.map((i) => i.planTagId) || []);
  }, [tagListData]);

  const changeView: (value: viewType) => void = (value) => {
    localStorage.setItem('pmlm-calender-view', value);
    setView(value);
  };

  const selectedMonthPlans = useGetListPlansQuery(
    {
      FromDate: daysOfSelectedMonth[0],
      ToDate: daysOfSelectedMonth.slice(-1)[0],
    },
    { skip: !(daysOfSelectedMonth.length !== 0 && view == 'month') },
  );

  const selectedWeekPlans = useGetListPlansQuery(
    {
      FromDate: daysOfSelectedWeek[0],
      ToDate: daysOfSelectedWeek.slice(-1)[0],
    },
    { skip:!(daysOfSelectedWeek.length !== 0 && view == 'week') },
  );
  useEffect(() => {
    setDaysOfSelectedWeek(() => {
      var index = 0;
      var days: string[] = [];
      while (
        moment(selectedWeek).startOf('week').format('w') ===
        moment(selectedWeek).startOf('week').add(index, 'day').format('w')
      ) {
        days.push(
          moment(selectedWeek)
            .locale(lang)
            .startOf('week')
            .add(index, 'day')
            .locale('en')
            .format(),
        );
        index += 1;
      }
      return days;
    });
  }, [selectedWeek]);

  useEffect(() => {
    setDaysOfSelectedMonth(() => {
      var index = 0;
      var days: string[] = [];
      while (
        moment(selectedMonth)
          .locale(lang)
          .startOf('month')
          .format('yyyy-MM') ===
        moment(selectedMonth)
          .locale(lang)
          .startOf('month')
          .add(index, 'day')
          .format('yyyy-MM')
      ) {
        days.push(
          moment(selectedMonth)
            .locale(lang)
            .startOf('month')
            .add(index, 'day')
            .locale('en')
            .format(),
        );
        index += 1;
      }
      return days;
    });
  }, [selectedMonth]);

  

  return (
    <Container maxWidth="md" sx={{ px: '0px' }}>
      <Header
        setSelectedMonth={view === 'month' ? setSelectedMonth : setSelectedWeek}
        setFilterModal={setFilterModal}
      />

      {view === 'month' && (
        <>
          <MonthsNavigation
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <Stack sx={{ bgcolor: 'background.paper' }}>
            {daysOfSelectedMonth.map((item, index) => (
              <Day
                setOpenQuickAddModal={setOpenQuickAddModal}
                item={item}
                key={index + selectedMonth}
                 
                sessions={selectedMonthPlans.data?.data.filter(
                  (i) => i.planTagId !=null ? selectedTag.includes(i.planTagId) || !i.isOwner : (i.planRequestTypeId || !i.isOwner),
                )}
              />
            ))}
          </Stack>
        </>
      )}

      {view === 'week' && (
        <>
          <WeeksNavigation
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />

          <Grid container columns={9} sx={{ bgcolor: 'background.paper' }}>
            <Grid container xs={1.5} sx={{ mt: '' }} item>
              <Grid
                item
                xs={12}
                sx={{
                  backdropFilter: `blur(${3}px)`,
                  WebkitBackdropFilter: `blur(${3}px)`,
                  zIndex: 3,
                  bgcolor: alpha(theme.palette.background.paper, 0.4),
                  pt: 1,
                  position: 'sticky',
                  top: 0,
                  color: 'background.default',
                  height: '50px',
                }}
              >
                *
              </Grid>
              {hoursOfDay.map((item) => (
                <Grid
                  item
                  key={item + '123'}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  xs={12}
                  sx={{
                    pt: 2,
                    zIndex: 2,
                    height: '50px',
                    border: item != '11' ? `0.1px solid ${alpha(theme.palette.text.primary, 0.07)}` : '',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ bgcolor: 'background.paper', mt: -2.2, px: 0.9 }}
                  >

                    {item != '11' ? item : ''}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {daysOfSelectedWeek.map((item, index) => (
              <Grid xs={1.12} item>

                <DaysOfWeek
                  item={item}
                  key={index}
                  setOpenQuickAddModal={setOpenQuickAddModal}
                  hoursOfDay={hoursOfDay}
                  selectedWeek={selectedWeek}
                  sessions={selectedWeekPlans.data?.data.filter(
                    (i) => i.planTagId !=null ? selectedTag.includes(i.planTagId) || !i.isOwner :( i.planRequestTypeId || !i.isOwner),
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <AddPlanningModal
        openModal={openAddPlanningModal}
        openQnuickAddModal={openQnuickAddModal}
        setOpenQuickAddModal={setOpenQuickAddModal}
        onClose={() => {
          setOpenAddPlanningModal(false);
        }}
      />
      <FilterModal
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tagListData={tagListData}
        openModal={filterModal}
        changeView={changeView}
        view={view}
        onClose={() => {
          setFilterModal(false);
        }}
      />
    </Container>
  );
}

const hoursOfDay = [
  '11',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
