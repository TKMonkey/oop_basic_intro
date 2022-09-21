export class Person {
  private name: string;
  private headPerimeter: number;
  private eyesColor: EyeColor;
  private heigth: number;
  private weight: number;

  constructor(
    name: string,
    headPerimeter: number,
    eyesColor: EyeColor,
    height: number,
    weight: number
  ) {
    this.name = name;
    this.headPerimeter = headPerimeter;
    this.eyesColor = eyesColor;
    this.heigth = height;
    this.weight = weight;
  }

  public get currentWeight() {
    return this.weight;
  }

  public run(minutes: number) {
    const weightLossInGrams = minutes * 3;
    const weightLossInKg = weightLossInGrams / 1000;

    this.weight = this.weight - weightLossInKg;
  }

  public eat(eatenWeightInGrams: number) {
    const eatenWeightInKg = eatenWeightInGrams / 1000;
    this.weight = this.weight + eatenWeightInKg;
  }

  public listenToJoke(joke: string) {
    if (joke == "funny") {
      this.laugh();
    } else if (joke == "disgusting") {
      this.yellFuriously();
    } else if (joke == "bad") {
      this.hitJoker();
    }
  }

  private laugh() {
    console.log(`${this.name} => LOL`);
  }

  private yellFuriously() {
    console.log(`${this.name} => WTF, dude!`);
  }

  private hitJoker() {
    console.log(`${this.name} => Joker has been hit successfully`);
  }
}

export enum EyeColor {
  Blue = "blue",
  Brown = "brown",
  Green = "green",
  White = "white",
}
