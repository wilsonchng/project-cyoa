import { Hobby, Occupation } from "./constants";
import {
  faFireExtinguisher,
  faHandcuffs,
  faStethoscope,
  faHammer,
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
import { Skills } from "./types";

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

export const getSkillDescription = (skill: string) => {
  const lowerCase = skill.toLowerCase();

  switch (lowerCase) {
    case "strength":
      return "+5% MELEE damage, +5% chance to SHOVE per level";
    case "fitness":
      return "+10% STAMINA per level";
    case "stealth":
      return "+10% chance to SNEAK per level";
    case "medicine":
      return "+25% HEALING per level";
    case "firearms":
      return "+10% damage with GUNS per level";
    case "axes":
      return "+10% damage with AXES per level";
    case "blades":
      return "+10% damage with BLADES per level";
    case "bludgeon":
      return "+10% damage with BLUNT WEAPONS per level";
    default:
      return "";
  }
};
