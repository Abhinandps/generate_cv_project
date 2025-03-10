export class Menu {
  _id: string;
  name: string;
  component: string;
  parentId: string | null;
  label: string;

  constructor(_id: string, name: string, component: string, parentId: string | null, label: string) {
    this._id = _id;
    this.name = name;
    this.component = component;
    this.parentId = parentId;
    this.label = label;
  }
}
