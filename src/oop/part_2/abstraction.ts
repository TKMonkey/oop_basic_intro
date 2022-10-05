import { Genre } from "./genre";

export interface IPerson {
  name: string;
  genre: Genre;
  hasKids: boolean;
  wantsToHaveKids: boolean;
  makeKid(person: IPerson): Promise<void>;
  listenToConvincingStoryToHaveKids(person: IPerson): void;
  receiveNotificationKidWasBorn(otherParent: IPerson): void;
}

class Alien {
  public interactWithPerson(person: IPerson) {
    console.log("Interacting with Person:");
    console.log(`Name: ${person.name}`);
    console.log(`Genre: ${person.genre}`);
    console.log(`Has Kids?: ${person.hasKids}`);
    console.log(`Wants to have Kids?: ${person.wantsToHaveKids}`);
    // console.log(`Can call convinceToHaveKids?: ${person.convinceToHaveKids}`);
    // console.log(`Can call make kid?: ${person.makeKid}`);
  }
}

function main() {
  const person: IPerson = {
    name: "Alberto",
    genre: Genre.F,
    hasKids: false,
    wantsToHaveKids: false,
    makeKid: async function (person: IPerson): Promise<void> {
      console.log("WIll make kid");
    },
    listenToConvincingStoryToHaveKids: function (person: IPerson): void {
      console.log("Convinced to have kid");
    },
    receiveNotificationKidWasBorn: function (otherParent: IPerson): void {
      console.log(`Notified that a kid was born from: ${otherParent}`);
    },
  };
  const alien = new Alien();
  alien.interactWithPerson(person);

  // Alien can interact with an IPerson no matter how are methods and fields going to be implemented
  // Here we're amplifying WHAT's a person (In this dummy example) minimizing its details (How things are implemented).
  // Those details are irrelevant at this level

  // We only need to know the 'WHAT' instead of the 'HOW'
}
