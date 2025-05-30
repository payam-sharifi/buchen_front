'use client';
import { Stack, Skeleton, Typography, Grid, useTheme } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useGetListAttendeesOfASessionQuery } from '#/redux/services/user/planningApi';
import { styled } from '@mui/material/styles';
import InfinityScroll from '#/ui/component/InfinityScroll';
import CheckIcon from '@mui/icons-material/Check';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterMembers from './FilterMembers';
const UserImage = styled('img')({
  width: '50px',
  borderRadius: '50%',
});

export default function AddedList({
  focusedSerch,
  filterConfig,
}: {
  focusedSerch: boolean;
  filterConfig: { IsResponse: boolean; SematId: string; SematTitle: string };
}) {
  const [page, setPage] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setPage(1);
    setReset(!reset);
  }, [focusedSerch, filterConfig.IsResponse, filterConfig.SematId]);

  return (
    <Grid container display="flex" maxWidth="md" sx={{ mt: 0.5 }}>
      <InfinityScroll
        identifier="member"
        end={false}
        onScrollDown={() => setPage(page + 1)}
        reset={reset}
      >
        <Member
          pageSize={20}
          pageIndex={1}
          page={page}
          filterConfig={filterConfig}
        />
      </InfinityScroll>
    </Grid>
  );
}

type memberPropsType = {
  filterConfig: { IsResponse: boolean; SematId: string; SematTitle: string };
  pageIndex: number;
  page: number;
  pageSize: number;

};

const Member: FC<memberPropsType> = ({
  pageIndex,
  page,
  pageSize,

}) => {
  const t = useTranslations();
  const { lang, id } = useParams();
  const [isShow, setIsShow] = useState<any>()
  const theme = useTheme();
  const [filterConfig, setFilterConfig] = useState({
    IsResponse: false,
    SematId: '',
    SematTitle: 'همه',
  });
  const res = useGetListAttendeesOfASessionQuery({
    sessionId: id,
    sematId: filterConfig.SematId,
    IsResponse: filterConfig.IsResponse,
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    setIsShow(res.data?.data.some((item) => item.isUserLogin == true))
  }, [res.data?.data, res])

  return (
    <>
      {
        !isShow &&
        <FilterMembers
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
          isShow={isShow}
        />
      }
      {res.data?.data.map((item: any, index: any) => (
        <Grid
          container
          item
          key={item + index}
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


              {!isShow &&
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

              }
            </Grid>


          </Grid>

          <Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {item.isOwner &&
                < Typography
                  variant="caption"
                  fontWeight="bold"
                  color={'grey.800'}
                  sx={{ color: theme.palette.grey[600] }}
                >
                  {t('the_creator')}
                </Typography>
              }
              {
                (item.isPublish && !item.isOwner) && (
                  item.isConfirm
                    ? <>
                      <DoneAllIcon sx={{ color: 'success.main' }} />

                    </>
                    :
                    <DoneIcon sx={{ color: 'success.main' }} />
                )
              }
            </Grid>
          </Grid>
          {(item.responseCustomer && !isShow) && (
            <Grid container sx={{ px: 1, pt: 1 }}>
              <Grid
                display="flex"
                alignItems="center"
                sx={{ bgcolor: 'background.default', p: 0.5, borderRadius: 2 }}
              >
                <QuestionAnswerOutlinedIcon sx={{ fontSize: 15, mx: 0.5 }} />{' '}
                {item.responseCustomer}
              </Grid>

            </Grid>

          )

          }
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

          <Member
            pageSize={pageSize}
            pageIndex={pageIndex + 1}
            page={page}
            filterConfig={filterConfig}
          />
        )}
    </>
  );
};
