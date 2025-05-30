'use client';
import {
  Button,
  Container,
  Grid,
  IconButton,
  useTheme,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { useEffect, useState } from 'react';
import DetailOfSession from '#/ui/main/planning/session/detailOfSession';
import {
  useDeleteDraftMutation,
  useGetSessionDetailsQuery,
} from '#/redux/services/user/planningApi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'jalali-moment';
import CancelSesionModal from '#/ui/main/planning/common/CancelSesionModal';

export default function Page() {

  const [checkMemberSession, setcheckMemberSession] = useState(false);
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { lang, id } = useParams();
  const [deleteDraftSession, loading] = useDeleteDraftMutation({});
  const pathname = usePathname();

  const idNumber = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);

  //calling Detail
  const {
    data: sessionDetailData,
    isLoading,
    isSuccess,
  } = useGetSessionDetailsQuery({ sessionId: idNumber });
  ///
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDelModal, setOpenDelModal] = useState(false);
  ///
  useEffect(() => {
    setcheckMemberSession(pathname.includes('membersession'));
  }, [pathname]);

  const DeleteHandle = () => {
    deleteDraftSession({ sessionId: idNumber })
      .unwrap()
      .then(() => {
        setOpenDelModal(false);
        router.push('/' + lang + '/planning');
      })
      .catch(() => { });
  };






  return (
    <Container maxWidth="md" sx={{ px: '0px' }}>
      {/* Header */}
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: '100%',
            ...(theme.direction === 'rtl'
              ? { p: 1.8, pr: 0 }
              : { p: 1.8, pl: 0 }),
          }}
        >
          <IconButton
            sx={[
              { p: 0 },
              theme.direction === 'rtl'
                ? { mr: 2, ml: 1.5 }
                : { ml: 2, mr: 1.5 },
            ]}
            onClick={() => {
              router.push(`/${lang}/planning`);
            }}
          >
            <PmlmIcon
              src={
                theme.direction === 'rtl'
                  ? 'icon-typeChevrone-right-solid'
                  : 'icon-typeChevron-left'
              }
              color={theme.palette.grey[800]}
            />
          </IconButton>
          {((sessionDetailData?.data?.isOwner &&
            (sessionDetailData?.data?.sessionDateStart != null ?
              !moment(sessionDetailData?.data?.sessionDateStart, 'YYYY-MM-DD HH:mm:ss.S').isBefore(moment())
              : !moment(sessionDetailData?.data?.planDate, 'YYYY-MM-DD').add(1, 'days').isBefore(moment())))
            &&
            <Grid>
              <Button
                onClick={() =>
                  router.push('/' + lang + '/planning/session/' + id)
                }
                sx={{ p: 0, minWidth: 'auto' }}
              >
                <PmlmIcon
                  src={'icon-typepen-regular'}
                  color={theme.palette.grey[800]}
                />
              </Button>{' '}
              <IconButton
                aria-label="more"

                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <PmlmIcon

                  src={'icon-ellipsis-vertical'}
                  color={theme.palette.grey[800]}
                />
              </IconButton>{' '}
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ p: 0, minWidth: 'auto' }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();

                    setOpenDelModal(true);
                  }}
                >
                  <Typography variant="body2">{t('Cancel_session')}</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          )}

        </Grid>
      </Grid>
      <CancelSesionModal
        openModal={openDelModal}
        onClose={() => setOpenDelModal(false)}
        title={[t('Cancel_session')]}
        content={t('By_canceling')}
        action={() => {
          DeleteHandle();
        }}
      />
      {/* Description and Edit Of Sesstion */}
      {sessionDetailData?.data && (
        <DetailOfSession
          sessionDetailData={sessionDetailData}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      )}
      {/* <NewSession mode={false} checkMemberSession={checkMemberSession}/> */}
    </Container>
  );
}
