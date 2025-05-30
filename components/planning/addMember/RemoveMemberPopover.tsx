import React, { useState, FC, ReactNode } from 'react';

import {
  Popover,
  Typography,
  IconButton,
  Box,
  Stack,
  Button,
  Modal,
  useTheme,
  Grid,
  styled,
} from '@mui/material';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import {
  useRemoveAllAttendeesFromSessionMutation,
  useGetListAttendeesRankQuery,
  useRemoveAllAttendeesFromSessionByRankIdMutation,
} from '#/redux/services/user/planningApi';

import SafeDeleteModal from '#/ui/component/SafeDeleteModal';

import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { LoadingButton } from '@mui/lab';

import { useAppDispatch } from '#/redux/hooks';

import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';

const RankImage = styled('img')({
  width: '40px',
});

const ActionsPopover: FC = () => {
  const t = useTranslations();
  const { lang, id: sessionId } = useParams();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openRankModal, setOpenRankModal] = useState(false);

  const [openRemoveAll, setOpenRemoveAll] = useState(false);

  const [removeAll, { isLoading }] = useRemoveAllAttendeesFromSessionMutation(
    {},
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <IconButton aria-describedby={id} color="inherit" onClick={handleClick}>
        <PmlmIcon src="icon-ellipsis-vertical" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          sx={{
            width: '150px',
            display: 'flex',
            p: 1,
          }}
        >
          <LoadingButton
            fullWidth
            color="inherit"
            onClick={() => {
              setOpenRemoveAll(!openRemoveAll);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Typography variant="body1">{t('F_Cart_DeleteAll')}</Typography>
          </LoadingButton>

          <Button
            fullWidth
            color="inherit"
            onClick={() => {
              setOpenRankModal(!openRankModal);
              handleClose();
            }}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Typography variant="body1">{t('Delete_list')}</Typography>
          </Button>
        </Stack>
      </Popover>

      <SafeDeleteModal
        message={`${t('H_Aya_Az_Hazf')} ${t('H_Motmaenid')}`}
        open={openRemoveAll}
        onCancel={() => {
          setOpenRemoveAll(!openRemoveAll);
        }}
        onAccept={() => {
          removeAll({ sessionId: Number(sessionId) })
            .unwrap()
            .then((res) => {
              dispatch(setAlert(res?.status));
              dispatch(setSuccess(res?.status));
              dispatch(setMessage(t('S_SuccessOperation')));
              setOpenRemoveAll(!openRemoveAll);
              handleClose();
            })
            .catch(() => {});
        }}
        isLoading={isLoading}
      />

      <RemoveByRankModal
        openModal={openRankModal}
        onClose={() => setOpenRankModal(!openRankModal)}
      />
    </Box>
  );
};

const RemoveByRankModal = ({ openModal, onClose }: any) => {
  const [noticeModal, setNoticeModal] = useState(false);
  const [selectedRank, setSelectedRank] = useState({
    img: '',
    id: 0,
    name: '',
  });

  const t = useTranslations();

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { lang, id } = useParams();

  const { data: rankData } = useGetListAttendeesRankQuery({
    SessionId: id as string,
  });

  const [remove, { isLoading }] =
    useRemoveAllAttendeesFromSessionByRankIdMutation({});

  return (
    <>
      <Modal open={openModal} onClose={onClose}>
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
            {rankData?.data.map((item, index) => (
              <Button
                color="inherit"
                fullWidth
                key={index}
                // onClick={listItem.action}
                sx={{
                  p: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ bgcolor: 'background.paper', p: 0.5, mb: 0.2 }}
                >
                  <Grid display="flex" alignItems="center">
                    <RankImage
                      sx={{ mx: 1 }}
                      src={`https://cdn.pmlm.ir/assets/img/rank-logo/${item.idSemat}.png`}
                    />

                    <Stack sx={{ px: 1 }}>
                      <Typography variant="caption">
                        {t(item.semat_Desc)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid sx={{ px: 1.5 }}>
                    <IconButton
                      onClick={() => {
                        setSelectedRank({
                          img: '',
                          id: item.idSemat,
                          name: item.semat_Desc,
                        });
                        setNoticeModal(!noticeModal);
                        onClose();
                      }}
                    >
                      <PmlmIcon src="icon-typetrash-can-solid" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Button>
            ))}
          </Grid>
        </Grid>
      </Modal>

      <SafeDeleteModal
        message={`${t('H_Aya_Az_Hazf')} ${selectedRank.name} ${t('H_Motmaenid')}`}
        open={noticeModal}
        onCancel={() => setNoticeModal(!noticeModal)}
        onAccept={() => {
          remove({ sessionId: Number(id), rankId: selectedRank.id })
            .unwrap()
            .then((res) => {
              dispatch(setAlert(res?.status));
              dispatch(setSuccess(res?.status));
              dispatch(setMessage(t('S_SuccessOperation')));
              setNoticeModal(!noticeModal);
            })
            .catch(() => {});
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default ActionsPopover;
