export interface ICharacterBuildInput {
  buildName: string
  characterId: string
  lastUpdate: string
  weapons: {
    weaponId: string
    weaponName: string
    weaponIcon: string
    refinement: number | null
    rank: number
  }[]
  artifacts: {
    mainArtifactSetId: string
    isFullSet: boolean
    secondaryArtifactSetId?: string // For 2pc+2pc combinations
    alternativeSets?: {
      mainArtifactSetId: string
      isFullSet: boolean
      secondaryArtifactSetId?: string
      rank: number
    }[]
    rank: number
  }[]
  mainStats: {
    sands: string[]
    goblet: string[]
    circlet: string[]
    notes?: string
  }
  subStats: {
    stats: string[]
    notes?: string
  }
  talentPriority: {
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
    notes?: string
  }
  notes?: string
}
