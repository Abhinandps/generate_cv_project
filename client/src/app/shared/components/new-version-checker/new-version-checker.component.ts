import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NewVersionCheckerService } from '../../../services/common/versionChecker/newVersionCheckerService';
import { updatesMessage } from '../../constants/updates.constant';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-version-checker',
  templateUrl: './new-version-checker.component.html',
  styleUrls: ['./new-version-checker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewVersionCheckerComponent {
  @Input() containerClasses!: string;
  updatesMessage = updatesMessage;

  constructor(public newVersionCheckerService: NewVersionCheckerService) {}

  applyUpdate(): void {
    this.newVersionCheckerService.applyUpdate();
  }
}
