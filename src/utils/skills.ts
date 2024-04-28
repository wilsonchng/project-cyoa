import { Hobby, Hunger, Occupation } from "./constants";
import {
  faFireExtinguisher,
  faHandcuffs,
  faStethoscope,
  faBaseballBatBall,
  faTree,
  faKitMedical,
  faRunning,
  faGun,
  faDumbbell,
  faMedal,
  IconDefinition,
  faTriangleExclamation,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_WEIGHT } from "./enemy";

export interface Skills {
  Strength: number;
  Fitness: number;
  Stealth: number;
  Medicine: number;
  Firearms: number;
  Axes: number;
  Blades: number;
  Bludgeon: number;
}

const hungerModifier = (hunger: Hunger, skill: "fitness" | "strength") => {
  const modifer = skill === "fitness" ? 2 : 1;
  switch (hunger) {
    case Hunger.Full:
      return 5 * modifer;
    case Hunger.Hungry:
      return -5 * modifer;
    case Hunger.Starving:
      return -10 * modifer;
    default:
      return 0;
  }
};

export const shoveEnemy = (
  challengeRating: number = DEFAULT_WEIGHT,
  strength: number,
  hunger: Hunger
) => {
  const rolled = Math.random() * 100;
  const strBonus = strength * getSkillBonus("strength");
  const hungerMod = hungerModifier(hunger, "strength");
  const finalValue = rolled + strBonus + hungerMod;

  return finalValue > challengeRating;
};

export const getMaxStamina = (fitness: number, hunger: Hunger) =>
  100 + fitness * getSkillBonus("fitness") + hungerModifier(hunger, "fitness");

export const getOccupationIcon = (
  occupation: Occupation | string
): IconDefinition => {
  switch (occupation) {
    case Occupation.Firefighter:
      return faFireExtinguisher;
    case Occupation.Police:
      return faHandcuffs;
    case Occupation.Doctor:
      return faStethoscope;
    case Occupation.Lumberjack:
      return faTree;
    case Occupation.Burglar:
      return faFingerprint;
    default:
      return faTriangleExclamation;
  }
};

export const getHobbyIcon = (hobby: Hobby | string): IconDefinition => {
  switch (hobby) {
    case Hobby.FirstAid:
      return faKitMedical;
    case Hobby.Gymnast:
      return faMedal;
    case Hobby.Runner:
      return faRunning;
    case Hobby.Shooter:
      return faGun;
    case Hobby.Weightlifter:
      return faDumbbell;
    case Hobby.Baseball:
      return faBaseballBatBall;
    default:
      return faTriangleExclamation;
  }
};

export const getSkills = (occupation: Occupation, hobby: Hobby): Skills => {
  const BASE_SKILLS: Skills = {
    Strength: 0,
    Fitness: 0,
    Stealth: 0,
    Medicine: 0,
    Firearms: 0,
    Axes: 0,
    Blades: 0,
    Bludgeon: 0,
  };

  return mergeObjects(
    BASE_SKILLS,
    getOccupationSkills(occupation),
    getHobbySkills(hobby)
  );
};

const mergeObjects = (...objs: any) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? (acc[k] += obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );

export const getHobbySkills = (hobby: Hobby): Partial<Skills> => {
  switch (hobby) {
    case Hobby.Baseball:
      return {
        Bludgeon: 1,
      };
    case Hobby.FirstAid:
      return {
        Medicine: 1,
      };
    case Hobby.Gymnast:
      return {
        Stealth: 1,
      };
    case Hobby.Runner:
      return {
        Fitness: 1,
      };
    case Hobby.Shooter:
      return {
        Firearms: 1,
      };
    case Hobby.Weightlifter:
      return {
        Strength: 1,
      };
    default:
      return {};
  }
};

export const getOccupationSkills = (
  occupation: Occupation
): Partial<Skills> => {
  switch (occupation) {
    case Occupation.Firefighter:
      return {
        Strength: 1,
        Fitness: 1,
        Axes: 1,
      };
    case Occupation.Police:
      return {
        Firearms: 3,
      };
    case Occupation.Doctor:
      return {
        Medicine: 3,
        Blades: 1,
      };
    case Occupation.Lumberjack:
      return {
        Strength: 1,
        Axes: 2,
      };
    case Occupation.Burglar:
      return {
        Stealth: 3,
      };
    default:
      return {};
  }
};

export const getSkillDescription = (skill: string): string => {
  const lowerCase = skill.toLowerCase();
  const bonus = getSkillBonus(lowerCase);

  switch (lowerCase) {
    case "strength":
      return `+${bonus}% MELEE damage, +${bonus}% chance to SHOVE per level`;
    case "fitness":
      return `+${bonus} MAX STAMINA per level`;
    case "stealth":
      return `+${bonus}% chance to SNEAK/HIDE per level`;
    case "medicine":
      return `+${bonus}% HEALING per level`;
    case "firearms":
      return `+${bonus}% damage with FIREARMS per level`;
    case "axes":
      return `+${bonus}% damage with AXES per level`;
    case "blades":
      return `+${bonus}% damage with BLADE WEAPONS per level`;
    case "bludgeon":
      return `+${bonus}% damage with BLUNT WEAPONS per level`;
    default:
      return "";
  }
};

export const getSkillBonus = (skill: string): number => {
  const lowerCase = skill.toLowerCase();

  switch (lowerCase) {
    case "strength":
      return 5;
    case "fitness":
    case "stealth":
    case "firearms":
    case "axes":
    case "blades":
    case "bludgeon":
      return 10;
    case "medicine":
      return 25;
    default:
      return 0;
  }
};
