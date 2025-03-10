import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIdleModule } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { IdleService } from './idle.service';

@NgModule({
  imports: [CommonModule, NgIdleModule.forRoot()],
  providers: [IdleService, Keepalive],
})
export class IdleModule {}
