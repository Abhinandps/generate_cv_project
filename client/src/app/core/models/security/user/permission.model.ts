import { Menu } from './menu.model';

export class Permission {
  canSave: boolean;
  canUpdate: boolean;
  canView: boolean;
  canDelete: boolean;
  _id: string;
  menu: Menu | null;

  constructor(
    canSave: boolean,
    canUpdate: boolean,
    canView: boolean,
    canDelete: boolean,
    _id: string,
    menu: Menu | null,
  ) {
    this.canSave = canSave;
    this.canUpdate = canUpdate;
    this.canView = canView;
    this.canDelete = canDelete;
    this._id = _id;
    this.menu = menu;
  }
}
