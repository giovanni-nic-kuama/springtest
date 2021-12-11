import {PageStatus} from "./PageStatus";

export interface PageResponse<T> {
  content: readonly T[],
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  numberOfElements: number,
  number: number,
  first: boolean,
  empty: boolean
}