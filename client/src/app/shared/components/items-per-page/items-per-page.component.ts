import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrl: './items-per-page.component.scss',
  standalone: false,
})
export class ItemsPerPageComponent {
  @Input()
  selectedItemsPerPage!: number;
  @Output() itemsPerPageChanged: EventEmitter<number> = new EventEmitter<number>();
  showDropdown = false;

  itemsPerPageOptions = [10, 50, 100];
  onItemsPerPageChange(itemsPerPage: number) {
    this.selectedItemsPerPage = itemsPerPage;
    this.itemsPerPageChanged.emit(itemsPerPage);
    this.showDropdown = false;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
