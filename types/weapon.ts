export interface IBaseWeapon {
  enkaId: string;
  name: string;
  icon: string;
  skillDepotId: string;
  type: string; // e.g., "Sword", "Bow", etc.
  stars: number; // e.g., 3, 4, 5 stars
}
