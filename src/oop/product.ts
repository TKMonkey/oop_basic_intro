/**
 * Item with a name and a price
 */
export class Product {
  private readonly _name: string;
  private readonly _price: number;

  constructor(_name: string, _price: number) {
    this._name = _name;
    this._price = _price;
  }

  public get name() {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }
}
