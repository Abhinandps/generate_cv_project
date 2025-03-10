import { Permission } from './permission.model';

export class Role {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  userType: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(
    _id: string,
    name: string,
    active: boolean,
    description: string,
    userType: string,
    permissions: Permission[],
    createdAt: string,
    updatedAt: string,
    __v: number,
  ) {
    this._id = _id;
    this.name = name;
    this.active = active;
    this.description = description;
    this.userType = userType;
    this.permissions = permissions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
  }
}
