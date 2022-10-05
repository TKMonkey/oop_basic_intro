import { Genre } from "./genre";

export class Person {
  private _name: string;
  private _genre: Genre;
  private _hasKids: boolean;
  private _wantsToHaveKids: boolean;

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
    return this.name;
  }

  public get hasKids(): boolean {
    return this.hasKids;
  }

  public listenToConvincingStoreToHaveKids(person: Person) {
    if (this._genre == person._genre) {
      this._wantsToHaveKids = false;
    } else {
      this._wantsToHaveKids = true;
    }
  }

  public makeKid(person: Person) {
    if (this._genre == person._genre) {
      return;
    }

    if (!this._wantsToHaveKids || !person._wantsToHaveKids) {
      return;
    }

    this._hasKids = true;
    this._wantsToHaveKids = false;
    person._finishMakingKid();
  }

  private _finishMakingKid() {
    this._hasKids = true;
    this._wantsToHaveKids = false;
  }
}

function main() {
  const alberto = new Person("Alberto", Genre.M, false, false);
  const rogelio = new Person("Rogelio", Genre.M, false, false);
  const gertrudis = new Person("Gertrudis", Genre.F, false, false);

  // Rogelio cannot convince Alberto to have kids because they are of the same genre
  console.log();
  console.log();
  console.log(
    "Rogelio cannot convince Alberto to have kids because they are of the same genre"
  );
  alberto.listenToConvincingStoreToHaveKids(rogelio);
  console.log(JSON.stringify(alberto));
  console.log();
  console.log();

  // Gertrudis convinces Rogelio to have kids
  console.log("Gertrudis convinces Rogelio to have kids");
  rogelio.listenToConvincingStoreToHaveKids(gertrudis);
  console.log(JSON.stringify(rogelio));
  console.log();
  console.log();

  // Cannot make kids because Gertrudis does not want to
  rogelio.makeKid(gertrudis);
  console.log("Cannot make kids because Gertrudis does not want to");
  console.log(JSON.stringify(rogelio));
  console.log(JSON.stringify(gertrudis));
  console.log();
  console.log();

  /// Rogelio convinces Gertrudis to have kids
  console.log("Rogelio convinces Gertrudis to have kids");
  gertrudis.listenToConvincingStoreToHaveKids(rogelio);
  console.log(JSON.stringify(gertrudis));
  console.log();
  console.log();

  /// Rogelio and Gertrudis have a kid
  console.log("Rogelio and Gertrudis have a kid");
  rogelio.makeKid(gertrudis);
  console.log(JSON.stringify(gertrudis));
  console.log(JSON.stringify(rogelio));
  console.log();
  console.log();

  // Cannot have kids because neither wants to have kids
  console.log("Cannot have kids because neither want to have kids");
  rogelio.makeKid(gertrudis);
  console.log(JSON.stringify(rogelio));
  console.log(JSON.stringify(gertrudis));
  console.log();
  console.log();

  /// State is changed by each person according to who is interacting with them
}
