import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ERROR_MESSAGES } from '../../constants';
import { ToasterService } from '../../services/common/toaster/toaster.service';

@Injectable()
export class AppErrorInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToasterService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url.split('/');
    const isLogin = url.includes('login');
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error, isLogin);
        return throwError(error);
      }),
    );
  }

  private handleError(error: HttpErrorResponse, isLogin: boolean) {
    if (isLogin) {
      return;
    }
    if (error.status === 0) {
      this.toasterService.error(ERROR_MESSAGES.SERVER_NOT_RUNNING);
    } else if (error.status >= 500) {
      this.toasterService.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
    } else if (error.status === 409) {
      this.toasterService.error(ERROR_MESSAGES.CONFLICT_ERROR);
    } else if (error.status === 404) {
      this.toasterService.error(ERROR_MESSAGES.NOT_FOUND);
    } else if (error.status === 401) {
      this.toasterService.error(ERROR_MESSAGES.UNAUTHORIZED);
    } else if (error.status === 403) {
      this.toasterService.error(ERROR_MESSAGES.SESSION_EXPIRED);
    } else if (error.status >= 400) {
      this.toasterService.error(ERROR_MESSAGES.BAD_REQUEST);
    }
  }
}
