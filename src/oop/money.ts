/**
 * Models money in different bills
 * It's a ValueObject class. Meaning all their fields are readonly.
 *
 */
export class Money {
  constructor(
    private readonly _oneDollarBills: number,
    private readonly _twoDollarsBills: number
  ) {}

  /**
   * Represents no money
   */
  static zero = new Money(0, 0);
  /**
   * A single dollar bill
   */
  static oneDollar = new Money(1, 0);
  /**
   * A single two-dollars bill
   */
  static twoDollars = new Money(0, 1);

  /**
   * Returns the total amount of money that's being represented by this object
   */
  public get total(): number {
    return this._oneDollarBills + this._twoDollarsBills * 2;
  }

  /**
   * Calculates the money after adding current money with received {money}
   * @param money Money to be added to current money
   * @returns the money obtained after adding current money with received {money}
   */
  public add(money: Money): Money {
    return new Money(
      this._oneDollarBills + money._oneDollarBills,
      this._twoDollarsBills + money._twoDollarsBills
    );
  }

  /**
   * Calculates the money after subtracting current money with received {money}
   * @param money Money to be subtracted from current moneey
   * @returns the money obtained after subtracting received money from current money
   */
  public subtract(money: Money): Money {
    return new Money(
      this._oneDollarBills - money._oneDollarBills,
      this._twoDollarsBills - money._twoDollarsBills
    );
  }

  /**
   * Validates if an amount can be fulfillet with current money
   * @param amount The amount to be fuitilled
   * @returns true if amount can be fulfilled with current money, false otherwise
   */
  public canFulfill(amount: number): boolean {
    if (amount > this.total) {
      return false;
    }

    try {
      this.fulfill(amount);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Tries to fulfill received amount of money with current money
   * @param amount Amount of money to be fulfilled with current money
   * @returns A Money object with the exact received amount.
   * Throws an Error if amount cannot be fulfilled with current moneey
   */
  public fulfill(amount: number): Money {
    const twoDollarsBillsAmount = Math.min(
      Math.floor(amount / 2),
      this._twoDollarsBills
    );
    const rest = amount - twoDollarsBillsAmount * 2;

    if (
      twoDollarsBillsAmount > this._twoDollarsBills ||
      rest > this._oneDollarBills
    ) {
      throw Error(`Cannot fulfill amount: ${amount}`);
    }

    return new Money(rest, twoDollarsBillsAmount);
  }
}
