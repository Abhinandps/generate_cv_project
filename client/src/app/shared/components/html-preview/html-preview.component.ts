import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToasterService } from '@/services/common/toaster/toaster.service';

@Component({
  selector: 'app-html-preview',
  templateUrl: './html-preview.component.html',
  styleUrl: './html-preview.component.scss',
  standalone: false,
})
export class HtmlPreviewComponent {
  @Input() htmlContent: string = '';
  sanitizedHtml: SafeHtml = '';
  @ViewChild('htmlPreview', { static: false }) htmlPreview!: ElementRef;
  constructor(private sanitizer: DomSanitizer, private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.sanitizeContent();
  }

  ngOnChanges(): void {
    this.sanitizeContent();
  }


  onPrintClick(event: Event) {
    event.preventDefault();
    window.print();
  }

  async onDownload(event: Event) {
    event.preventDefault();

    const pdf = new jsPDF('p', 'mm', 'a4');
    const content = this.htmlPreview.nativeElement;

    const canvas = await html2canvas(content, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 10, 10, 190, 250);
    pdf.save('Resume.pdf');
  }

  getCurrentTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
  }

  private sanitizeContent(): void {
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }
}
