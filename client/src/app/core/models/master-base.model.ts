export class MasterBase {
  _id?: string;
  active: string | boolean;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v: string | undefined;
  createdBy: string | undefined;
  modifiedBy: string | undefined;

  constructor(
    _id?: string,
    active = true,
    deleted = false,
    createdAt?: string,
    updatedAt?: string,
    __v?: string,
    createdBy?: string,
    modifiedBy?: string,
  ) {
    this._id = _id;
    this.active = active;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
  }
}
