'use client';
import {
  Button,
  FormHelperText,
  Grid,

  MenuItem,



  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useMemo, useState } from 'react';
import InvoiceSearchModal from '#/ui/main/planning/tracking/InvoiceSearchModal';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDatePicker from '#/ui/component/FormDatePicker2';

import FormInputText from '#/ui/component/FormTextFiled2';
import { OutLinedTextField } from '#/ui/component/InputComp';

import AlertCancelModal from '../common/AlertCancelModal';
import {
  useGetListConsumerForTrackingQuery,
  useGetProductsOfInvoiceQuery,
  useGetTrackingDetailForEditQuery,
  useSearchInvoiceQuery,
  useTrackingFinalSubmitMutation,
} from '#/redux/services/user/planningApi';
import FormSelect from '#/ui/component/FormSelect2';
import {
  getProductOfInvoice,
  GetSearchInvoice,
} from '#/redux/services/user/planningApi/planningApi';
import { useAppDispatch } from '#/redux/hooks';
import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';
export default function NewFollowUp() {
  const theme = useTheme();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { lang, id } = useParams();
  const router = useRouter();
  const [openCancelFollowUp, setOpenCancelFollowUp] = useState(false);
  const [today, setIstoday] = useState<boolean>(false)
  // type follow up
  const TypeFollowUpList = [
    { value: '1', text: t('Tracking_consumption') },
    { value: '2', text: t('Pursuing_quality') },
  ];
  const [typeFollowUp, setTypeFollowUp] = useState('1');

  const handleChangeTypeFollowUp = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTypeFollowUp((event.target as HTMLInputElement).value);
  };
  // factor
  const [openSearchFactorModal, setOpenSearchFactorModal] = useState(false);
  const [ValFactorModal, setValFactorModal] = useState<GetSearchInvoice>({
    idOrder: '',
    shomareSefaresh: 0,
  });
  const [ValProduct, setValProduct] = useState<string>('');
  // product
  // checked time
  const [TimeChecked, setTimeChecked] = useState(true);

  const [error, setError] = useState(false);

  const { data: consumerListData } = useGetListConsumerForTrackingQuery({
    lang,
  });

  // if (id != '0') {
  //   const { data: editData } = useGetTrackingDetailForEditQuery({
  //     TrackingId: Number(id),
  //   });
  // }
  // trackingDateTime



  const [finalSubmit, { isLoading: finalLoading }] =
    useTrackingFinalSubmitMutation();
  const shouldDisableDateBeforeToday = (date: Date) => {
    const initialTime = new Date();
    const today = new Date(initialTime.getTime() - 24 * 60 * 60 * 1000);
    return date <= today;
  };
  const schema = useMemo(
    () =>
      yup.object().shape({
        trackingDateTime: yup.string().required(t('F_PorkardanElzamiAst')),
        trackingTypeId: yup.number().required(t('F_PorkardanElzamiAst')),
        consumerId: yup.string().required(t('F_PorkardanElzamiAst')),
        time: yup.string(),
        isAllDay: yup.boolean().required(t('F_PorkardanElzamiAst')),
        description: yup
          .string()
          .min(1, t('F_Between_1_300'))
          .max(300, t('F_Between_1_300')),
      }),
    [t],
  );
  const timeSchedule = (startTime: string) => {
    const times = [];
    let [startHour, startMinute] = startTime.split(':').map(Number);


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

    return times;
  };
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      trackingTypeId: 1,
      trackingDateTime: new Date().toDateString(),
      consumerId: '',
      time: '',
      description: '',
      isAllDay: TimeChecked,
    },
    // reValidateMode: 'onSubmit',
  });
  const isDateToday = (date: any) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    return now.getTime() === inputDate.getTime();
  };
  const watchConsumerIdByFullName = methods.watch('consumerId');
  const watchsessionDateForGetConflictInTimeSession = methods.watch('trackingDateTime');
  const selectedTime = methods.watch('time');
  useEffect(() => {
    if (watchsessionDateForGetConflictInTimeSession)
      setIstoday(isDateToday(watchsessionDateForGetConflictInTimeSession))

  }, [watchsessionDateForGetConflictInTimeSession])

  const {
    data: InvoiceListData,
    isLoading,
    isSuccess,
    refetch,
  } = useSearchInvoiceQuery(
    {
      ConsumerId: watchConsumerIdByFullName,
    },
    { skip: !watchConsumerIdByFullName },
  );

  const { data: GetProdustOfInvoice } = useGetProductsOfInvoiceQuery(
    {
      InvoiceId: ValFactorModal?.idOrder,
      ConsumerId: watchConsumerIdByFullName,
    },
    { skip: !ValFactorModal?.idOrder },
  );
  const resetForm = () => {
    methods.reset();
    setValFactorModal({
      idOrder: '',
      shomareSefaresh: 0,
    });
    setValProduct('');
  };
  const getCurrentTimePlus30 = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const onSubmit = (data: any) => {

    if (ValFactorModal?.idOrder == "" || ValProduct == "" || (!selectedTime && !TimeChecked)) {
      setError(true);
    } else {
      const finalSubmitData = {
        trackingTypeId: parseInt(typeFollowUp),
        consumerId: data?.consumerId,
        invoiceId: ValFactorModal?.idOrder,
        productId: ValProduct,
        trackingDateTime:
          data?.time !== ''
            ? convertDate(data?.trackingDateTime) + ' ' + data?.time + ':00'
            : convertDate(data?.trackingDateTime),
        description: data.description,
        isAllDay: data?.time == '' ? true : false,
      };
      finalSubmit(finalSubmitData)
        .unwrap()
        .then((response: any) => {
          dispatch(setAlert(t(response?.status)));
          dispatch(setSuccess(t(response?.data)));
          dispatch(setMessage(t(response?.message)));
          setError(false);
          resetForm();
        })
        .catch((error) => { });
    }
  };

  const convertDate = (dateStr: any) => {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
          }}
          noValidate
        >
          <Grid
            container
            display="flex"
            maxWidth="md"
            sx={{
              mt: 2,
              bgcolor: 'background.paper',
              px: 1.5,
              py: 2,
              borderRadius: { xs: 0, md: '8px' },
            }}
          >
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  value={typeFollowUp}
                  name="radio-buttons-group"
                  onChange={handleChangeTypeFollowUp}
                >
                  {TypeFollowUpList.map((item: any, index: number) => (
                    <>
                      <FormControlLabel
                        sx={[
                          {
                            '&.MuiFormControlLabel-root': {
                              m: 0,
                              color: theme.palette.grey[800],
                            },
                            '& .MuiButtonBase-root.MuiRadio-root': {
                              padding: 0,
                            },
                          },
                          theme.direction === 'rtl'
                            ? {
                              '&.MuiFormControlLabel-root': { ml: 2 },
                              '& .MuiButtonBase-root.MuiRadio-root': {
                                ml: 1,
                              },
                            }
                            : {
                              '&.MuiFormControlLabel-root': { mr: 2 },
                              '& .MuiButtonBase-root.MuiRadio-root': {
                                mr: 1,
                              },
                            },
                        ]}
                        key={index}
                        value={item.value}
                        control={<Radio />}
                        label={item.text}
                      />
                    </>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} mt={2}>
              <FormSelect
                required={true}
                name={'consumerId'}
                options={consumerListData?.data.map((e) => ({
                  value: e.consumerId,
                  title: e.firstName + ' ' + e.lastName,
                }))}
                label={t('H_MasrafKonande')}
              />




            </Grid>

            <Grid item xs={12} mt={1.5}>
              <Grid
                sx={{
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <TextField
                  size={'small'}
                  label={t('invoice_search')}
                  fullWidth
                  required
                  name={'ValFactorModal'}
                  sx={{
                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                      color: theme.palette.grey[600],
                    },
                    '& .MuiOutlinedInput-notchedOutline ': {
                      borderColor: theme.palette.grey[200],
                    },
                    '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled':
                    {
                      WebkitTextFillColor: theme.palette.grey[800],
                    },
                  }}
                  value={
                    ValFactorModal?.idOrder !== ''
                      ? `${t('H_Shomare_Factor')}-${ValFactorModal?.idOrder}`
                      : ``
                  }
                  placeholder={t('invoice_search')}
                  id="component-helper"
                />
                <Button

                  onClick={() => {
                    if (ValFactorModal?.idOrder === '') {
                      setOpenSearchFactorModal(true)
                    } else {
                      setValFactorModal({
                        idOrder: '',
                        shomareSefaresh: 0,
                      });
                      setValProduct('')
                    }

                  }
                  }
                  sx={[
                    theme.direction === 'rtl'
                      ? { left: '10px' }
                      : { right: '10px' },
                    {
                      position: 'absolute',
                      width: '30px',
                      minWidth: 'auto',
                    },
                  ]}
                >
                  <PmlmIcon
                    src={
                      ValFactorModal?.idOrder != ''
                        ? 'icon-x-mark'
                        : 'icon-typemagnifying-glass'
                    }
                    fontSize={'25px'}
                    color={theme.palette.grey[800]}
                  />
                </Button>
              </Grid>
              {error && ValFactorModal?.idOrder == "" && (
                <FormHelperText
                  id="component-helper-text"
                  sx={{ color: 'error.main' }}
                >
                  {t('F_PorkardanElzamiAst')}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} mt={1.5}>
              <FormControl

                fullWidth
                sx={{
                  '& .MuiFormLabel-root.MuiInputLabel-root': {
                    color: theme.palette.grey[600],
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.grey[200],
                  },
                }}
              >
                <OutLinedTextField
                  select
                  required
                  id="demo-simple-select"
                  value={ValProduct}
                  label={t('product')}
                  onChange={(e) => setValProduct(e.target.value)}
                >
                  {ValFactorModal?.idOrder !== '' &&
                    GetProdustOfInvoice?.data?.map(
                      (item: getProductOfInvoice) => (
                        <MenuItem value={item.product_ID}>
                          {item.kala_FarsiDesc}
                        </MenuItem>
                      ),
                    )}
                </OutLinedTextField>
              </FormControl>
              {error && ValProduct == "" && (
                <FormHelperText
                  id="component-helper-text"
                  sx={{ color: 'error.main' }}
                >
                  {t('F_PorkardanElzamiAst')}
                </FormHelperText>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              mt={2.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid display="flex" justifyContent="start" alignItems="center">
                <PmlmIcon
                  src={'icon-clock---regular'}
                  color={theme.palette.grey[400]}
                  fontSize={'25px'}
                />
                <Typography
                  variant="body1"
                  fontWeight={'500'}
                  color={theme.palette.grey[800]}
                >
                  {t('all_day')}
                </Typography>
              </Grid>
              <Switch
                checked={TimeChecked}
                onChange={() => setTimeChecked(!TimeChecked)}
                sx={{
                  '&.MuiSwitch-root,& .MuiSwitch-root': {
                    height: '20px',
                    width: '40px',
                    borderRadius: '25px',
                    p: 0,
                  },
                  '& .MuiButtonBase-root.MuiSwitch-switchBase': { p: 0 },
                  '& .MuiSwitch-thumb': { width: '20px', height: '20px' },
                }}
              />
            </Grid>

            {!TimeChecked && (
              <>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <FormSelect
                    required={true}
                    name={'time'}
                    options={today ? timeSchedule(getCurrentTimePlus30()) : timeSchedule("00:-30")}

                    label={t('F_time')}
                  />
                </Grid>
                {error && !selectedTime && (
                  <FormHelperText
                    id="component-helper-text"
                    sx={{ color: 'error.main' }}
                  >
                    {t('F_PorkardanElzamiAst')}
                  </FormHelperText>
                )}
              </>
            )}
            <Grid item xs={12} mt={3}>
              <FormDatePicker
                name={'trackingDateTime'}
                label={t('S_Date')}
                required
                shouldDisableDate={shouldDisableDateBeforeToday}
              />
            </Grid>
            <Grid item xs={12} mt={2.5}>
              <Typography
                variant="body1"
                fontWeight={'500'}
                color={theme.palette.grey[800]}
                mb={1.5}
              >
                {t('F_Description')}
              </Typography>
              <FormInputText
                name={'description'}
                placeholder={t('F_TozihatVaredKonid')}
                multiline
                rows={3}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} mt={2.5}>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                // disabled={ValProduct==="" || ValFactorModal.idOrder===""}
                loading={finalLoading}
                sx={{
                  p: 0.5,
                  minHeight: 40,
                  fontSize: '14px',
                }}
              >
                {t('S_Save')}
              </LoadingButton>
              <Button
                fullWidth
                sx={{
                  mt: 2,
                  p: 0.5,
                  minHeight: 40,
                  fontSize: '14px',
                  color: theme.palette.grey[600],
                }}
                onClick={() => setOpenCancelFollowUp(true)}
              >
                {t('S_Cancel')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>{' '}
      <InvoiceSearchModal
        InvoiceListData={InvoiceListData}
        openModal={openSearchFactorModal}
        onClose={() => setOpenSearchFactorModal(false)}
        setValFactorModal={setValFactorModal}
      />
      <AlertCancelModal
        openModal={openCancelFollowUp}
        onClose={() => setOpenCancelFollowUp(false)}
        action={() => router.push(`/${lang}/planning`)}
        content={t('exit_without_saving?')}
        title={t('Unsaved_changes')}
      />
    </>
  );
}
