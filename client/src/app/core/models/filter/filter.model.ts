export class DateRange {
  constructor(
    public start: string,
    public end: string,
  ) {}
}

export class NumberRange {
  constructor(
    public start: number,
    public end: number,
  ) {}
}

export type Range = DateRange | NumberRange;

export class Filter {
  constructor(
    public field: string,
    public value: any,
    public operator: string,
  ) {}
}
