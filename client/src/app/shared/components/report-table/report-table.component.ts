import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
  standalone: false,
})
export class ReportTableComponent {
  @Input() tableData: any[] = [];
  get tableHeaders(): string[] {
    if (this.tableData.length === 0) {
      return [];
    }
    return Object.keys(this.tableData[0]).filter((header) => header !== '_id');
  }
}
