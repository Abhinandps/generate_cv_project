import { MasterBase } from '../master-base.model';

export class Company extends MasterBase {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  logo?: string;
  invoiceFormat: any;

  constructor(
    companyId: string,
    companyName: string,
    companyAddress: string,
    companyEmail: string,
    invoiceFormat: any,
    logo?: string,
  ) {
    super();
    this.companyId = companyId;
    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyEmail = companyEmail;
    this.logo = logo;
    this.invoiceFormat = invoiceFormat;
  }
}
