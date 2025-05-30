export interface ResponseType<Data> {
  status: boolean;
  message: any;
  developerMessage?: any;
  exceptionId: number;
  data: Data;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  urlAddress?: any;
}
export interface PaginateType {
  pageIndex?: number;
  pageSize?: number;
}
export interface LangParams {
  lang?: QueryParamsType;
}
export type ParamsType<T> = PaginateType & LangParams & T;

export type paginateParamsType<params> = PaginateType & params;

export type QueryParamsType = string | string[];

export type langType = 'fa' | 'ar' | 'en';

export type selectBoxOptionType = {
  text: string;
  value: string;
};

export type paginationDataType = {
  PageIndex?: number;
  PageSize?: number;
};
