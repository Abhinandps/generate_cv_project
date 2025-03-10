import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
  standalone: false,
})
export class StatusIndicatorComponent implements OnInit {
  @Input() status: any = '';
  statusColor: string = '';

  ngOnInit(): void {
    this.statusColor = this.getStatusColor(this.status);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['status']) {
      this.statusColor = this.getStatusColor(this.status);
    }
  }

  getStatusColor(status: any): string {
    switch (status) {
      default:
        return '#9b59b6';
    }
  }
}
