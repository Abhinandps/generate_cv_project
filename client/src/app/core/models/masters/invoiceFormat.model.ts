export class InvoiceFormat {
  _id: string;
  subject: string;
  tag: string;
  type: string;

  constructor(_id: string, subject: string, tag: string, type: string) {
    this._id = _id;
    this.subject = subject;
    this.tag = tag;
    this.type = type;
  }
}
