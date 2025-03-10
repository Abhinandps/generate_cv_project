import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
  standalone: false,
})
export class GenericModalComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
