const MangoSkins = {
  Green: "green",
  None: null,
  Red: "red",
  Yellow: "yellow",
};

const MangoPulps = {
  Average: "average",
  Generous: "generous",
  Meager: "meager",
  None: null,
};

const MangoSeedSize = {
  Average: "average",
  Large: "large",
  None: null,
  Small: "small",
};

const mango1 = {
  pulp: MangoPulps.Generous,
  seed: MangoSeedSize.Small,
  skin: MangoSkins.Red,
};

const mango2 = {
  pulp: MangoPulps.Average,
  seed: MangoSeedSize.Large,
  skin: MangoSkins.Green,
};

function peelMango(mango) {
  mango.skin = MangoSkins.None;
}

function eatMango(mango) {
  peelMango(mango);
  mango.pulp = MangoPulps.None;
  mango.seed = MangoSeedSize.None;
}

function throwMango(mango, personName) {
  // eslint-disable-next-line no-undef
  console.log(`Hit ${personName} in the head with: ${mango}`);
}
// eslint-disable-next-line no-undef
console.log(`Original Mango:\n${JSON.stringify(mango1)}`);

peelMango(mango1);
// eslint-disable-next-line no-undef
console.log(mango1);

eatMango(mango1);

// eslint-disable-next-line no-undef
console.log(mango1);

throwMango(mango2, "James");
