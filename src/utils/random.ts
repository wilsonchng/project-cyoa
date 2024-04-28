import { Sex } from "./constants";

export const getRandomInteger = (min: number, max: number): number => {
  // inclusive of BOTH min & max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomEnum = (myEnum: object): string => {
  const enumValues = Object.values(myEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

export const getRandomName = (sex: Sex = Sex.Male): string => {
  const firstNames = sex === Sex.Male ? maleFirstNames : femaleFirstNames;

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};

const maleFirstNames = [
  "Michael",
  "Chris",
  "Matthew",
  "Joshua",
  "Jacob",
  "Nicholas",
  "Andrew",
  "Daniel",
  "Tyler",
  "James",
];

const femaleFirstNames = [
  "Jessica",
  "Ashley",
  "Emily",
  "Sarah",
  "Samantha",
  "Amanda",
  "Brittany",
  "Elizabeth",
  "Taylor",
  "Megan",
];

const lastNames = [
  "Smith",
  "Brown",
  "Wilson",
  "Stewart",
  "Thomson",
  "Campbell",
  "Robertson",
  "Anderson",
  "Scott",
  "MacDonald",
  "Murray",
  "Reid",
  "Clark",
  "Young",
  "Ross",
  "Watson",
  "Morrison",
  "Mitchell",
  "Walker",
];
