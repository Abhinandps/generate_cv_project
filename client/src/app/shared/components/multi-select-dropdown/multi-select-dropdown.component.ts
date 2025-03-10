import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Item {
  id: string;
  name: string;
  children: Item[];
}

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  standalone: false,
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() selectedIds: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  searchText: string = '';
  parentSelectedState: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.initializeParentSelection();
  }

  private initializeParentSelection(): void {
    this.items.forEach((item) => {
      this.updateParentSelection(item);
    });
  }

  public get filteredItems(): Item[] {
    if (!this.searchText) {
      return this.items;
    }
    return this.filterItems(this.items, this.searchText.toLowerCase());
  }

  toggleItem(item: Item) {
    if (item.children && item.children.length > 0) {
      const allChildrenSelected = item.children.every((child) => this.isSelected(child.id));
      const shouldSelectChildren = !allChildrenSelected;

      this.toggleChildren(item, shouldSelectChildren);
    }
    this.emitSelectionChange();
  }

  toggleChild(parent: Item, child: Item) {
    const isSelected = this.isSelected(child.id);
    if (isSelected) {
      this.removeSelectedId(child.id);
    } else {
      this.addSelectedId(child.id);
    }
    this.updateParentSelection(parent);
    this.selectionChange.emit(this.selectedIds);
  }

  toggleChildren(item: Item, select: boolean) {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        if (select) {
          this.addSelectedId(child.id);
        } else {
          this.removeSelectedId(child.id);
        }
        this.toggleChildren(child, select);
      });
    }
  }

  updateParentSelection(parent: Item) {
    if (parent.children && parent.children.length > 0) {
      const allChildrenSelected = parent.children.every((child) => this.isSelected(child.id));
      this.parentSelectedState[parent.id] = allChildrenSelected;
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.includes(id);
  }

  addSelectedId(id: string) {
    if (!this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    }
  }

  getSelectedItemName(id: string): string {
    for (let parent of this.filteredItems) {
      if (parent.children) {
        for (let child of parent.children) {
          if (child.id === id) {
            return child.name;
          }
        }
      }
    }
    return '';
  }

  removeSelectedId(id: string) {
    this.selectedIds = this.selectedIds.filter((selectedId) => selectedId !== id);
  }

  filterItems(items: Item[], searchText: string): Item[] {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText) ||
        (item.children && item.children.length > 0 && this.filterItems(item.children, searchText).length > 0),
    );
  }

  isParentSelected(parentId: string): boolean {
    return this.parentSelectedState[parentId] || false;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(this.selectedIds);
  }
}
