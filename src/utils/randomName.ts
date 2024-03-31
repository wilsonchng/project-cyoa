import { Gender } from "./constants";

export const getRandomName = (gender: Gender = Gender.Male) => {
  const firstNames = gender === Gender.Male ? maleFirstNames : femaleFirstNames;

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
