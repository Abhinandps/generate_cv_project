import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsLayoutComponent } from './forms-layout/forms-layout.component';
import { FormsInputComponent } from './forms-input/forms-input.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DirectivesModule } from '../../directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';

export const SHARED_COMPONENTS: Array<Type<any>> = [
  FormsLayoutComponent,
  FormsInputComponent,
  DatepickerComponent,
  ButtonsComponent,
  PdfViewerComponent,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, PdfViewerModule, DirectivesModule, MatTooltipModule],
  exports: [...SHARED_COMPONENTS],
})
export class FormsModule {}
