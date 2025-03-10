import { UserRole } from './user-role.model';

export class User {
  _id: string;
  username: string;
  phone: number;
  active: boolean;
  email: string;
  userRole: UserRole;
  userType: string;
  regionId: string;
  companyId: string[];

  constructor(
    _id: string,
    username: string,
    phone: number,
    active: boolean,
    email: string,
    userRole: UserRole,
    userType: string,
    regionId: string,
    companyId: string[],
  ) {
    this._id = _id;
    this.username = username;
    this.phone = phone;
    this.active = active;
    this.email = email;
    this.userRole = userRole;
    this.userType = userType;
    this.regionId = regionId;
    this.companyId = companyId;
  }
}
