import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  styled,
  alpha,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations } from 'next-intl';
import { sessionDetailDtoType } from '#/redux/services/user/planningApi/planningApi';
import TextFiledFileUpload from '#/ui/component/TextFiledFileUpload';
import Link from 'next/link';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { useAppSelector, useAppDispatch } from '#/redux/hooks';
import { useParams, useRouter } from 'next/navigation';
import { getListAttach } from '#/redux/features/planningSlice';
import AlertCancelModal from '../common/AlertCancelModal';
import { useColorStyles } from '#/Hooks/useColorStyles';

const Image = styled('img')({
  width: '20px',
  height: '20px',
  borderRadius: '100%',
});

type PropType = {
  setOpenLinkModal: Dispatch<SetStateAction<boolean>>;
  setSesstionLink: Dispatch<SetStateAction<string>>;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
  setgoogleUrl: Dispatch<SetStateAction<string>>;
  setTextAddress: Dispatch<SetStateAction<string>>;
  setShowFileUpload: Dispatch<SetStateAction<boolean>>;
  setFilterEditTag: Dispatch<SetStateAction<boolean>>;
  resetUploadFile: boolean;
  googleUrl: string;
  sessionLink: string;
  attachmentError:boolean;
  handlePreview: () => void;
  textAddress: string;
  showFileUpload: boolean;
  sessionDetailData?: sessionDetailDtoType;
  setfileName: any;
  mode?: boolean;
  TagId: number;
  cnt?: number
  TagTitle: string;
  atachFiles: any;
  listContributeModel: any;
  isOwner?: boolean
};

const SessionAttachments: React.FC<PropType> = ({
  setOpenLinkModal,
  setSesstionLink,
  setOpenAddModal,
  setgoogleUrl,
  setfileName,
  setTextAddress,
  setShowFileUpload,
  googleUrl,
  handlePreview,
  resetUploadFile,
  attachmentError,
  sessionLink,
  textAddress,
  isOwner,
  showFileUpload,
  sessionDetailData,
  setFilterEditTag,
  mode = false,
  TagId,
  TagTitle,
  cnt,
  atachFiles,
  listContributeModel,
}) => {
  const listAttach = useAppSelector((state) => state.planningSlice.listAttach);
  const { id, lang } = useParams();
  const router = useRouter();
  const t = useTranslations();
  const [deleteLinkModal, setDeleteLinkModal] = useState(false);
  const [deleteLocationModal, setDeleteLocationModal] = useState(false);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { getbgcolor } = useColorStyles();
  const [defaultAtach1, setDefaultAtach1] = useState<any>([]);


  useEffect(() => {
    atachFiles &&
      atachFiles[0] &&
      dispatch(
        getListAttach(
          atachFiles.map((j: any) => ({
            title: j.title,
            documnetAdress: j.documnetAdress,
          })),
        ),
      );
    atachFiles && atachFiles && setDefaultAtach1(atachFiles);
  }, [atachFiles]);

  const ItemsList = [
    {
      id: 'link',
      label: t('Add_session_link'),
      icon: 'icon-link',
      action: () => {
        setOpenLinkModal(true);
      },
      description: sessionLink,
      clearDescription: () => {

        setDeleteLinkModal(true)

      },
    },

    {
      id: 'location',
      label: t('Add_meeting_location'),
      icon: 'icon-typelocation-dot-light',
      action: () => {
        setOpenAddModal(true);
      },
      description: googleUrl,
      description2: textAddress,
      clearDescription: () => {
        setDeleteLocationModal(true)
        setDeleteLinkModal(true)
      },
    },
    {
      id: 'attachment',
      label: t('Add_attachment'),
      icon: 'icon-paperclip-vertical',
      action: () => {
        setShowFileUpload(!showFileUpload);
        // addFileInput();
      },
      description: sessionDetailData?.data?.attachmentList || '',
      clearDescription: () => { },
    },
    {
      id: 'members',
      label: t('Add_members'),
      icon: 'icon-users',
      action: () => {
        handlePreview()
        router.push(`/${lang}/planning/addMember/${id}`);
      },
      description: (
        <Grid sx={[theme.direction === 'rtl' ? { mr: 0 } : { ml: 0 }]}>
          <Grid container sx={{ width: '100%', justifyContent: 'start' }}>
            {listContributeModel?.map((j: any) => (
              <Grid item xs={'auto'} sx={{ py: 0.3, px: 0.3 }}>
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
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color={'grey.800'}
                    sx={{ mx: 1 }}
                  >
                    {j.customerName}
                  </Typography>
                  {sessionDetailData?.data?.isOwner &&
                    (<>
                      {'   '}
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        color={'grey.800'}
                        sx={{ color: theme.palette.grey[600], fontSize: '9px' }}
                      >
                        {j.semat_Desc}
                      </Typography>
                    </>)
                  }
                </Grid>
              </Grid>
            ))}
            {((cnt && cnt > 4)) ? (
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
                  <PersonIcon sx={{ fontSize: '20px', color: "grey", marginLeft: '3px' }} />
                  <Typography>

                    {` + ${' '} ${cnt && cnt - 4} ${t('another_person')} ${' '} `}
                  </Typography>
                </Grid>
              </Grid>)
              : <></>
            }
          </Grid>
        </Grid>
      ),
      clearDescription: () => { },
    },
    {
      id: 'sessions',
      label: t(TagTitle),
      icon: 'icon-typecircle-solid',
      action: () => {
        setFilterEditTag(true);
      },
      description: '',
      clearDescription: () => { },
    },
  ];

  return (
    <>
      <Grid
        item
        xs
        sx={{
          height: 'auto',
          backgroundColor: 'background.paper',
          overflowY: 'auto',
          mb: '15px',


          borderRadius: { xs: 0, md: '8px' },
        }}
      >
        {ItemsList.map((item, index) => (
          <Grid
            item
            xs
            sx={{
              borderBottom: '1px solid',
              borderColor: theme.palette.grey[200],
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <Grid
              container
              display="flex"
              sx={{
                paddingY: '6px',
                backgroundColor: 'background.paper',

                borderRadius: { xs: 0, md: '8px' },
              }}
            >
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
                xs={12}
              >
                <Button
                  fullWidth
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    py: 0,
                  }}
                  onClick={item.action}
                >
                  {item.id !== 'sessions' ? (
                    <PmlmIcon
                      src={item.icon}
                      color={theme.palette.info.main}
                      fontSize={'24px'}
                    />
                  ) : (
                    <PmlmIcon
                      src={'icon-typecircle-solid'}
                      color={getbgcolor(TagId)}
                      fontSize={'32px'}
                    />
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'grey.800',
                      p: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
                {[0, 1].includes(index) && item.description && (
                  <IconButton
                    disabled={!item.description}
                    sx={{ border: 0 }}
                    size="small"
                    onClick={item.clearDescription}
                  >
                    <PmlmIcon
                      src={'icon-x-mark'}
                      color={theme.palette.grey[800]}
                      fontSize={'24px'}
                    />
                  </IconButton>
                )}
              </Grid>
              {index == 2 &&
                (showFileUpload || (listAttach && listAttach?.length > 0)) && (
                <>
                <Grid item xs={12} mt={1} sx={{ py: 1, px: 2 }}>
                    {defaultAtach1.length < 3 &&
                      <TextFiledFileUpload
                        destination="Planning"
                        setFileGuId={setfileName}
                        label={t('H_Entekhab_File')}
                        resetInput={resetUploadFile}
                        multiple={true}
                      />
                      
                      }
                    {defaultAtach1.length <= 3 ? (
                      defaultAtach1.map((k: any) => (
                        <Grid
                          onClick={(e) => {
                            window.open(k.attachmentURL, '_blank');
                          }}
                          container
                          display="flex"
                          justifyContent="space-between"
                          sx={{
                            backgroundColor: 'background.default',
                            borderRadius: 2,
                            py: 1.5,
                            px: 1.5,
                            mb: 1.5,
                          }}
                        >

                          <Typography
                            variant="body1"
                            color={theme.palette.grey[800]}
                            sx={{ textAlign: 'left', mr: 'auto', px: 2 }}
                          >
                            {k.title}
                          </Typography>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(
                                getListAttach(
                                  defaultAtach1.filter(
                                    (j: any) => j.title !== k.title,
                                  ),
                                ),
                              );
                              setDefaultAtach1(
                                defaultAtach1.filter(
                                  (j: any) => j.title !== k.title,
                                ),
                              );
                            }}
                          >
                            <CloseIcon sx={{ fontSize: '15px' }} />
                          </IconButton>
                          
                        </Grid>
                      ))
                    ) : (
                      <></>
                    )}
                  </Grid>
                </>
                
                )}


              <Grid item xs={12}>
                {item.description && (
                  <Stack sx={{ px: 2 }}>
                    {item.description2 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'grey.700',
                          px: 2,
                          py: 1,
                        }}
                      >
                        {item.description2}
                      </Typography>
                    )}
                    <Link href={item.description}>
                      <Typography
                        variant="body1"
                        sx={{
                          display: 'block',
                          color: 'info.main',
                          px: 2,
                          mt: 1,
                          direction: 'ltr',
                          maxWidth: '100%',
                          overflow: 'visible',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          textDecoration: index !== 3 ? 'underline' : 'none',
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Link>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <AlertCancelModal
        openModal={deleteLinkModal}
        onClose={() => setDeleteLinkModal(false)}
        title={`${t('delete_link')}`}
        // content={t('exit_delete_link')}
        action={() => {

          setDeleteLinkModal(false)
          if (deleteLocationModal) {
            setDeleteLocationModal(false)
            setgoogleUrl('');
            setTextAddress('');
          } else {
            setSesstionLink('')
          }

        }}
      />



    </>
  );
};

export default SessionAttachments;
