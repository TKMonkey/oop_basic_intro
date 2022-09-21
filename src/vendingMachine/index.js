import { receiveMoney, sell, showState } from "./vendingMachineUtils.js";

const vendingMachine = {
  inventory: [
    { product: { name: "Tosh", price: 11 }, amount: 3 },
    {
      product: {
        name: "Chocolatina Jet",
        price: 3,
      },
      amount: 2,
    },
  ],
  money: {
    oneDollarBills: 15,
    twoDollarsBills: 8,
  },
  receivedMoney: {
    oneDollarBills: 0,
    twoDollarsBills: 0,
  },
};

const oneDollar = {
  oneDollarBills: 1,
  twoDollarsBills: 0,
};

const twoDollars = {
  oneDollarBills: 0,
  twoDollarsBills: 1,
};

// receiveMoney(vendingMachine, oneDollar);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// sell(vendingMachine, 1);

// showState(vendingMachine);

// receiveMoney(vendingMachine, oneDollar);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// sell(vendingMachine, 1);

// showState(vendingMachine);

// receiveMoney(vendingMachine, oneDollar);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// sell(vendingMachine, 1);

// showState(vendingMachine);

// receiveMoney(vendingMachine, oneDollar);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// sell(vendingMachine, 0);

// showState(vendingMachine);

// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// receiveMoney(vendingMachine, twoDollars);
// sell(vendingMachine, 0);

// showState(vendingMachine);

// vendingMachine.receivedMoney = { oneDollarBills: 8, twoDollarsBills: 8 };
// sell(vendingMachine, 0);

// showState(vendingMachine);

// vendingMachine.inventory = [];
// showState(vendingMachine);
