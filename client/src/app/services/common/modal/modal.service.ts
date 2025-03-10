import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ModalState {
  isOpen: boolean;
  data?: any;
  action?: EventEmitter<any>;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>({ isOpen: false });
  modalState$ = this.modalStateSubject.asObservable();
  confirmAction = new EventEmitter<any>();

  openModal(data: any, action: EventEmitter<any>) {
    this.modalStateSubject.next({ isOpen: true, data, action });
  }

  closeModal() {
    this.modalStateSubject.next({ isOpen: false });
  }

  getModalState() {
    return this.modalState$;
  }
}
