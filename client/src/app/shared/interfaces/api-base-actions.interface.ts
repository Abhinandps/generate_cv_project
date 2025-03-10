import { Observable } from 'rxjs';

export interface ParamsType {
  [key: string]: string | number | boolean | (string | number | boolean)[];
}

export interface IApiBaseActions {
  Get<T>(endpoint: string, params?: ParamsType, responseType?: 'json' | 'blob' | 'text'): Observable<T>;

  GetAll<T>(endpoint: string, params?: ParamsType): Observable<any>;

  Post<T>(endpoint: string, data: any, params?: ParamsType): Observable<any>;

  Delete<T>(endpoint: string, data?: any, params?: ParamsType): Observable<any>;

  Put<T>(endpoint: string, data: any, params?: ParamsType): Observable<any>;
}
