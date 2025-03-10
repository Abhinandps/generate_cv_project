import { Permission } from './permission.model';

export class UserRole {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  permissions: Permission[];

  constructor(_id: string, name: string, active: boolean, description: string, permissions: Permission[]) {
    this._id = _id;
    this.name = name;
    this.active = active;
    this.description = description;
    this.permissions = permissions;
  }
}
