import { IPerson } from "./abstraction";
import { Man, Person2, Woman } from "./inheritance";

const alberto = new Man("Alberto", false, true, false);
const rogelio = new Man("Rogelio", false, false, false);
const gertrudis = new Woman("Gertrudis", false, false, false);
const rebecca = new Woman("Rebecca", false, false, false);

/// I can initialize a Man array with a man
const men: Array<Man> = [alberto];
/// I can add a man to a Man array
men.push(rogelio);

/// I can NOT add a woman to a Man array
//men.push(gertrudis);

/// I can initialize a Man array with a man
const women: Array<Woman> = [gertrudis];
/// I can add a man to a Man array
women.push(rebecca);

/// I can NOT add a man to a Woman array
// women.push(alberto);

/// I can initialize an IPerson array with a woman and a man
const people: Array<IPerson> = [gertrudis, alberto];

/// I can add a man to an IPerson array
people.push(rogelio);
/// I can add a woman to an IPerson array
people.push(rebecca);

/// I can initialize a Person2 array with a woman and a man
const people2: Array<Person2> = [gertrudis, alberto];

/// I can add a man to a Person2 array
people2.push(rogelio);
/// I can add a woman to a Person2 array
people2.push(rebecca);
