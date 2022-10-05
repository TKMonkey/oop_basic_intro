import { IPerson } from "./abstraction";
import { Genre } from "./genre";

export class Person2 implements IPerson {
  protected _name: string;
  protected _genre: Genre;
  protected _hasKids: boolean;
  protected _wantsToHaveKids: boolean;

  protected _expectingKidOtherParent = "";

  constructor(
    name: string,
    genre: Genre,
    hasKids: boolean,
    wantsToHaveKids: boolean
  ) {
    this._name = name;
    this._genre = genre;
    this._hasKids = hasKids;
    this._wantsToHaveKids = wantsToHaveKids;
  }

  public get name(): string {
    return this._name;
  }

  public get genre(): Genre {
    return this._genre;
  }

  public get hasKids(): boolean {
    return this._hasKids;
  }

  public get wantsToHaveKids(): boolean {
    return this._wantsToHaveKids;
  }

  public listenToConvincingStoryToHaveKids(person: IPerson) {
    if (this._genre == person.genre) {
      this._wantsToHaveKids = false;
    } else {
      this._wantsToHaveKids = true;
    }
  }

  public async makeKid(person: IPerson): Promise<void> {
    if (this._genre == person.genre) {
      return;
    }

    if (!this._wantsToHaveKids || !person.wantsToHaveKids) {
      return;
    }

    if (this._expectingKidOtherParent != "") {
      return;
    }

    this._expectingKidOtherParent = person.name;
    await person.makeKid(this);
    this.receiveNotificationKidWasBorn(person);
  }

  public receiveNotificationKidWasBorn(otherParent: IPerson): void {
    if (this._expectingKidOtherParent !== otherParent.name) {
      console.log(
        `${this.name} cannot accept notification for kid from: ${otherParent.name}`
      );
      return;
    }
    this._hasKids = true;
    this._wantsToHaveKids = false;
    this._expectingKidOtherParent = "";
  }
}

export class Woman extends Person2 {
  private _isPregnant: boolean;

  constructor(
    name: string,
    hasKids: boolean,
    isPregnant: boolean,
    wantsToHaveKids: boolean
  ) {
    super(name, Genre.F, hasKids, wantsToHaveKids);
    this._isPregnant = isPregnant;
  }

  public get isPregnant(): boolean {
    return this._isPregnant;
  }

  public async makeKid(person: IPerson): Promise<void> {
    console.log(`${this.name} makeKid with: ${person.name}`);
    if (this._genre == person.genre) {
      return;
    }

    if (!this._wantsToHaveKids || !person.wantsToHaveKids) {
      return;
    }

    this._expectingKidOtherParent = person.name;
    this._isPregnant = true;

    return new Promise((resolve, _) => {
      setTimeout(async () => {
        this._isPregnant = false;
        this.receiveNotificationKidWasBorn(person);
        resolve();
      }, 3000);
    });
  }
}

export class Man extends Person2 {
  private _hasFoodLawSuit: boolean;

  constructor(
    name: string,
    hasKids: boolean,
    hasFoodLawSuit: boolean,
    wantsToHaveKids: boolean
  ) {
    super(name, Genre.M, hasKids, wantsToHaveKids);
    this._hasFoodLawSuit = hasFoodLawSuit;
  }

  public async makeKid(person: IPerson): Promise<void> {
    if (this._hasFoodLawSuit) {
      console.log(
        `${this.name} has an ongoing lawsuit. Will NOT make kid at all`
      );
      return;
    }

    console.log(`${this.name} has NO ongoing lawsuit. Will make kid`);
    return super.makeKid(person);
  }
}

function main() {
  const alberto = new Man("Alberto", false, true, false);
  const rogelio = new Man("Rogelio", false, false, false);
  const gertrudis = new Woman("Gertrudis", false, false, false);

  console.log("");
  console.log("");
  console.log(gertrudis);
  console.log(rogelio);
  console.log("");
  console.log("");
  rogelio.listenToConvincingStoryToHaveKids(gertrudis);
  gertrudis.listenToConvincingStoryToHaveKids(rogelio);

  rogelio.makeKid(gertrudis).then(() => {
    console.log("Gertrudis after 9 months YYY");
    console.log(JSON.stringify(gertrudis));
    console.log("Rogelio after 9 months YYY");
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
