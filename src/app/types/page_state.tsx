export const enum PageStatus {
  Data,
  Error,
  Loading,
}

export type PageState<T> = {
  status: PageStatus.Loading,
} | {
  status: PageStatus.Error,
  reason?: string,
} | {
  status: PageStatus.Data,
  data: T
};