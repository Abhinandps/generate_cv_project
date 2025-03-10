import { Component } from '@angular/core';

@Component({
  selector: 'app-forms-input',
  templateUrl: './forms-input.component.html',
  styleUrl: './forms-input.component.scss',
})
export class FormsInputComponent {
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
}
