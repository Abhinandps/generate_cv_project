export interface QueryApiResponse<T> {
  message: string;
  success: boolean;
  statusCode: number;
  itemCount: number | null;
  currentPage: number | null;
  data: T;
}
