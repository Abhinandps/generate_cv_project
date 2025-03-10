import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  statuses: string[] = ['primary', 'success', 'info', 'warning', 'danger'];
  shapes: string[] = ['rectangle', 'semi-round', 'round'];
  sizes: string[] = ['tiny', 'small', 'medium', 'large', 'giant'];
}
