import { Cashier } from "./cashier";
import { CanDispatchProductResult, Inventory } from "./inventory";
import { Money } from "./money";
import { Screen } from "./screen";

/**
 * Machine for selling products located inside.
 * Clients insert enough money for the product they want, pick the product and get the change if required
 * If not enough money the money returns the money and shows a message.
 * If cannot give exact change returns the money and shows a message.
 */
export class VendingMachine {
  // private _receivedMoney = Money.zero;

  constructor(
    private _cashier: Cashier,
    private _inventory: Inventory,
    private _screen: Screen
  ) {
    this.showState();
  }

  /**
   * Collects received amount into _receivedMoney
   * @param money is the new money the client added into the machine
   */
  public receiveMoney(money: Money): void {
    this._cashier.receiveMoney(money);
    this._showReceivedMoney();
  }

  /**
   * Validates if it's possible to sell a product located in productPosition.
   * Gives the product to the user if it's possible or shows a message if it's not possible
   * @param productPosition postion of the product the client wants to buy
   */
  public sell(productPosition: number): void {
    if (!this._canSellProduct(productPosition)) {
      this._showSellProductError(productPosition);
      this._cashier.returnAllReceivedMoney();
      return;
    }

    this._inventory.dispatchProduct(productPosition);

    const productPrice = this._inventory.productPositionPrice(productPosition);
    this._cashier.charge(productPrice);
  }

  /**
   * Prints in console current state of the VendingMachine
   */
  public showState(): void {
    this._screen.showMessage("***___***");
    this._screen.showMessage(JSON.stringify(this, null, 2));
    this._screen.showMessage("___***___");
  }

  private _canSellProduct(productPosition: number) {
    const canDispatchProductResult = this._inventory.canDispatchProduct(
      productPosition,
      this._cashier.totalReceived
    );

    if (canDispatchProductResult != CanDispatchProductResult.success) {
      return false;
    }

    const canReturnChange = this._cashier.canReturnChange(
      this._cashier.totalReceived -
        this._inventory.productPositionPrice(productPosition)
    );

    if (!canReturnChange) {
      return false;
    }

    return true;
  }

  private _showSellProductError(productPosition: number) {
    const canDispatchProductResult = this._inventory.canDispatchProduct(
      productPosition,
      this._cashier.totalReceived
    );

    if (canDispatchProductResult != CanDispatchProductResult.success) {
      this._showDispatchErrorMessage(canDispatchProductResult, productPosition);
      return;
    }

    const canReturnChange = this._cashier.canReturnChange(
      this._cashier.totalReceived -
        this._inventory.productPositionPrice(productPosition)
    );

    if (!canReturnChange) {
      this._showCannotReturnMessage();
    }
  }

  private _showReceivedMoney(): void {
    this._screen.showMessage(
      `Total received amount: ${this._cashier.totalReceived}`
    );
  }

  private _showCannotReturnMessage() {
    this._screen.showMessage(
      "Cannot return the exact amount of money after your purchase"
    );
  }

  private _showDispatchErrorMessage(
    canDispatchProductResult: CanDispatchProductResult,
    productPosition: number
  ) {
    switch (canDispatchProductResult) {
      case CanDispatchProductResult.illegalPosition:
        this._screen.showMessage(`${productPosition} is an invalid position`);
        break;
      case CanDispatchProductResult.notEnoughMoney:
        this._screen.showMessage(
          `You need to insert more money to reach the product price`
        );
        break;
      case CanDispatchProductResult.notEnoughProduct:
        this._screen.showMessage(
          `There's not enough ${JSON.stringify(
            this._inventory.productPositionName(productPosition)
          )} currently`
        );
        break;
    }
  }
}
