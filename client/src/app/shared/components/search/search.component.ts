import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: false,
})
export class SearchComponent {
  searchQuery = '';
  @Output() search = new EventEmitter<string>();
  onKeyup(): void {
    this.search.emit(this.searchQuery.trim());
  }
}
