import { ParamsType, ResponseType } from '#/schema/Utils';
export interface fileUploadPropsType {
  files?: File[] | null | string;
  hasResize?: boolean;
  destination: string;
  imageResizeType?: number;
}

export interface GetListNotCompletedPlans {
  planRequestId: number;
  result: number;
  planRequestTypeId: number;
  planDate: string;
  startTime: string;
  endTime: string;
  planRequestTypeTitle: string;
}
export interface GetListRankForSearch {
  isAdd: boolean;
  idSemat: number;
  fullName: string;
  nameSemat: string;
  name: string;
  contactId?:any;
  idCustomer: string;
  ax: string;
  semat_Desc: string;
}

export interface getProductOfInvoice {
  product_ID: string;
  kala_FarsiDesc: string;
}

export type uploadFileResponse = ResponseType<string[]>;

export interface DetectConfilictParamsType {
  planDateStart: string;
  planDateEnd: string;
}

export interface SearchCustomerParamsType {
  textSearch: string;
  planRequestId?: numebr;
  pageIndex: number;
  pageSize: number;
}

export interface GetListAttendeesOfASessionParamsType {
  sematId: string;
  IsResponse?: boolean;
  sessionId?: numebr;
  pageIndex: number;
  pageSize: number;
}

export interface GetListAttendeesOfASessionData {
  fullName: string;
  idSemat: number;
  isConfirm: boolean;
  isPublish:boolean;
  responseCustomer: null;
  semat_Desc: string;
  ax: string;
  planContributorListId: number;
  rankImage: string;
  responseCustomer: string;
  semat_Desc: string;
  isOwner?: boolean,
  isUserLogin?: boolean
}

export interface GetListTagType {
  id: number;
  customerId: string;
  tagId: number;
  planTagId: number;
  nameTags: string;
}

export interface finalSubmitParamsType {
  sessionId: number;
  title: string;
  description: string;
  sessionLink: string;
  location: string;
  startPlanDate: string;
  endPlanDate: string;
  sessionTypeId: number;
  sessionTagId: number;
  listAttachment: any[];
}
export interface UpLoadAttachmentsTypeParams {
  planRequestId: 0;
  title: string;
  destination: string;
  typeFile: string;
}

export interface AddOnePersonToSessionParamsType {
  attendeeId: any;
  sessionId: number;
  rankId: number;
  isCustomer: boolean;
}

export interface getProductOfInvoiceParams {
  InvoiceId: string;
  ConsumerId: string;
}
export interface RemoveOnePersonFromSessionParamsType {
  planContributorListId?: string;

  attendeeId?: any;
  sessionId?: number;
  rankId?: number;
  isCustomer?: boolean;
}

export interface DeleteAttendeeFromSearchParamsType {
  sessionId: number;
  contactId: any;
  customerId: any;
  isCustomer: boolean;
}

export interface RemoveAllAttendeesFromSessionParamsType {
  sessionId: number;
}

export interface sessionDetailDto {
  id: number;
  planTagRequestId: string;
  title: string;
  description: string;
  sessionLink: string;
  location: string;
  startPlanDate: string;
  cnt:number,
  endPlanDate: string;
  planDate: string;
  isActive: false;
  isComplated: false;
  isDelete: false;
  planRequestTypeId: number;
  planContributorListId: number;
  sessionDateStart:string;
  sessionTypeId: number;
  sessionDateEnd:string;
  sessionTagId: number;
  createDate: string;
  modifiedDate: string;
  startTime: string;
  endTime: string;
  customerId: string;
  listContribut: string;
  listPlanRequest: string;
  attachmentList: any;
  listCustomer: string;
  confirmCnt: string;
  color: string;
  attachmentListWithURL: any[] | undefined;
  isAllDay: boolean;
  listContributeModel: any[];
  isOwner: boolean;
  isShowConfirmButton: boolean;
  planTagId: number;
  nameTags: string;
}

export interface GetListPlansData {
  planRequestId: number;
  planTagId: number;
  planRequestTypeId: number;
  planTitle: string;
  startTime: string;
  endTime: string;
  isAllDay:boolean;
  isDirty:boolean;
  planDate: string;
  sessionDateStart: Date;
  sessionDateEnd: Date;
  isOwner: boolean;
  conflict: number;
  index: number;
}

export interface TagListType {
  nameTage: string;
  planTageRequestId: number;
}
export interface AddAttendeesToSessionByRankParamsType {
  planRequestId: numner;
  rankId: numner;
}

export interface RemoveAllAttendeesFromSessionByRankIdParamsType {
  sessionId: number;
  rankId: number;
}
export interface SessionResponsSubmitParamsType {
  attendeeToSessionId: number;
  customerResponse: string;
}
export interface GetListAttendeesRankParamsType {
  SessionId: string;
}

export interface editTrackingTypeParams {
  trackingId: number;
  trackingTypeId: number;
  consumerId: number;
  invoiceId: string;
  productId: string;
  trackingDateTime: string;
  description: string;
  isAllDay: boolean;
}

export interface GetListAttendeesRankData {
  planRequestId: number;
  idSemat: number;
  semat_Desc: string;
}

export interface updateTagListTypeParams {
  tagList: TagListType[];
}

///types of Tracking
export interface getEditTypeForTracking {
  planRequestId: number;
  planRequestTypeId: number;
  customerId: string;
  description: string;
  isActive: boolean;
  isComplated: boolean;
  isDelete: boolean;
  createDate: string;
  planFollowTypeId: number;
  consumerId: number;
  orderId: string;
  productId: string;
  isAllDay: boolean;
  followDate: string;
}

export interface TrackingFinalSubmitTypeParams {
  trackingTypeId: number;
  consumerId: string;

  invoiceId: string;
  productId: string;
  trackingDateTime: string;
  description: string;
  isAllDay: boolean;
}

export interface GetListConsumerForTracking {
  customerId: string;
  consumerId: string;
  firstName: string;
  lastName: string;
}

export interface GetSearchInvoice {
  idOrder: string;
  shomareSefaresh: number;
}
export interface GetProductInvoiceType {
  idOrder: string;
  product_ID: string;
}

export interface trackingSubmitFinalParamsType {
  trackingTypeId: number;
  consumerId: string;
  customerId: string;
  invoiceId: string;
  productId: string;

  description?: string;
  isAllDay: boolean;
  trackingDateTime: string;
}

export interface getDetailTrackingResponseType {
  planRequestId: number;
  planFollowTitle: string;
  customerId: string;
  description: string;
  followDate: string;
  isAllDay: boolean;
  firstName: string;
  lastName: string;
  mobile: string;
  nameProduct: string;
}

export type SuccessType = ResponseType<boolean>;

export type GetInfoParamsType = ParamsType<NonNullable<unknown>>;

export type GetListAttendeesOfASessionType = ResponseType<
  GetListAttendeesOfASessionData[]
>;

export type GetListNotCompletedPlansType =
  ResponseType<GetListNotCompletedPlans>;

export type GetListRankForSearchType = ResponseType<GetListRankForSearch[]>;

export type InitialAddResponseType = ResponseType<{ result: false }>;
export type GetListTagResponseType = ResponseType<GetListTagType[]>;
export type GetListPlansType = ResponseType<GetListPlansData[]>;

export type GetListAttendeesRankType = ResponseType<GetListAttendeesRankData[]>;
export type sessionDetailDtoType = ResponseType<sessionDetailDto>;
export type GetListConsumerForTrackingType = ResponseType<
  GetListConsumerForTracking[]
>;

export type getProductOfInvoiceType = ResponseType<getProductOfInvoice[]>;

export type getSearchInvoiceType = ResponseType<GetSearchInvoice[]>;
export type getDetailTrackingType = ResponseType<getDetailTrackingResponseType>;
export type getEditTrackingResponseType = ResponseType<getEditTypeForTracking>;
