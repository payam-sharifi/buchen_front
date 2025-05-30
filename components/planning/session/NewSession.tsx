'use client';
import {
  Box,
  Grid,
  LinearProgress,
  Switch,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import {
  setAlert,
  setError,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';
import React, { ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import FormInputText from '#/ui/component/FormTextFiled2';
import { LoadingButton } from '@mui/lab';
import { AddAddressModalInSession } from './AddAddressModalInSession';
import { AddLinkModal } from './AddLinkModal';
import { useParams, useRouter } from 'next/navigation';

import {
  useFinalSubmitMutation,
  useGetListTagQuery,
  useGetSessionDetailsQuery,
  useInitialAddMutation,
} from '#/redux/services/user/planningApi';
import moment from 'jalali-moment';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import SessionAttachments from './SessionAttachments';
import TimeStartAndEnd from './TimeStartAndEnd';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import FilterEditTag from '../common/FilterEditTag';
import { GetListTagType } from '#/redux/services/user/planningApi/planningApi';
import {
  getListAttach,
  getTagSession,
  getTagTitleSession,
} from '#/redux/features/planningSlice';
import { useColorStyles } from '#/Hooks/useColorStyles';

export type tagListItemsType = {
  tagId: number;
  id: number;
  title: string;
  icon: ReactNode;
  action: () => void;
};

export type finalSubmitFormType = {
  title: string;
  description: string;
  sessionDate: string;
  fromHours: any;
  toHours: any;
};

const NewSession = () => {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { lang, id } = useParams();
  const theme = useTheme();
  const { getbgcolor, getbordercolor } = useColorStyles();
  const idNumber = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);
  const shouldSkip = id === '0' || isNaN(idNumber);

  // to call api tag
  const { data: tagListData } = useGetListTagQuery({
    lang,
  });

  function ensureHttps(link:string) {
    if (!link.startsWith('https://')) {
        link = 'https://' + link;
    }
    return link;
}
  // list color session
  const modalListData: tagListItemsType[] = tagListData?.data
    ? tagListData?.data.map((item: GetListTagType) => ({
      title: item.nameTags,
      tagId: item.planTagId,
      id: item.id,
      icon: (
        <PmlmIcon
          src={'icon-typecircle-solid'}
          color={getbgcolor(item?.planTagId)}
          fontSize={'32px'}
        />
      ),
      action: () => { },
    }))
    : [];

  //calling Detail
  const {
    data: sessionDetailData,
    isLoading,
    isSuccess,
  } = useGetSessionDetailsQuery(
    { sessionId: idNumber }, // Pass the parameter object here
    { skip: shouldSkip },
  );

  const TagId = useAppSelector((state) => state.planningSlice.planTagId);
  const planId = useAppSelector((state) => state.planningSlice.planId);
  const TagTitle = useAppSelector((state) => state.planningSlice.planTagTitle);
  const selectedTime = useAppSelector((state: any) => state.planningSlice);

  const [sessionLink, setSesstionLink] = useState<string>(
    isSuccess ? sessionDetailData?.data?.sessionLink : '',
  );
  const [googleUrl, setgoogleUrl] = useState<string>(
    isSuccess ? sessionDetailData?.data?.location?.split('///')[0].trim() : '',
  );
  const [textAddress, setTextAddress] = useState<string>(
    isSuccess ? sessionDetailData?.data?.location?.split('///')[1].trim() : '',
  );

  const [filterEditTag, setFilterEditTag] = useState<boolean>(false);

  const [finalSubmit, { isLoading: finalSubmitLoading }] =
    useFinalSubmitMutation({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isShowConflict, setIsShowConflict] = useState<boolean>(false);
  const [resetUploadFile, setResetUploadFile] = useState<boolean>(false);
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const [fileNames, setfileName] = useState<any>([]);
  const [isPublish, setisPublish] = useState<boolean>(false)
  // const [fileNamesNew, setFileNameNew] = useState<any>([]);
  const listAttach = useAppSelector((state) => state.planningSlice.listAttach);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [openLinkModal, setOpenLinkModal] = useState<boolean>(false);
const [attachmentError,setAttachmentError]=useState<boolean>(false)
  // TimeChecked
  const [TimeChecked, setTimeChecked] = useState(
    !selectedTime.startSelectedTime,
  );

  const TimeHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeChecked(event.target.checked);
  };


  const methods = useForm<finalSubmitFormType | any>({
    // resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: isSuccess
        ? sessionDetailData?.data?.title && sessionDetailData?.data?.title
        : '',
      description: isSuccess
        ? sessionDetailData?.data?.description &&
        sessionDetailData?.data?.description
        : '',
      sessionDate: isSuccess
        ? moment(sessionDetailData?.data?.planDate).format('en')
        : moment(selectedTime.selectedDate).format('en'),
      fromHours: '00:00',
      toHours: '23:00',
    },
  });



  useEffect(() => {
    sessionDetailData?.data &&
      methods.setValue('title', sessionDetailData?.data?.title || '');
    sessionDetailData?.data &&
      setSesstionLink(sessionDetailData?.data?.sessionLink || '');

    sessionDetailData?.data &&
      methods.setValue(
        'description',
        sessionDetailData?.data?.description || '',
      );

    sessionDetailData?.data &&
      setgoogleUrl(
        sessionDetailData?.data?.location?.split('///')[0].trim() || '',
      );

    sessionDetailData?.data &&
      setTextAddress(
        sessionDetailData?.data?.location?.split('///')[1].trim() || '',
      );

    sessionDetailData?.data &&
      setfileName(sessionDetailData?.data?.attachmentList || '');
    sessionDetailData?.data &&
      setTimeChecked(!!sessionDetailData?.data?.isAllDay);

    sessionDetailData?.data &&
      dispatch(getTagSession(sessionDetailData?.data?.planTagId));

    sessionDetailData?.data &&
      dispatch(getTagTitleSession(sessionDetailData?.data?.nameTags));
  }, [
    sessionDetailData?.data?.title,
    sessionDetailData?.data?.startTime,
    sessionDetailData?.data?.endTime,
    sessionDetailData?.data?.sessionLink,
    sessionDetailData?.data?.description,
    sessionDetailData?.data?.planDate,
    sessionDetailData?.data?.location,
    sessionDetailData?.data?.attachmentList,
    sessionDetailData?.data?.isAllDay,
  ]);

  const ResetFormData = () => {
    methods.reset();
    setShowFileUpload(false);
    setSesstionLink('');
    setgoogleUrl('');
    setTextAddress('');
    // setFileNameNew([]);
  };

  const converDateTimeFormat = (selectedDate: string, time: string): any => {
    const parsedDate = moment(selectedDate);
    const [Hour, Minute] = time?.split(':');
    parsedDate.set({ hour: parseInt(Hour), minute: parseInt(Minute) });
    return parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  };


  const onSubmit = async (data: finalSubmitFormType) => {
    NextStep(data, id);
    // router.push(`/${lang}/planning`);
  };
  const NextStep = (data: any, sessionId: any) => {
  
    /// finalSubmitData
    const finalSubmitData = {
      // sessionId: Array.isArray(id) ? parseInt(id[0]) : parseInt(id),
      sessionId: parseInt(sessionId),
      title: data.title,
      description: data.description,
      sessionLink: ensureHttps(sessionLink),
      location: googleUrl + '///' + textAddress,
      startPlanDate: converDateTimeFormat(data.sessionDate, data.fromHours),
      endPlanDate: converDateTimeFormat(data.sessionDate, data.toHours),
      sessionTypeId: 1,
      isAllDay: TimeChecked,
      sessionTagId: TagId,
      isPublish,
      listAttachment: listAttach?.map((item: any) => ({
        title: item.title,
        documnetAdress: item.documnetAdress,
      })),
    };

    finalSubmit(finalSubmitData)
      .unwrap()
      .then((response: any) => {
        if (response?.data?.isError) {
          dispatch(setMessage(t(response?.message)));
        } else {
          dispatch(setAlert(t(response?.status)));
          dispatch(setSuccess(t(response?.data)));
          dispatch(setMessage(t(response?.message)));
          isPublish && router.push(`/${lang}/planning`);
          // router.push(`/${lang}/planning/addMember/${id}`)
        
          
        }
      })
      .catch((error) => { });
      dispatch(getListAttach([]));
  };


  return (
    <>
      {isLoading && <LinearProgress />}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
            position: 'relative',
            height: 'calc(100vh - 130px)',

            overflow: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Grid>
            <Grid
              container
              sx={{
                backgroundColor: 'background.paper',
                paddingX: '16px',
                paddingY: '12px',
                overflow: 'auto',
                gap: '12px',
                my: '15px',
                borderRadius: { xs: 0, md: '8px' },
                height: 'auto',
              }}
            >
              <FormInputText fullWidth name="title" label={t('F_Onvan')} />

              <FormInputText
                name="description"
                multiline
                minRows={5}
                label={t('F_Description')}
              />
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid display="flex" justifyContent="start" alignItems="center">
                  <PmlmIcon
                    src={'icon-clock---regular'}
                    color={theme.palette.grey[700]}
                    fontSize={'24px'}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={'500'}
                    color={theme.palette.grey[800]}
                    sx={[theme.direction === 'rtl' ? { mr: 0.5 } : { ml: 0.5 }]}
                  >
                    {t('all_day')}
                  </Typography>
                </Grid>
                <Switch
                  checked={TimeChecked}
                  onChange={TimeHandleChange}
                  sx={{
                    '&.MuiSwitch-root,& .MuiSwitch-root': {
                      height: '24px',
                      width: '44px',
                      borderRadius: '25px',
                      p: 0,
                    },
                    '& .MuiButtonBase-root.MuiSwitch-switchBase': { p: 0 },
                    '& .MuiSwitch-thumb': {
                      width: '22px',
                      height: '22px',
                      color: 'white',
                      boxShadow: 'none',
                      mt: '1px',
                    },
                  }}
                />
              </Grid>

              <TimeStartAndEnd
                isShowConflict={isShowConflict}
                TimeChecked={TimeChecked}
                methods={methods}
                sessionDetailData={sessionDetailData}
                setIsShowConflict={setIsShowConflict}
                converDateTimeFormat={converDateTimeFormat}
              />
            </Grid>

            <SessionAttachments
              setOpenLinkModal={setOpenLinkModal}
              setSesstionLink={setSesstionLink}
              setOpenAddModal={setOpenAddModal}
              setgoogleUrl={setgoogleUrl}
              setTextAddress={setTextAddress}
              setShowFileUpload={setShowFileUpload}
              setFilterEditTag={setFilterEditTag}
              cnt={sessionDetailData?.data.cnt}
              resetUploadFile={resetUploadFile}
              handlePreview={methods.handleSubmit(onSubmit)}
              googleUrl={googleUrl}
              sessionLink={sessionLink}
              attachmentError={attachmentError}
              isOwner={sessionDetailData?.data.isOwner}
              listContributeModel={sessionDetailData?.data.listContributeModel}
              textAddress={textAddress}
              showFileUpload={showFileUpload}
              sessionDetailData={sessionDetailData}
              setfileName={setfileName}
              TagId={TagId}
              TagTitle={TagTitle}
              atachFiles={sessionDetailData?.data?.attachmentListWithURL}
            />
          </Grid>

          <Box
            sx={{
              backgroundColor: 'background.paper',
              paddingX: '10px',
              paddingY: '12px',
              mb: '1px',
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '100%',
              borderRadius: '8px 8px 0 0',
              flexGrow: 1,
            }}
          >
            <LoadingButton
              loading={finalSubmitLoading}
              variant="contained"
              type="submit"
              onClick={() => {
                setisPublish(true)
                methods.handleSubmit(onSubmit)
              }
              }
              fullWidth
              sx={{
                p: 0.5,
                minHeight: 40,
                fontSize: '14px',
              }}
            >
              {t('S_Save')}
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
      <AddAddressModalInSession
        open={openAddModal}
        sendAddressData={(location, sessionLink) => {
          setTextAddress(sessionLink);
          setgoogleUrl(location);
        }}
        handleOpen={() => setOpenAddModal(!openAddModal)}
        customerAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <AddLinkModal
        openModal={openLinkModal}
        setAddress={setSesstionLink}
        onClose={() => {
          setOpenLinkModal(false);
        }}
      />
      {/*
      <AddColorModal
  openModal={setColorModal}
  setColor={setColor}
  onClose={() => {
    setColorModal(false);
  }}
      /> */}
      <FilterEditTag
        modalListData={modalListData}
        openModal={filterEditTag}
        onClose={() => {
          setFilterEditTag(false);
        }}
      />
    </>
  );
};
export default NewSession;
