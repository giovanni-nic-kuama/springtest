export interface PageStatus {
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  numberOfElements: number,
  number: number,
  first: boolean,
  empty: boolean
}

export const initialPageStatus: PageStatus = {
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  numberOfElements: 0,
  number: 0,
  first: false,
  empty: true
}