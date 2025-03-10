/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdleService } from './idle/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task_web';

  constructor(private idleService: IdleService) {}
  ngOnInit() {}

  ngOnDestroy() {
    this.idleService.ngOnDestroy();
  }
}
