'use client';
import { Grid, Modal, Typography, IconButton, Button } from '@mui/material';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import { useRouter, useParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import { OutLinedTextField } from '#/ui/component/InputComp';
import moment from 'jalali-moment';
import { LoadingButton } from '@mui/lab';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { updateSelectedDate } from '#/redux/features/planningSlice';

import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';
import { getListAttach } from '#/redux/features/planningSlice';

import {
  useFinalSubmitMutation,
  useInitialAddMutation,
} from '#/redux/services/user/planningApi';
const AddPlanningModal = ({
  openQnuickAddModal,
  setOpenQuickAddModal,
}: any) => {
  const dispatch = useAppDispatch();

  const [openAddPlanningModal, setOpenAddPlanningModal] =
    useState<boolean>(false);

  const [quickAddTitle, setQuickAddTitle] = useState<string>('');
  const selectedTime = useAppSelector((state: any) => state.planningSlice);
  const [error, setError] = useState('');
  const t = useTranslations();
  const router = useRouter();
  const { lang } = useParams();
  const [NewSession, { isLoading: NewSessionLoading }] = useInitialAddMutation(
    {},
  );
  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.length > 50) {
      setError(t('exceed_50_characters'));
    } else {
      setError('');
    }
    setQuickAddTitle(value);
  };
  const [finalSubmit, { isLoading: finalSubmitLoading }] =
    useFinalSubmitMutation({});

  const modalList = [
    {
      title: 'New_Session',
      icon: <PeopleOutlineIcon />,
      action: () => {
        setOpenQuickAddModal(true);
        setOpenAddPlanningModal(false);
      },
    },
    {
      title: 'Follow_Up',
      icon: <CallIcon />,
      action: () => router.push('/' + lang + `/planning/tracking/new/0`),
    },
  ];

  const onClose = () => {
    setOpenAddPlanningModal(false);
  };

  const converDateTimeFormat = (selectedDate: string, time: string): any => {
    const parsedDate = moment(selectedDate);
    const [Hour, Minute] = time?.split(':');
    parsedDate.set({ hour: parseInt(Hour), minute: parseInt(Minute) });
    return parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  };

  const newSession: (variant: 'QuickAdd' | 'Add') => void = (variant) => {
    const finalSubmitData = {
      description: '',
      sessionLink: '',
      location: '///',
      sessionTypeId: 1,
      sessionTagId: 1,
      listAttachment: [],

      isAllDay: selectedTime.startSelectedTime == '',
      startPlanDate: converDateTimeFormat(
        selectedTime.selectedDate || moment().format(),
        selectedTime.startSelectedTime || '00:00',
      ),
      endPlanDate: converDateTimeFormat(
        selectedTime.selectedDate || moment().format(),
        selectedTime.endSelectedTime || '23:00',
      ),
      title: quickAddTitle,
    };

    NewSession({ planRequestTypeId: 1 })
      .unwrap()
      .then((response: any) => {
        finalSubmit({ ...finalSubmitData, sessionId: response?.data?.result })
          .unwrap()
          .then((res: any) => {
            if (res?.data?.isError) {
              dispatch(setMessage(t(res?.message)));
            } else {
              dispatch(setAlert(t(res?.status)));
              dispatch(setSuccess(t(res?.data)));
              dispatch(setMessage(t(res?.message)));
              dispatch(
                updateSelectedDate({
                  date: '',
                  start: '',
                  end: '',
                }),
              );
              variant === 'Add'
                ? router.push(
                  `/${lang}/planning/session/${response?.data?.result}`,
                )
                : setOpenQuickAddModal(false);
              dispatch(getListAttach([]));
            }
          })
          .catch((error) => { });
      })
      .catch((error) => { });
  };

  return (
    <>
      <Grid
        sx={{ zIndex: 800, position: 'fixed', bottom: '36px', left: '24px' }}
      >
        <IconButton
          color="inherit"
          onClick={() => setOpenAddPlanningModal(true)}
          sx={{
            width: '56px',
            height: '56px',
            borderRadius: '999px',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Grid>
      <Modal open={openAddPlanningModal} onClose={onClose}>
        <Grid
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,0%)',
            borderRadius: '15px 15px 0 0',
            backgroundColor: 'background.paper',
            width: '100%',
            zIndex: 100,
            bottom: '0px',
          }}
        >
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pb: 2,
            }}
            alignItems="center"
          >
            <Grid
              xs={12}
              sx={{
                bgcolor: 'background.default',
                p: 0.35,
                my: 1.5,
                borderRadius: '5px',
                width: '80px',
              }}
            ></Grid>
            {modalList.map((listItem, index) => (
              <Button
                color="inherit"
                fullWidth
                key={index}
                onClick={listItem.action}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                  {listItem.icon}
                  <Typography sx={{ mx: 2 }} variant="body1">
                    {t(listItem.title)}
                  </Typography>
                </Grid>
              </Button>
            ))}
          </Grid>
        </Grid>
      </Modal>

      <Modal
        open={openQnuickAddModal}
        onClose={() => setOpenQuickAddModal(false)}
      >
        <Grid
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,0%)',
            borderRadius: '15px 15px 0 0',
            backgroundColor: 'background.paper',
            width: '100%',
            zIndex: 100,
            bottom: '0px',
          }}
        >
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pb: 2,
            }}
            alignItems="center"
          >
            <Grid
              xs={12}
              sx={{
                bgcolor: 'background.default',
                p: 0.35,
                my: 1.5,
                borderRadius: '5px',
                width: '80px',
              }}
            ></Grid>

            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 2.5, mb: 2 }}
            >
              <Typography>{t('New_Session')}</Typography>

              <IconButton
                color="inherit"
                onClick={() => setOpenQuickAddModal(false)}
              >
                <CloseIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </Grid>

            <Grid container sx={{ px: 2.5, mb: 2 }}>

              <OutLinedTextField
                value={quickAddTitle}
                onChange={handleChange}
                label={t('F_Filter_Key69')}
                error={!!error}
                helperText={error}
              />
            </Grid>

            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ px: 2.5, mb: 3 }}
            >
              {selectedTime.selectedDate
                ? moment(selectedTime.selectedDate)
                  .locale(lang)
                  .format('ddd DD MMMM yyyy')
                : moment().locale(lang).format('ddd DD MMMM yyyy')}{' '}
              . {selectedTime.startSelectedTime} -{' '}
              {selectedTime.endSelectedTime}
              <CreateOutlinedIcon sx={{ fontSize: '18px' }} />
            </Grid>

            <Grid container sx={{ px: 1.5, mb: 1 }}>
              <Grid xs={'auto'} item sx={{ px: 1.25 }}>
                <LoadingButton
                  variant="contained"
                  sx={{ minHeight: '40px' }}
                  onClick={() => newSession('QuickAdd')}
                  disabled={!quickAddTitle}
                  loading={finalSubmitLoading || NewSessionLoading}
                >
                  <Typography variant="body1">{t("Fast_save")}</Typography>
                </LoadingButton>
              </Grid>

              <Grid xs={true} item sx={{ px: 1.25 }}>
                <LoadingButton
                  fullWidth
                  variant="outlined"
                  sx={{ minHeight: '40px' }}
                  onClick={() => newSession('Add')}
                  disabled={!quickAddTitle}
                  loading={finalSubmitLoading || NewSessionLoading}
                >
                  <Typography variant="body1">{t("Add_other_information")}</Typography>
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
export default AddPlanningModal;
