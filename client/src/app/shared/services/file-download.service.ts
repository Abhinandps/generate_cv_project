import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from '../../services/common/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  private httpWithoutInterceptor!: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private toasterService: ToasterService,
  ) {
    this.httpWithoutInterceptor = new HttpClient(this.httpBackend);
  }

  /**
   * Downloads the file from the given URL and triggers a download in the browser.
   * @param fileUrl - URL of the file to be downloaded
   */
  downloadFile(fileUrl: string): void {
    const fileNameParts = this.extractFileName(fileUrl);
    const actualFileName = fileNameParts[1];
    this.httpWithoutInterceptor
      .get(fileUrl, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
          this.toasterService.error(`Download failed ${error}`);
          return throwError(() => new Error('Failed to download file.'));
        }),
      )
      .subscribe((blob) => {
        this.triggerDownload(blob, actualFileName);
      });
  }

  /**
   * Extracts the file name from the given URL.
   * @param url - The URL from which to extract the file name
   * @returns The cleaned-up file name
   */
  private extractFileName(url: string): string[] {
    const fullFileName = url.substring(url.lastIndexOf('/') + 1);
    const regex = /^(\d+)_/;
    const match = fullFileName.match(regex);

    if (match) {
      const index = fullFileName.indexOf('_');
      const numericPart = fullFileName.substring(0, index);
      const actualFileName = fullFileName.substring(index + 1);

      return [numericPart, actualFileName];
    }

    return [fullFileName];
  }

  /**
   * Triggers the file download in the browser.
   * @param blob - The file data as a Blob
   * @param fileName - The name to save the file as
   */
  private triggerDownload(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();

    // Clean up URL object
    window.URL.revokeObjectURL(url);
  }
}
