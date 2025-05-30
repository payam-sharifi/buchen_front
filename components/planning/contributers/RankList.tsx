import { Dispatch, FC, SetStateAction } from 'react';

import {
  Typography,
  Radio,
  Stack,
  Button,
  Modal,
  Grid,
  styled,
} from '@mui/material';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { useGetListAttendeesRankQuery } from '#/redux/services/user/planningApi';

const RankImage = styled('img')({
  width: '35px',
});

type PropsType = {
  filterConfig: { IsResponse: boolean; SematId: string; SematTitle: string };
  setFilterConfig: Dispatch<
    SetStateAction<{
      IsResponse: boolean;
      SematId: string;
      SematTitle: string;
    }>
  >;
  openModal: boolean;
  onClose: () => void;
};

const RankList: FC<PropsType> = ({
  openModal,
  onClose,
  filterConfig,
  setFilterConfig,
}) => {
  const t = useTranslations();

  const { lang, id } = useParams();

  const { data: rankData } = useGetListAttendeesRankQuery({
    SessionId: id as string,
  });

  return (
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
              my: 0.5,
              borderRadius: '5px',
              width: '80px',
            }}
          ></Grid>

          <Button
            color="inherit"
            fullWidth
            onClick={() =>
              setFilterConfig({
                ...filterConfig,
                SematId: '',
                SematTitle: t('F_Home_Key68'),
              })
            }
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
                {/* <RankImage
                  sx={{ mx: 1 }}
                  src={`https://cdn.pmlm.ir/assets/img/rank-logo/${item.idSemat}.png`}
                /> */}

                <Stack sx={{ px: 1 }}>
                  <Typography variant="caption">{t('F_Home_Key68')}</Typography>
                </Stack>
              </Grid>

              <Grid sx={{ px: 1.5 }}>
                <Radio checked={filterConfig.SematId === ''} />
              </Grid>
            </Grid>
          </Button>

          {rankData?.data.map((item, index) => (
            <Button
              color="inherit"
              fullWidth
              key={index}
              onClick={() =>
                setFilterConfig({
                  ...filterConfig,
                  SematId: item.idSemat.toString(),
                  SematTitle: item.semat_Desc,
                })
              }
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
                  <Radio
                    checked={filterConfig.SematId === item.idSemat.toString()}
                  />
                </Grid>
              </Grid>
            </Button>
          ))}
        </Grid>

        <Grid container sx={{ p: 1.5 }}>
          <Button fullWidth variant="contained" onClick={onClose}>
            {t('F_Taeid')}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default RankList;
