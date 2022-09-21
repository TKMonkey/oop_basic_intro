import { Cashier } from "./oop/cashier";
import { Inventory } from "./oop/inventory";
import { Money } from "./oop/money";
import { Product } from "./oop/product";
import { InventoryProduct } from "./oop/productInventory";
import { Screen } from "./oop/screen";
import { VendingMachine } from "./oop/vendingMachine";

const cookies = new Product("Tosh", 11);
const chocolate = new Product("Chocolatina Jet", 3);

const cookiesInventory = new InventoryProduct(cookies, 3);
const chocolateInventory = new InventoryProduct(chocolate, 2);

const money = new Money(15, 8);
const cashier = new Cashier(money, Money.zero);
const inventory = new Inventory([cookiesInventory, chocolateInventory]);

const screen = new Screen();

const vendingMachine = new VendingMachine(cashier, inventory, screen);

// vendingMachine.receiveMoney(Money.oneDollar);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.sell(1);

// console.log(vendingMachine.showState());

// vendingMachine.receiveMoney(Money.oneDollar);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.sell(1);

// console.log(vendingMachine.showState());

// vendingMachine.receiveMoney(Money.oneDollar);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.sell(1);

// console.log(vendingMachine.showState());

// vendingMachine.receiveMoney(Money.oneDollar);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.sell(0);

// console.log(vendingMachine.showState());

// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.receiveMoney(Money.twoDollars);
// vendingMachine.sell(0);

// console.log(vendingMachine.showState());
