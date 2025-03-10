import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../services/common/modal/modal.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
  standalone: false
})
export class CustomModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() modalTitle: string = 'Default Title';
  @Input() modalContent: string = 'Default content goes here...';
  @Input() confirmBtn: string = 'Yes, Delete it';

  modalState$ = this.modalService.getModalState();
  modalData: any;
  modalAction?: EventEmitter<any>;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalState$.subscribe((state) => {
      this.isOpen = state.isOpen;
      if (state.isOpen) {
        this.modalData = state.data;
        this.modalAction = state.action;
        this.modalTitle = this.modalData.title;
        this.modalContent = this.modalData.content;
        this.confirmBtn = this.modalData.btn;
      }
    });
  }
  close() {
    this.modalService.closeModal();
  }

  confirm() {
    if (this.modalData && this.modalAction) {
      this.modalAction.emit(this.modalData);
      this.modalService.closeModal();
    }
  }
}
