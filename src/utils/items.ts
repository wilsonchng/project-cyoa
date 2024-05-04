export interface Item {
  id: ItemID;
  name: string;
  type: ItemType;
  description?: string;
  attack?: string;
  weaponClass?: WeaponClass;
  minDmg?: number;
  maxDmg?: number;
  weight?: number;
  durability?: number;
}

export enum WeaponClass {
  Axe,
  Blade,
  Blunt,
  Firearm,
}

export enum ItemType {
  Weapon,
  Tool,
  Medicine,
  Misc,
}

export enum ItemID {
  Unarmed,
  KitchenKnife,
  FryingPan,
  BroomStick,
}

export const DIFFICULTY_MODIFIER = 1; // for future easy/hard modes

export const getItem = (id: ItemID) => ITEMS.find((i) => i.id === id);

export const UNARMED: Item = {
  id: ItemID.Unarmed,
  name: "Bare Fists",
  description: "your fists",
  type: ItemType.Weapon,
  weaponClass: WeaponClass.Blunt,
  attack: "You throw a punch at your enemy",
  minDmg: 10,
  maxDmg: 20,
  weight: 2,
  durability: 999,
};

const ITEMS: Item[] = [
  {
    id: ItemID.KitchenKnife,
    name: "Kitchen Knife",
    description: "A stainless steel chef's knife",
    type: ItemType.Weapon,
    weaponClass: WeaponClass.Blade,
    attack: "You thrust the blade of your knife at your enemy",
    minDmg: 10,
    maxDmg: 40,
    weight: 4,
    durability: 8,
  },
  {
    id: ItemID.FryingPan,
    name: "Frying Pan",
    description: "A heavy cast iron pan",
    type: ItemType.Weapon,
    weaponClass: WeaponClass.Blunt,
    attack: "You swing the heavy pan at your enemy",
    minDmg: 20,
    maxDmg: 30,
    weight: 8,
    durability: 20,
  },
  {
    id: ItemID.BroomStick,
    name: "Broom Stick",
    description: "A long stick of plywood",
    type: ItemType.Weapon,
    weaponClass: WeaponClass.Blunt,
    attack: "You swing the long wooden pole at your enemy",
    minDmg: 20,
    maxDmg: 30,
    weight: 6,
    durability: 4,
  },
];
