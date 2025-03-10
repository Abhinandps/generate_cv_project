/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userLogin } from '@/core/models/security/user/user-login.model';
import { IApiBaseActions } from '@/shared/interfaces/api-base-actions.interface';
import { QueryApiResponse } from '@/shared/interfaces/queryResponse.interface';
import { Data } from '@/core/models/security/user/data.model';
import { User } from '@/core/models/security/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  apiendpoint = 'users';

  constructor(@Inject('IApiSecurity') private apiService: IApiBaseActions) {}

  // Login method
  login(data: userLogin): Observable<QueryApiResponse<Data>> {
    return this.apiService.Post<QueryApiResponse<Data>>(`/login`, data);
  }

  // User registration
  createUser(data: any): Observable<any> {
    return this.apiService.Post<any>(`${this.apiendpoint}`, data);
  }

  // Get all users
  getUsers(): Observable<QueryApiResponse<User[]>> {
    return this.apiService.Get<QueryApiResponse<User[]>>(`${this.apiendpoint}`);
  }

    // Get all users
    generateResume(userId: string): Observable<QueryApiResponse<User[]>> {
      return this.apiService.Get<QueryApiResponse<User[]>>(`${this.apiendpoint}/${userId}/resume`);
    }
  

  // delete User
  deleteUser(userid: string): Observable<any> {
    return this.apiService.Delete<any>(`${this.apiendpoint}/${userid}`);
  }

  // Get User by id
  getUserById(userid: any): Observable<QueryApiResponse<User>> {
    return this.apiService.Get<QueryApiResponse<User>>(`${this.apiendpoint}/${userid}`);
  }

  updateUser(data: any): Observable<any> {
    return this.apiService.Put<any>(`${this.apiendpoint}/${data.id}`, data);
  }
}
