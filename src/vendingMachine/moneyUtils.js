export function addMoney(money, moneyToAdd) {
  return {
    oneDollarBills: money.oneDollarBills + moneyToAdd.oneDollarBills,
    twoDollarsBills: money.twoDollarsBills + moneyToAdd.twoDollarsBills,
  };
}

export function subtractMoney(money, moneyToSubtract) {
  return {
    oneDollarBills: money.oneDollarBills - moneyToSubtract.oneDollarBills,
    twoDollarsBills: money.twoDollarsBills - moneyToSubtract.twoDollarsBills,
  };
}

export function moneyAmount(money) {
  return money.oneDollarBills + money.twoDollarsBills * 2;
}

export function isEnough(money, amount) {
  return moneyAmount(money) >= amount;
}

export function canFulfill(money, amount) {
  if (money.amount < amount) {
    return false;
  }

  try {
    fulfill(money, amount);
    return true;
  } catch (_) {
    return false;
  }
}

export function fulfill(money, amount) {
  const twoDollarsBillsAmount = Math.min(
    Math.floor(amount / 2),
    money.twoDollarsBills
  );
  const rest = amount - twoDollarsBillsAmount * 2;

  if (
    twoDollarsBillsAmount > money.twoDollarsBills ||
    rest > money.oneDollarBills
  ) {
    throw Error(`Cannot fulfill amount: ${amount}`);
  }

  return { oneDollarBills: rest, twoDollarsBills: twoDollarsBillsAmount };
}
