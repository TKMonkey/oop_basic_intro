import { InventoryProduct } from "./productInventory";

/**
 * Different results that {canDispatchProduct} can return
 */
export enum CanDispatchProductResult {
  /**
   * Received a position that't not available to be dispatched
   */
  illegalPosition,
  /**
   * Received less money than the Product Price
   */
  notEnoughMoney,
  /**
   * There's not a single unit of the product
   */
  notEnoughProduct,
  /**
   * The product can be dispatched
   */
  success,
}

/**
 * Keeps track of the current available products and their amount
 */
export class Inventory {
  constructor(private _productInventories: Array<InventoryProduct>) {}

  /**
   * Gathers the price of a product in received {productPosition}
   * @param productPosition Position of the product to retrieve its price
   * @returns Price of the Product in received {productPosition}
   */
  public productPositionPrice(productPosition: number): number {
    return this._productInventories[productPosition].product.price;
  }

  /**
   * Gathers the name of a product in received {productPosition}
   * @param productPosition Position of the product to retrieve its name
   * @returns Name of the Product in received {productPosition}
   */
  public productPositionName(productPosition: number): string {
    return this._productInventories[productPosition].product.name;
  }

  /**
   * Evaluates if it's possible to dispatch a product in received {productPosition} with the {receivedMoney}
   * @param productPosition Position of the product to evaluate if it can be dispatched
   * @param receivedMoney Money received for the purchase
   * @returns CanDispatchProductResult describing evaluation result
   */
  public canDispatchProduct(
    productPosition: number,
    receivedMoney: number
  ): CanDispatchProductResult {
    if (productPosition >= this._productInventories.length) {
      return CanDispatchProductResult.illegalPosition;
    }

    const productInventory = this._productInventories[productPosition];

    if (productInventory.amount == 0) {
      return CanDispatchProductResult.notEnoughProduct;
    }

    if (productInventory.product.price > receivedMoney) {
      return CanDispatchProductResult.notEnoughMoney;
    }

    return CanDispatchProductResult.success;
  }

  /**
   * Removes one unit from the product lying in {productPosition}
   * @param productPosition The position of the product that needs to be decreased its amount
   */
  dispatchProduct(productPosition: number) {
    this._productInventories[productPosition].decrease();
  }
}
