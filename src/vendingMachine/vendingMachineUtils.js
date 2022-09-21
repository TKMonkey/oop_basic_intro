import {
  addMoney,
  canFulfill,
  fulfill,
  isEnough,
  moneyAmount,
  subtractMoney,
} from "./moneyUtils.js";

export function receiveMoney(vendingMachine, money) {
  vendingMachine.receivedMoney = addMoney(vendingMachine.receivedMoney, money);
  // eslint-disable-next-line no-undef
  console.log(`Received: ${JSON.stringify(money)}`);
}

export function isEnoughMoney(vendingMachine, price) {
  return isEnough(vendingMachine.receivedMoney, price);
}

export function hasProduct(vendingMachine, productPosition) {
  return vendingMachine.inventory[productPosition].amount > 0;
}

export function sell(vendingMachine, productPosition) {
  if (!canSell(vendingMachine, productPosition)) {
    // eslint-disable-next-line no-undef
    console.log("Currently cannot sell the product");
    returnAllMoney(vendingMachine);
    return;
  }

  vendingMachine.inventory[productPosition].amount =
    vendingMachine.inventory[productPosition].amount - 1;

  const price = vendingMachine.inventory[productPosition].product.price;

  const amountOfMoneyToReturn =
    moneyAmount(vendingMachine.receivedMoney) - price;
  const moneyToReturn = fulfill(vendingMachine.money, amountOfMoneyToReturn);

  let newMoney = addMoney(vendingMachine.money, vendingMachine.receivedMoney);
  newMoney = subtractMoney(newMoney, moneyToReturn);

  vendingMachine.money = newMoney;
  vendingMachine.receivedMoney = {
    oneDollarBills: 0,
    twoDollarsBills: 0,
  };

  // eslint-disable-next-line no-undef
  console.log("Will return", moneyToReturn);
}

export function showState(vendingMachine) {
  // eslint-disable-next-line no-undef
  console.log("***___***");
  // eslint-disable-next-line no-undef
  console.log(JSON.stringify(vendingMachine, null, 2));
  // eslint-disable-next-line no-undef
  console.log("---***---");
}

function canSell(vendingMachine, productPosition) {
  const price = vendingMachine.inventory[productPosition].product.price;

  if (!isEnoughMoney(vendingMachine, price)) {
    // eslint-disable-next-line no-undef
    console.log("Not enough money");
    return false;
  }

  if (!hasProduct(vendingMachine, productPosition)) {
    // eslint-disable-next-line no-undef
    console.log("Has no product");
    return false;
  }

  const changeToReturn = moneyAmount(vendingMachine.receivedMoney) - price;

  if (!canReturnChange(vendingMachine, changeToReturn)) {
    // eslint-disable-next-line no-undef
    console.log("Ccannot return change");
    return false;
  }

  return true;
}

function canReturnChange(vendingMachine, changeToReturn) {
  return canFulfill(vendingMachine.money, changeToReturn);
}

function returnAllMoney(vendingMachine) {
  // eslint-disable-next-line no-undef
  console.log("Will return all received money");
  vendingMachine.receivedMoney = {
    oneDollarBills: 0,
    twoDollarsBills: 0,
  };
}
