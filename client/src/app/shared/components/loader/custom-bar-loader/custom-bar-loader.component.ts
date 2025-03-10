import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-bar-loader',
  templateUrl: './custom-bar-loader.component.html',
  styleUrl: './custom-bar-loader.component.scss',
  standalone: false
})
export class CustomBarLoaderComponent {
  @Input() loading: boolean = true;
}
