import { EnemyStatus } from "./constants";

export interface Enemy {
  name: string;
  maxHealth: number;
  health: number;
  abilities: EnemyAbility[];
  status?: EnemyStatus[];
}

export interface EnemyAbility {
  name: string;
  damage: number;
  effect?: any;
}
