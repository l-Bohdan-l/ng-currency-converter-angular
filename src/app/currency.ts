export class Currency {
  constructor(
    public currencyFromValue: number | null,
    public changeFrom: string,
    public currencyToValue: number | null,
    public changeTo: string
  ) {}
}
