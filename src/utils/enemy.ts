import { PlayerStatus } from "./constants";

export interface Enemy {
  id: EnemyID;
  name: string;
  description: string;
  health: number;
  maxHealth: number;
  weight: number;
  abilities: EnemyAbility[];
  death: string;
  status?: EnemyStatus[];
}

export interface EnemyAbility {
  name: string;
  damage: number;
  description: string;
  effect?: PlayerStatus;
}

export enum EnemyStatus {
  Prone,
  Staggered,
}

export enum EnemyID {
  Frank,
}

export const DEFAULT_WEIGHT = 50;

export const getEnemy = (id: EnemyID) => ENEMIES.find((e) => e.id === id);

const ENEMIES: Enemy[] = [
  {
    id: EnemyID.Frank,
    name: "Frank",
    description:
      "Your once-friendly neighbour, now transformed into something else entirely",
    death: "Frank collapses into a bloodied heap on the floor",
    health: 80,
    maxHealth: 80,
    weight: DEFAULT_WEIGHT,
    abilities: [
      {
        name: "Swipe",
        description:
          "Frank swipes at you with claw-like hands, scratching and breaking your skin!",
        damage: 5,
        effect: PlayerStatus.Bleeding,
      },
      {
        name: "Grab",
        description:
          "Frank gets a hold of you with a vice-like grip, and leans in opening his mouth...",
        damage: 0,
        effect: PlayerStatus.Grabbed,
      },
    ],
  },
];

// enemy types: hazmat, armoured, mauler (blunt), witch, scorched
