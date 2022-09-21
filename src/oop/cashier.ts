import { Money } from "./money";

/**
 * Handles money related actions such as returning change and receiving money
 */
export class Cashier {
  constructor(private _money: Money, private _receivedMoney: Money) {}

  /**
   * Current amount of money the cashier is handling
   */
  public get total(): number {
    return this._money.total;
  }

  /**
   * Current amount of money the cashier has received for on-going sale
   */
  public get totalReceived(): number {
    return this._receivedMoney.total;
  }

  /**
   * Adds into {money} into received money for current on-going sale
   * @param money New bill the client has given to the cashier
   */
  public receiveMoney(money: Money): void {
    this._receivedMoney = this._receivedMoney.add(money);
  }

  /**
   * Returns all received money for on-going sale to client
   */
  public returnAllReceivedMoney(): void {
    console.log("Will return all received money");
    this._receivedMoney = Money.zero;
  }

  /**
   * Evaluates if can fulfill required amount with current money
   * @param amount The amount of money required to be charged
   * @returns true if {amount} can be fulfilled, false otherwise
   */
  public canReturnChange(amount: number): boolean {
    return this._money.canFulfill(amount);
  }

  /**
   * Executes a transaction, charging the received amount from the receivedMoney and giving change if needed.
   * Will throw Exception if cannot fulfill money to return.
   * Please make sure to call canReturnChange before calling charge
   * @param amountToCharge Total price to be charged
   */
  public charge(amountToCharge: number): void {
    const moneyToReturn = this._calculateMoneyToReturn(amountToCharge);
    this._returnChange(moneyToReturn);
    this._updateMoney(moneyToReturn);
  }

  private _calculateMoneyToReturn(amount: number): Money {
    const amountToReturn = this._receivedMoney.total - amount;

    return this._money.fulfill(amountToReturn);
  }

  private _updateMoney(moneyToReturn: Money) {
    this._money = this._money.add(this._receivedMoney).subtract(moneyToReturn);
    this._receivedMoney = Money.zero;
  }

  private _returnChange(moneyToReturn: Money) {
    console.log(
      `Must return ${JSON.stringify(moneyToReturn, null, 2)} as change`
    );
  }
}
