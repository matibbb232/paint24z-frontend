export const enum PageStatus {
  Data,
  Error,
  Loading,
}

export type PageState<T> = {
  status: PageStatus.Loading | PageStatus.Error,
} | {
  status: PageStatus.Data,
  data: T
};