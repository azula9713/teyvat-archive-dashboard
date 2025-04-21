export interface ICharacterBuildInput {
  authorId: string;
  characterId: string;
  buildName: string;
  lastUpdatedPatch: string;
  mainStats: {
    sands: string[];
    goblet: string[];
    circlet: string[];
  };
  subStats: {
    stats: string[];
  };
  talentPriority: {
    normalAttack: number;
    elementalSkill: number;
    elementalBurst: number;
  };
  notes?: string;
  weapons: {
    weaponId: string;
    weaponRank: number;
    weaponRefinement: number | null;
  }[];
  artifacts: {
    rank: number;
    artifactSets: {
      setId: string;
      piecesCount: number;
    }[];
  }[];
}
