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
  subStats: string[];
  talentPriority: {
    normalAttack: number;
    elementalSkill: number;
    elementalBurst: number;
  };
  notes?: string;
  statNotes?: string;
  talentNotes?: string;
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
