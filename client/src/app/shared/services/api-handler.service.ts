import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiBaseActions, ParamsType } from '../interfaces/api-base-actions.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService implements IApiBaseActions {
  protected baseUrl!: string;
  constructor(
    protected httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  Get<T>(endpoint: string, params?: ParamsType, responseType?: 'json' | 'blob' | 'text'): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: this.createParams(params),
      responseType: responseType as any,
    });
  }

  GetAll<T>(endpoint: string, params?: ParamsType): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseUrl}/${endpoint}`, { params: this.createParams(params) });
  }

  Post<T>(endpoint: string, data: any, params?: ParamsType): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/${endpoint}`, data, { params: this.createParams(params) });
  }

  Delete<T>(endpoint: string, data?: any, params?: ParamsType): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const httpParams = this.createParams(params);
    return this.httpClient.request<T>('DELETE', url, {
      body: data,
      params: httpParams,
    });
  }

  Put<T>(endpoint: string, data: any, params?: ParamsType): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}/${endpoint}`, data, { params: this.createParams(params) });
  }

  private createParams(params?: ParamsType): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            httpParams = httpParams.append(key, item);
          });
        } else {
          httpParams = httpParams.append(key, value as string | number | boolean);
        }
      });
    }
    return httpParams;
  }
}
