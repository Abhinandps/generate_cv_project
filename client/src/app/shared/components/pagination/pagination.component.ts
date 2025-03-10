import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent {
  @Input() totalItems!: number;
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Output() pageChanged = new EventEmitter<number>();

  maxVisiblePages = 5;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages;

    const startPage = Math.floor((this.currentPage - 1) / this.maxVisiblePages) * this.maxVisiblePages + 1;
    const endPage = Math.min(startPage + this.maxVisiblePages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
