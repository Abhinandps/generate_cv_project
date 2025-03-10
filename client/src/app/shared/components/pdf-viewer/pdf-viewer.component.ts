import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../../services/common/toaster/toaster.service';
import { FileDownloadService } from '../../services/file-download.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  @Input() pdfUrl: string = '';
  @Input() buttonLabel: string = 'View PDF';
  @Input() modalButtonLabel: string = 'Print';

  isOpen: boolean = false;
  loading: boolean = true;
  loadingPercentage = 0;

  constructor(private fileDownloadService: FileDownloadService) {}

  open() {
    this.isOpen = true;
    this.loading = true;
  }

  close() {
    this.isOpen = false;
    this.loading = false;
  }

  print() {
    const pdfFrame = document.getElementById('pdfFrame') as HTMLIFrameElement;
    if (pdfFrame && pdfFrame.contentWindow) {
      pdfFrame.contentWindow.print();
    }
  }
  onPdfLoad(): void {
    this.loading = false;
    this.resetLoadingPercentage();
  }
  onProgress(progressData: { loaded: number; total: number }) {
    this.loadingPercentage = Math.round((progressData.loaded / progressData.total) * 100);
  }

  downloadPdf() {
    this.fileDownloadService.downloadFile(this.pdfUrl);
  }

  resetLoadingPercentage() {
    this.loadingPercentage = 0;
  }
}
