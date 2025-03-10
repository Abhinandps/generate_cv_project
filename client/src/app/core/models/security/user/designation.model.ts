export class Designation {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(
    _id: string,
    name: string,
    active: boolean,
    description: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
  ) {
    this._id = _id;
    this.name = name;
    this.active = active;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
  }
}
