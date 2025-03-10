import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ToasterType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Custom = 'custom',
}

export interface ToasterMessage {
  id: number;
  type: ToasterType;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private messages: ToasterMessage[] = [];
  private messageId = 0;
  private messageSource = new Subject<ToasterMessage[]>();

  messages$ = this.messageSource.asObservable();
  info: any;

  private addMessage(type: ToasterType, message: string) {
    const id = this.messageId++;
    const newMessage: ToasterMessage = { id, type, message };
    this.messages.push(newMessage);
    this.messageSource.next(this.messages);
  }

  success(message: string) {
    this.addMessage(ToasterType.Success, message);
  }

  warning(message: string) {
    this.addMessage(ToasterType.Warning, message);
  }

  error(message: string) {
    this.addMessage(ToasterType.Error, message);
  }

  custom(message: string) {
    this.addMessage(ToasterType.Custom, message);
  }

  removeMessage(id: number) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
    this.messageSource.next(this.messages);
  }
}
