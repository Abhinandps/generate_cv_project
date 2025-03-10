import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.localStorage.getItem('authToken');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
