import { MasterBase } from '../master-base.model';

export class Product extends MasterBase {
  itemCode: string;
  itemDescription: string;
  unitPrice: number;
  currency: string;
  unit: string;
  companyId: string[];

  constructor(
    itemCode: string,
    itemDescription: string,
    unitPrice: number,
    currency: string,
    unit: string,
    companyId: string[],
  ) {
    super();
    this.itemCode = itemCode;
    this.itemDescription = itemDescription;
    this.unitPrice = unitPrice;
    this.currency = currency;
    this.unit = unit;
    this.companyId = companyId;
  }
}
