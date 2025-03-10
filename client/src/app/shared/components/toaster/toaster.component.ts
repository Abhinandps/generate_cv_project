import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToasterMessage, ToasterService, ToasterType } from '../../../services/common/toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  standalone: false,
})
export class ToasterComponent implements OnInit, OnDestroy {
  messages: ToasterMessage[] = [];
  private subscription!: Subscription;

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.toasterService.messages$.subscribe((messages) => {
      this.messages = messages;
      if (this.messages.length > 0) {
        const messageToRemove = this.messages[0];
        setTimeout(() => {
          this.removeMessage(messageToRemove.id);
        }, 5000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeMessage(id: number) {
    this.toasterService.removeMessage(id);
  }

  getIcon(type: ToasterType): string {
    switch (type) {
      case ToasterType.Success:
        return '✔️';
      case ToasterType.Warning:
        return '⚠️';
      case ToasterType.Error:
        return '❌';
      case ToasterType.Custom:
        return '⭐';
      default:
        return '';
    }
  }

  getTypeText(type: ToasterType): string {
    switch (type) {
      case ToasterType.Success:
        return 'Success Message';
      case ToasterType.Warning:
        return 'Warning Message';
      case ToasterType.Error:
        return 'Error Message';
      case ToasterType.Custom:
        return 'Custom Message';
      default:
        return '';
    }
  }

  getIconClass(type: ToasterType): string {
    switch (type) {
      case ToasterType.Success:
        return 'icon-success';
      case ToasterType.Warning:
        return 'icon-warning';
      case ToasterType.Error:
        return 'icon-error';
      case ToasterType.Custom:
        return 'icon-custom';
      default:
        return '';
    }
  }
}
