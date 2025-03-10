// components.module.ts
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { FormsModule } from './forms/forms.module';
import { DirectivesModule } from '../directives/directives.module';
import { PaginationComponent } from './pagination/pagination.component';
import { CustomBarLoaderComponent } from './loader/custom-bar-loader/custom-bar-loader.component';
import { CustomModalComponent } from './modal/custom-modal/custom-modal.component';
import { ToasterComponent } from './toaster/toaster.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NewVersionCheckerComponent } from './new-version-checker/new-version-checker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarComponent } from './avatar/avatar.component';

import { ItemsPerPageComponent } from './items-per-page/items-per-page.component';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { ReportTableComponent } from './report-table/report-table.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';
import { GenericModalComponent } from './modal/generic-modal/generic-modal.component';
import { HtmlPreviewComponent } from './html-preview/html-preview.component';
import { CardComponent } from './card/card.component';
export const SHARED_COMPONENTS: Array<Type<any>> = [
  Error404Component,
  Error500Component,
  PaginationComponent,
  CustomBarLoaderComponent,
  CustomModalComponent,
  ToasterComponent,
  AvatarComponent,
  ItemsPerPageComponent,
  TableComponent,
  SearchComponent,
  ReportTableComponent,
  ConfirmModalComponent,
  GenericModalComponent,
  MultiSelectDropdownComponent,
  StatusIndicatorComponent,
  HtmlPreviewComponent,
  CardComponent
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    AngularFormsModule,
    CommonModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
})
export class SharedComponentsModule {}
