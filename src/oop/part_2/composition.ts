import { assert } from "console";
import { IPerson } from "./abstraction";
import { Genre } from "./genre";
import { Man, Person2 } from "./inheritance";

class CompositeWoman implements IPerson {
  constructor(private _person: Person2, private _isPregnant: boolean) {
    /// Make sure a Composite woman is not built by receiving a man
    assert(_person.genre === Genre.F);
  }

  public get name(): string {
    return this._person.name;
  }

  public get genre(): Genre {
    return this._person.genre;
  }

  public get hasKids(): boolean {
    return this._person.hasKids;
  }

  public get wantsToHaveKids(): boolean {
    return this._person.wantsToHaveKids;
  }

  public get isPregnant(): boolean {
    return this._isPregnant;
  }

  public async makeKid(person: IPerson): Promise<void> {
    if (this.genre == person.genre) {
      return;
    }

    if (!this.wantsToHaveKids || !person.wantsToHaveKids) {
      return;
    }

    if (this._isPregnant) {
      return;
    }

    this._isPregnant = true;
    this._person.makeKid(person);

    return new Promise((resolve, _) => {
      setTimeout(async () => {
        this._isPregnant = false;
        resolve();
      }, 3000);
    });
  }

  listenToConvincingStoryToHaveKids(person: IPerson): void {
    this._person.listenToConvincingStoryToHaveKids(person);
  }

  receiveNotificationKidWasBorn(otherParent: IPerson): void {
    this._person.receiveNotificationKidWasBorn(otherParent);
  }
}

function main() {
  const alberto = new Man("Alberto", false, true, false);
  const rogelio = new Man("Rogelio", false, false, false);

  /// We need to change the way a CompositeWoman is built
  const gertrudisPerson = new Person2("Gertrudis", Genre.F, false, false);
  const gertrudis = new CompositeWoman(gertrudisPerson, false);

  console.log("");
  console.log("");
  console.log(gertrudis);
  console.log(rogelio);
  console.log("");
  console.log("");
  rogelio.listenToConvincingStoryToHaveKids(gertrudis);
  gertrudis.listenToConvincingStoryToHaveKids(rogelio);

  rogelio.makeKid(gertrudis).then(() => {
    console.log("Gertrudis after 9 monthsXX");
    console.log(JSON.stringify(gertrudis));
    console.log("Rogelio after 9 monthsXX");
    console.log(JSON.stringify(rogelio));
  });

  console.log("Gertrudis after making kid");
  console.log(JSON.stringify(gertrudis));
  console.log("Rogelio after making kid");
  console.log(JSON.stringify(rogelio));

  console.log();
  console.log();
  console.log(
    "Gertrudis tries to notify Alberto that HE's going to have a kid"
  );
  alberto.receiveNotificationKidWasBorn(gertrudis);

  // Alberto cannot make a kid because he has an ongoing lawsuit
  console.log();
  console.log();
  console.log("Alberto cannot make a kid because he has an ongoing lawsuit");
  alberto.makeKid(gertrudis);
  console.log();
  console.log();

  /// As you can see, rogelio, gertrudis and alberto have access to parent class methods and can override those methods as well
}
