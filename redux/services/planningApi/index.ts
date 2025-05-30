import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../../../prepareHeaders';
import {
  GetListNotCompletedPlansType,
  GetListRankForSearchType,
  InitialAddResponseType,
  DetectConfilictParamsType,
  SearchCustomerParamsType,
  GetListTagResponseType,
  finalSubmitParamsType,
  sessionDetailDtoType,
  SuccessType,
  AddOnePersonToSessionParamsType,
  RemoveOnePersonFromSessionParamsType,
  GetListAttendeesOfASessionParamsType,
  GetListAttendeesOfASessionType,
  updateTagListTypeParams,
  UpLoadAttachmentsTypeParams,
  AddAttendeesToSessionByRankParamsType,
  RemoveAllAttendeesFromSessionParamsType,
  GetListAttendeesRankParamsType,
  GetListAttendeesRankType,
  RemoveAllAttendeesFromSessionByRankIdParamsType,
  TrackingFinalSubmitTypeParams,
  GetListConsumerForTrackingType,
  getProductOfInvoiceType,
  getSearchInvoiceType,
  getDetailTrackingType,
  getEditTrackingResponseType,
  SessionResponsSubmitParamsType,
  GetListPlansType,
  DeleteAttendeeFromSearchParamsType,
  getProductOfInvoiceParams,
  editTrackingTypeParams,
} from './planningApi';
import { LangParams } from '#/schema/Utils';

export const planningApi = createApi({
  reducerPath: 'planningApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_HOST + '/User/Planning/',
    prepareHeaders,
  }),

  tagTypes: [
    'deleteDraft',
    'FinalSubmit',
    'UpdateTag',
    'AttendeesOfASession',
    'AttendeesOfASessionByRank',
    'TrackingFinalSubmit',
    'DeleteTracking',
    'listMembers'
  ],

  endpoints: (builder) => ({
    ///Tracking APIS
    SearchInvoice: builder.query<getSearchInvoiceType, { ConsumerId: string }>({
      query: (params: { ConsumerId: string }) => ({
        url: `SearchInvoice`,
        params,
      }),
    }),
    GetProductsOfInvoice: builder.query<
      getProductOfInvoiceType,
      getProductOfInvoiceParams
    >({
      query: (params: getProductOfInvoiceParams) => ({
        url: `GetProductsOfInvoice`,
        params,
      }),
    }),

    GetTrackingDetail: builder.query<
      getDetailTrackingType,
      { TrackingId: number }
    >({
      query: (params: { TrackingId: number }) => ({
        url: 'GetTrackingDetail',
        params,
      }),
    }),
    GetListConsumerForTracking: builder.query<
      GetListConsumerForTrackingType,
      LangParams
    >({
      query: () => ({
        url: 'GetListConsumerForTracking',
      }),
    }),

    TrackingFinalSubmit: builder.mutation<
      GetListTagResponseType,
      TrackingFinalSubmitTypeParams
    >({
      query: (body: TrackingFinalSubmitTypeParams) => ({
        url: `TrackingFinalSubmit`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['TrackingFinalSubmit'],
    }),

    DeleteTracking: builder.mutation<SuccessType, { trackingId: number }>({
      query: (body: { trackingId: number }) => ({
        url: `DeleteTracking`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['DeleteTracking'],
    }),

    GetTrackingDetailForEdit: builder.query<
      getEditTrackingResponseType,
      { TrackingId: number }
    >({
      query: (params: { TrackingId: number }) => ({
        url: 'GetTrackingDetailForEdit',
        params,
      }),
    }),

    // getEditTrackingResponseType
    ///End Of Tracking Apis

    GetListNotCompletedPlans: builder.query<
      GetListNotCompletedPlansType,
      LangParams
    >({
      query: () => ({
        url: 'GetListNotCompletedPlans',
      }),
      providesTags: ['deleteDraft'],
    }),

    GetListRankForSearch: builder.query<GetListRankForSearchType, LangParams>({
      query: () => ({
        url: 'GetListRankForSearch',
      }),
    }),

    GetListTag: builder.query<GetListTagResponseType, LangParams>({
      query: () => ({
        url: 'GetListTag',
      }),
      providesTags: ['UpdateTag'],
    }),

    UpdateTag: builder.mutation<
      GetListTagResponseType,
      updateTagListTypeParams
    >({
      query: (body: updateTagListTypeParams) => ({
        url: `UpdateTag`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['UpdateTag'],
    }),

    GetSessionDetails: builder.query<
      sessionDetailDtoType,
      { sessionId: number }
    >({
      query: (params: { sessionId: number }) => ({
        url: `GetSessionDetails?sessionId=${params.sessionId}`,
      }),
      providesTags: ['listMembers','FinalSubmit'],
    }),

    SearchCustomer: builder.query<
      GetListRankForSearchType,
      SearchCustomerParamsType
    >({
      query: (body: SearchCustomerParamsType) => ({
        url: 'SearchCustomer',
        method: 'post',
        body,
      }),
      keepUnusedDataFor: 3,
    }),

    GetListPlans: builder.query<
      GetListPlansType,
      { FromDate: string; ToDate: string }
    >({
      query: (params: { FromDate: string; ToDate: string }) => ({
        url: `GetListPlans`,
        params,
      }),
      providesTags: [
        'FinalSubmit',
        'deleteDraft',
        'TrackingFinalSubmit',
        'DeleteTracking',
      ],
    }),

    GetListAttendeesOfASession: builder.query<
      GetListAttendeesOfASessionType,
      GetListAttendeesOfASessionParamsType
    >({
      query: (params: GetListAttendeesOfASessionParamsType) => ({
        url: `GetListAttendeesOfASession`,
        params,
      }),
      keepUnusedDataFor: 3,
      providesTags: ['AttendeesOfASession'],
    }),

    GetListAttendeesRank: builder.query<
      GetListAttendeesRankType,
      GetListAttendeesRankParamsType
    >({
      query: (params: GetListAttendeesRankParamsType) => ({
        url: `GetListAttendeesRank`,
        params,
      }),
      providesTags: ['AttendeesOfASessionByRank'],
      keepUnusedDataFor: 3,
    }),

    UpLoadAttachments: builder.mutation<
      SuccessType,
      UpLoadAttachmentsTypeParams
    >({
      query: (body: UpLoadAttachmentsTypeParams) => ({
        url: `UpLoadAttachments`,
        method: 'post',
        body,
      }),
      // invalidatesTags: ['setDefault'],
    }),
    FinalSubmit: builder.mutation<SuccessType, finalSubmitParamsType>({
      query: (body: finalSubmitParamsType) => ({
        url: `FinalSessionSubmit`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['FinalSubmit'],
    }),

    DeleteDraft: builder.mutation<
      InitialAddResponseType,
      { sessionId: number }
    >({
      query: (body: { sessionId: number }) => ({
        url: `DeleteDraft`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['deleteDraft'],
    }),

    InitialAdd: builder.mutation<
      InitialAddResponseType,
      { planRequestTypeId: number }
    >({
      query: (body: { planRequestTypeId: number }) => ({
        url: `InitialAdd`,
        method: 'post',
        body,
      }),
      // invalidatesTags: ['setDefault'],
    }),

    DetectConfilict: builder.mutation<
      InitialAddResponseType,
      DetectConfilictParamsType
    >({
      query: (body: DetectConfilictParamsType) => ({
        url: `DetectConfilict`,
        method: 'post',
        body,
      }),
      // invalidatesTags: ['setDefault'],
    }),

    AddOnePersonToSession: builder.mutation<
      SuccessType,
      AddOnePersonToSessionParamsType
    >({
      query: (body: AddOnePersonToSessionParamsType) => ({
        url: `AddOnePersonToSession`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    RemoveOnePersonFromSession: builder.mutation<
      SuccessType,
      RemoveOnePersonFromSessionParamsType
    >({
      query: (body: RemoveOnePersonFromSessionParamsType) => ({
        url: `RemoveOnePersonFromSession`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    DeleteAttendeeFromSearch: builder.mutation<
      SuccessType,
      DeleteAttendeeFromSearchParamsType
    >({
      query: (body: DeleteAttendeeFromSearchParamsType) => ({
        url: `DeleteAttendeeFromSearch`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    RemoveAllAttendeesFromSession: builder.mutation<
      SuccessType,
      RemoveAllAttendeesFromSessionParamsType
    >({
      query: (body: RemoveAllAttendeesFromSessionParamsType) => ({
        url: `RemoveAllAttendeesFromSession`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    AddAttendeesToSessionByRank: builder.mutation<
      SuccessType,
      AddAttendeesToSessionByRankParamsType
    >({
      query: (body: AddAttendeesToSessionByRankParamsType) => ({
        url: `AddAttendeesToSessionByRank`,
        method: 'post',
        body,
      }),
      invalidatesTags: ['listMembers','AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    RemoveAllAttendeesFromSessionByRankId: builder.mutation<
      SuccessType,
      RemoveAllAttendeesFromSessionByRankIdParamsType
    >({
      query: (body: RemoveAllAttendeesFromSessionByRankIdParamsType) => ({
        url: `RemoveAllAttendeesFromSessionByRankId`,
        method: 'delete',
        body,
      }),
      invalidatesTags: ['AttendeesOfASession', 'AttendeesOfASessionByRank'],
    }),

    SessionResponsSubmit: builder.mutation<
      SuccessType,
      SessionResponsSubmitParamsType
    >({
      query: (body: SessionResponsSubmitParamsType) => ({
        url: 'SessionResponsSubmit',
        method: 'post',
        body,
      }),
    }),

    TrackingEdit: builder.mutation<SuccessType, editTrackingTypeParams>({
      query: (body: editTrackingTypeParams) => ({
        url: 'TrackingEdit',
        method: 'post',
        body,
      }),
      invalidatesTags: ['TrackingFinalSubmit'],
    }),
    // TrackingEdit
  }),
});

export type { GetListRankForSearchType };

export const {
  useSessionResponsSubmitMutation,
  useGetSessionDetailsQuery,
  useDeleteDraftMutation,
  useGetListTagQuery,
  useGetListNotCompletedPlansQuery,
  useGetListRankForSearchQuery,
  useGetListPlansQuery,
  useGetListAttendeesOfASessionQuery,
  useInitialAddMutation,
  useSearchCustomerQuery,
  useFinalSubmitMutation,
  useAddOnePersonToSessionMutation,
  useRemoveOnePersonFromSessionMutation,
  useDeleteAttendeeFromSearchMutation,
  useRemoveAllAttendeesFromSessionMutation,
  useGetListAttendeesRankQuery,
  useDetectConfilictMutation,
  useUpdateTagMutation,
  useAddAttendeesToSessionByRankMutation,
  useRemoveAllAttendeesFromSessionByRankIdMutation,

  //tacking Hooks
  useTrackingEditMutation,
  useDeleteTrackingMutation,
  useGetListConsumerForTrackingQuery,
  useGetTrackingDetailQuery,
  useGetProductsOfInvoiceQuery,
  useTrackingFinalSubmitMutation,
  useGetTrackingDetailForEditQuery,
  useSearchInvoiceQuery,
} = planningApi;
