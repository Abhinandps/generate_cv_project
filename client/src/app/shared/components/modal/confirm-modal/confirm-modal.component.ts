import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  standalone: false,
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; showConfirmButton: boolean },
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Close the modal and return true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal and return false
  }
}
