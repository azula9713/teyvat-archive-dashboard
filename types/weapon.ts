export interface IBaseWeapon {
  enkaId: string;
  name: string;
  iconUrl: string;
  skillDepotId: string;
  type: string; // e.g., "Sword", "Bow", etc.
  rarity: number; // e.g., 3, 4, 5 stars
}
