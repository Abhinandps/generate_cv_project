// global-error-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server error happened
      this.handleServerError(error);
    } else {
      // Client Error Happend
      this.handleClientError(error);
    }
  }

  // Customize the default server error handler here if needed
  private handleServerError(error: HttpErrorResponse) {
    if (!navigator.onLine) {
      // No Internet connection
      alert('No Internet Connection');
    }
  }

  private handleClientError(error: Error) {
    console.error(error);
  }
}
