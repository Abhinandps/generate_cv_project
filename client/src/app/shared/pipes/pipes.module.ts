import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

export const SHARED_PIPES: Array<Type<any>> = [];

@NgModule({
  declarations: [SHARED_PIPES],
  imports: [CommonModule],
  exports: [SHARED_PIPES],
})
export class PipesModule {}
