export enum EElement {
  Pyro = "Pyro",
  Hydro = "Hydro",
  Anemo = "Anemo",
  Electro = "Electro",
  Dendro = "Dendro",
  Cryo = "Cryo",
  Geo = "Geo",
}

export interface IBaseCharacter {
  enkaId: string;
  name: string;
  iconUrl: string;
  skillDepotId: string;
  element: EElement;
  isTraveler: boolean;
}

export interface ICharacter extends IBaseCharacter {
  uniqueId: string;
}
