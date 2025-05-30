'use client';
import {
  Stack,
  Button,
  Typography,
  IconButton,
  Grid,
  Skeleton,
} from '@mui/material';
import React, { useState, useEffect, FC } from 'react';
import { useParams,  } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
  useGetListRankForSearchQuery,
  useSearchCustomerQuery,
  useAddOnePersonToSessionMutation,
  useRemoveOnePersonFromSessionMutation,
  useAddAttendeesToSessionByRankMutation,
  useDeleteAttendeeFromSearchMutation,
} from '#/redux/services/user/planningApi';
import { styled, useTheme } from '@mui/material/styles';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import InfinityScroll from '#/ui/component/InfinityScroll';

import { useAppDispatch } from '#/redux/hooks';

import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';

import AddMemberConfirmModal from './AddMemberConfirmModal';

const UserImage = styled('img')({
  width: '50px',
  borderRadius: '50%',
});

const RankImage = styled('img')({
  width: '40px',
});

type propsType = {
  searchText: string;
  setFocusedSearch: ()=>void;
};

const SelectList: FC<propsType> = ({ searchText,setFocusedSearch }) => {
  const theme = useTheme();

  const t = useTranslations();
  const [addedAndRemovedId, setAddedAndRemovedId] = useState<{
    added: string[];
    removed: string[];
  }>({
    added: [],
    removed: [],
  });
  const [page, setPage] = useState(1);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setPage(1);
    setReset(!reset);
    setAddedAndRemovedId({
      added: [],
      removed: [],
    });
  }, [searchText]);

  return (
    <Grid
      container
      display="flex"
      maxWidth="md"
      sx={{
        mt: 7.5,
        boxShadow: theme.shadows[5],
        bgcolor: 'background.paper',
        position: 'absolute',
        top: 0,
        zIndex: 1,
      }}
    >
      {searchText.length > 2 && (
        <InfinityScroll
          identifier="member"
          end={false}
          onScrollDown={() => setPage(page + 1)}
          reset={reset}
        >
          <Member
            searchText={searchText}
            addedAndRemovedId={addedAndRemovedId}
            setAddedAndRemovedId={setAddedAndRemovedId}
            pageSize={20}
            pageIndex={1}
            page={page}
          />
        </InfinityScroll>
      )}

      <Rank setFocusedSearch={setFocusedSearch} searchText={searchText} />
    </Grid>
  );
};

type memberPropsType = {
  searchText: string;
  addedAndRemovedId: { added: string[]; removed: string[] };
  setAddedAndRemovedId: React.Dispatch<
    React.SetStateAction<{
      added: string[];
      removed: string[];
    }>
  >;
  pageIndex: number;
  page: number;
  pageSize: number;
};

const Member: FC<memberPropsType> = ({
  searchText,
  addedAndRemovedId,
  setAddedAndRemovedId,
  pageIndex,
  page,
  pageSize,
}) => {
  const t = useTranslations();
  const { lang, id } = useParams();

  const theme = useTheme();

  const res = useSearchCustomerQuery({
    textSearch: searchText,
    planRequestId: id,
    pageIndex,
    pageSize,
  });

  const [add, { isLoading: addLoading }] = useAddOnePersonToSessionMutation({});
  const [remove, { isLoading: removeLoading }] =
    useDeleteAttendeeFromSearchMutation({});

  return (
    <>
      {res.data?.data.map((item, index) => {
        var added = item.isAdd;
        if (item.isAdd) {
          added = !addedAndRemovedId.removed.includes(item.contactId ? item.contactId.toString():item.idCustomer);
        } else {
          added = addedAndRemovedId.added.includes(item.contactId ? item.contactId.toString():item.idCustomer);
        }

        var body = {
          attendeeId: item.contactId ? item.contactId.toString():item.idCustomer.toString(),
          sessionId: Number(id.toString()),
          rankId: item.idSemat,
          isCustomer: item.contactId ?false: true,
        };

        var removeBody = {
          sessionId: Number(id.toString()),
          // contactId: item.idCustomer,
          contactId:item.contactId ? item.contactId :0,
          customerId: item.idCustomer,
          isCustomer:  item.contactId ?false: true,
        };



        var addOrRemove = () => {
          if (item.isAdd) {
            addedAndRemovedId.removed.includes(item.contactId ? item.contactId.toString():item.idCustomer)
              ? add(body).then(() => {
                  setAddedAndRemovedId({
                    added: addedAndRemovedId.added,
                    removed: addedAndRemovedId.removed.filter(
                      (i) => i != (item.contactId ? item.contactId:item.idCustomer),
                    ),
                  });
                })
              : remove(removeBody).then(() => {
                  setAddedAndRemovedId({
                    added: addedAndRemovedId.added,
                    removed: [...addedAndRemovedId.removed, item.contactId ? item.contactId.toString():item.idCustomer],
                  });
                });
          } else {
            addedAndRemovedId.added.includes(item.contactId ? item.contactId.toString():item.idCustomer)
              ? remove(removeBody).then(() =>
                  setAddedAndRemovedId({
                    added: addedAndRemovedId.added.filter(
                      (i) => i != (item.contactId ? item.contactId:item.idCustomer),
                    ),
                    removed: addedAndRemovedId.removed,
                  }),
                )
              : add(body).then(() =>
                  setAddedAndRemovedId({
                    added: [...addedAndRemovedId.added, item.contactId ? item.contactId.toString():item.idCustomer],
                    removed: addedAndRemovedId.removed,
                  }),
                );
          }
        };

        return (
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
                src={
                  item.ax
                    ? `https://file.pmlm.ir/Content/image/Customers/images/238_238/${item.ax}`
                    : 'https://file.pmlm.ir/Content/image/unknown.jpg'
                }
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
                  {item.nameSemat}
                </Typography>
              </Grid>
            </Grid>

            <Grid>
              {
                <IconButton
                  onClick={addOrRemove}
                  disabled={addLoading || removeLoading}
                >
                  <PmlmIcon
                    src={
                      !added
                        ?'icon-typecircle-plus-solid' 
                        : 'icon-typecircle-minus-light'
                    }
                    color={
                      !added
                        ? theme.palette.text.secondary
                        : theme.palette.primary.main
                    }
                  />
                </IconButton>
              }
            </Grid>
          </Grid>
        );
      })}

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
            searchText={searchText}
            addedAndRemovedId={addedAndRemovedId}
            setAddedAndRemovedId={setAddedAndRemovedId}
            pageIndex={pageIndex + 1}
            page={page}
          />
        )}



    </>
  );
};

type rankPropsType = {
  searchText: string;
  setFocusedSearch: ()=>void;
};



const Rank: FC<rankPropsType> = ({ searchText ,setFocusedSearch}) => {
  const t = useTranslations();
  const theme = useTheme();
  const { lang, id } = useParams();
  const dispatch = useAppDispatch();

  const [exitSafeModal,setExitSafe]=useState<boolean>(false)
  const [idSemat,setidSemat]=useState<number>()
  const [semat_Desc,setSemat_Desc]=useState<string>()

  const rankData = useGetListRankForSearchQuery({});

  const [addByRank, { isLoading: addLoading }] =
    useAddAttendeesToSessionByRankMutation({});
    const addAllMemberInRank=()=>{
      addByRank({
        planRequestId: id,
        rankId:idSemat ,
      })
        .unwrap()
        .then((res) => {
          dispatch(setAlert(res?.status));
          dispatch(setSuccess(res?.status));
          dispatch(setMessage(t('S_SuccessOperation')));
          setFocusedSearch()
        })
        .catch(() => {})
    }
  return (
    <>
      {searchText.length < 3 &&
        rankData.data?.data.map((item, index) => (
          <Button
            fullWidth
            color="inherit"
            disabled={addLoading}
            onClick={()=>{
              setidSemat(item.idSemat) 
              setSemat_Desc(item.semat_Desc) 
              setExitSafe(true)
            
            }}
            sx={{ p: 0 }}
          >
            <Grid
              container
              item
              xs={12}
              display="flex"
              // justifyContent="space-between"
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
            </Grid>
          </Button>
        ))}
        <AddMemberConfirmModal
        idSemat={idSemat}
        semat_Desc={semat_Desc}
        openModal={exitSafeModal}
        onClose={() => setExitSafe(false)}
        title={`${t('add_all_members')} `}
        // with_add_all_member
        content={`${t('with_add_all_member')} ${semat_Desc} ${t('To_session')}`}
        action={addAllMemberInRank}
      /> 
    </>
  );
};

export default SelectList;
