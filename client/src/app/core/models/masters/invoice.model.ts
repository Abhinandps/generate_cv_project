import { MasterBase } from '../master-base.model';

export class Invoice extends MasterBase {
  maxAmount: number;
  numberOfInvoices: number;
  date: string;
  company: string;
  currency: string;
  discount: number;

  constructor(maxAmount: number, numberOfInvoices: number, date: string, company: string, currency: string, discount: number) {
    super();
    this.maxAmount = maxAmount;
    this.numberOfInvoices = numberOfInvoices;
    this.date = date;
    this.company = company;
    this.currency = currency;
    this.discount = discount
  }
}
