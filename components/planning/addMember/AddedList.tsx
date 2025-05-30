'use client';
import { Stack, Skeleton, Typography, IconButton, Grid } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  useGetListAttendeesOfASessionQuery,
  useRemoveOnePersonFromSessionMutation,
} from '#/redux/services/user/planningApi';
import { styled, useTheme } from '@mui/material/styles';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import InfinityScroll from '#/ui/component/InfinityScroll';
import { useAppDispatch } from '#/redux/hooks';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';

const UserImage = styled('img')({
  width: '50px',
  borderRadius: '50%',
});

export default function AddedList({ focusedSerch }: { focusedSerch: boolean }) {
  const pathneame = usePathname();
  const path = useParams();
  const router = useRouter();
  const t = useTranslations();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setPage(1);
    setReset(!reset);
  }, [focusedSerch]);

  return (
    <Grid container display="flex" maxWidth="md" sx={{ mt: 10 }}>
      <InfinityScroll
        identifier="member"
        end={false}
        onScrollDown={() => setPage(page + 1)}
        reset={reset}
      >
        <Member pageSize={20} pageIndex={1} page={page} />
      </InfinityScroll>
    </Grid>
  );
}

type memberPropsType = {
  pageIndex: number;
  page: number;
  pageSize: number;
};

const Member: FC<memberPropsType> = ({ pageIndex, page, pageSize }) => {
  const t = useTranslations();
  const { lang, id } = useParams();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  // 0946937591
  const res = useGetListAttendeesOfASessionQuery({
    sessionId: id,
    sematId: '',
    pageIndex,
    pageSize,
  });

  const [remove, { isLoading: removeLoading }] =
    useRemoveOnePersonFromSessionMutation({});

  return (
    <>
      {res.data?.data.map((item) => (
        <Grid
          container
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ bgcolor: 'background.paper', p: 1, mb: 0.2 }}
        >
          <Grid display="flex" alignItems="center">
            <UserImage
              src={`https://file.pmlm.ir/Content/image/Customers/images/238_238/${item.ax}`}
            />

            <Grid sx={{ px: 2 }}>
              <Typography variant="subtitle2">{item.fullName} </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  bgcolor: 'background.neutral',
                  borderRadius: '10px',
                  px: 1,
                  py: 0.25,
                }}
              >
                {item.semat_Desc}
              </Typography>


            </Grid>


          </Grid>

          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item>
              {
                item.isPublish && (
                  item.isConfirm
                    ?
                    <DoneAllIcon sx={{ color: 'success.main' }} />
                    :
                    <DoneIcon sx={{ color: 'success.main' }} />
                )
              }
            </Grid>
            <Grid item>
              <IconButton
                onClick={() =>
                  remove({
                    planContributorListId: item.planContributorListId.toString(),
                  })
                    .unwrap()
                    .then((res) => {
                      dispatch(setAlert(res?.status));
                      dispatch(setSuccess(res?.status));
                      dispatch(setMessage(t('S_SuccessOperation')));
                    })
                    .catch(() => { })
                }
              >
                <PmlmIcon src="icon-typetrash-can-solid" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}

      {res.isFetching &&
        [{}, {}].map(() => (
          <Grid container sx={{ bgcolor: 'background.paper', p: 1, mb: 0.2 }}>
            <Grid display="flex" alignItems="center">
              <Skeleton variant="circular" width={50} height={50} />

              <Stack sx={{ px: 2 }}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', width: '80px' }}
                />

                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', width: '60px' }}
                />
              </Stack>
            </Grid>
          </Grid>
        ))}

      {pageIndex < page &&
        res.data?.data.length == pageSize &&
        !res.isFetching && (
          <Member pageSize={pageSize} pageIndex={pageIndex + 1} page={page} />
        )}
    </>
  );
};
