import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../services/common/modal/modal.service';
import { ActionType } from '../../enums';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent {
  @Input() tableData: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() actionConfig: { [key in ActionType]: boolean } = {
    [ActionType.View]: true,
    [ActionType.Edit]: true,
    [ActionType.Delete]: true,
  };
  @Input() isCheckBoxShown: boolean = false;
  @Input() checkedItems: Set<string> = new Set<string>();
  @Input() hiddenColumns: Set<string> = new Set<string>();
  @Output() openDeleteConfirmation = new EventEmitter<string>();
  @Output() openEditConfirmation = new EventEmitter<string>();
  @Output() deleteOperation = new EventEmitter<string>();
  @Output() viewOperation = new EventEmitter<string>();
  @Output() editOperation = new EventEmitter<string>();
  @Output() addOperation = new EventEmitter<string>();
  @Output() checkboxChange = new EventEmitter<{ objectId: string; checked: boolean }>();

  isModalOpen = false;
  modalTitle = '';
  modalContent = '';
  confirmBtn = '';
  data: any;
  isSelectAllChecked: boolean = false;

  constructor(private modalService: ModalService) {}
  ActionType = ActionType;

  get tableHeaders(): string[] {
    if (this.tableData.length === 0) {
      return [];
    }
    return Object.keys(this.tableData[0]).filter((header) => header !== '_id');
  }

  isColumnHidden(column: string): boolean {
    return this.hiddenColumns.has(column);
  }

  openDeleteConfirmationModal(data: any) {
    this.openDeleteConfirmation.emit(data);
  }
  openEditConfirmationModal(data: any) {
    this.openEditConfirmation.emit(data);
  }

  isStatusColumn(key: string): boolean {
    return key === 'Status';
  }

  onCheckboxToggle(event: Event, _id: string): void {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;
    this.checkboxChange.emit({ objectId: _id, checked });
  }

  onSelectAllToggle(event: Event): void {
    const isSelected = (event.target as HTMLInputElement).checked;
    this.isSelectAllChecked = isSelected;

    if (isSelected) {
      // Select all checkboxes in the table
      this.tableData.forEach((row) => this.checkedItems.add(row._id));
    } else {
      // Deselect all checkboxes
      this.checkedItems.clear();
    }
  }

  isActionVisible(action: ActionType): boolean {
    return this.actionConfig[action] ?? false;
  }

  handleOkClicked() {
    if (this.data) {
      this.modalService.confirmAction.emit(this.data);
    }
    this.isModalOpen = false;
  }
  handleModalClosed() {
    this.isModalOpen = false;
  }

  delete(Id: string) {
    this.deleteOperation.emit(Id);
  }

  view(Id: string) {
    this.viewOperation.emit(Id);
  }

  edit(Id: string) {
    this.editOperation.emit(Id);
  }

  add() {
    this.addOperation.emit();
  }
}
