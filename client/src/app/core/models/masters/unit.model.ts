import { MasterBase } from '../master-base.model';

export class Unit extends MasterBase {
  name: string;
  code: string;

  constructor(name: string, code: string) {
    super();
    this.name = name;
    this.code = code;
  }
}
