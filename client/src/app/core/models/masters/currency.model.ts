import { MasterBase } from '../master-base.model';

export class Currency extends MasterBase {
  name: string;
  rateToMaster: number;
  description: string;

  constructor(name: string, rateToMaster: number, description: string) {
    super();
    this.name = name;
    this.rateToMaster = rateToMaster;
    this.description = description;
  }
}
