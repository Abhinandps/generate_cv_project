import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/jwt.interceptor';
import { AppErrorInterceptor } from './interceptor/error.interceptor';

import { AppInitService } from './services/app-init.service';
import { GlobalErrorHandler } from './global-error-handler';
import { StoreModule } from '@ngrx/store';
import { coreReducers } from './state/core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenuInterceptor } from './interceptor/menu.interceptor';
export function initializerFactory(appConfig: AppInitService) {
  return (): Promise<any> => {
    return appConfig.load();
  };
}

@NgModule({
  imports: [CommonModule, HttpClientModule, StoreModule.forRoot(coreReducers), EffectsModule.forRoot([])],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MenuInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFactory,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  exports: [HttpClientModule],
})
export class CoreModule {}
