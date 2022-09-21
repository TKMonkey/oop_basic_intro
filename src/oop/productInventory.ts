import { Product } from "./product";

/**
 * Wrapper over a Product with a the number of units for that product
 */
export class InventoryProduct {
  constructor(private readonly _product: Product, private _amount: number) {}

  /**
   * Product to which this Inventory refers to
   */
  public get product(): Product {
    return this._product;
  }

  /**
   * Amount of units for the product this Inventory refers to
   */
  public get amount(): number {
    return this._amount;
  }

  /**
   * Removes one unit from the current Inventory
   */
  decrease() {
    this._amount = this._amount - 1;
  }
}
