import { ICharacterBuildInput } from "@/types/build";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const emptyBuild: ICharacterBuildInput = {
  authorId: "",
  characterId: "",
  buildName: "",
  lastUpdatedPatch: "",
  mainStats: {
    sands: [],
    goblet: [],
    circlet: [],
  },
  subStats: {
    stats: [],
  },
  talentPriority: {
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  },
  notes: "",
  weapons: [],
  artifacts: [],
};

export const buildAtom = atomWithStorage("characterBuild", emptyBuild);

// Read functions
export const authorIdAtom = atom((get) => get(buildAtom).authorId);
export const characterIdAtom = atom((get) => get(buildAtom).characterId);
export const buildNameAtom = atom((get) => get(buildAtom).buildName);
export const lastUpdatedPatch = atom((get) => get(buildAtom).lastUpdatedPatch);
export const mainStatsAtom = atom((get) => get(buildAtom).mainStats);
export const subStatsAtom = atom((get) => get(buildAtom).subStats);
export const talentPriorityAtom = atom((get) => get(buildAtom).talentPriority);
export const notesAtom = atom((get) => get(buildAtom).notes);
export const weaponsAtom = atom((get) => get(buildAtom).weapons);
export const artifactsAtom = atom((get) => get(buildAtom).artifacts);

// Write functions
export const updateAuthorIdAtom = atom(null, (get, set, authorId: string) => {
  set(buildAtom, {
    ...get(buildAtom),
    authorId,
  });
});

export const updateCharacterIdAtom = atom(
  null,
  (get, set, characterId: string) => {
    set(buildAtom, {
      ...get(buildAtom),
      characterId,
    });
  }
);

export const updateBuildNameAtom = atom(null, (get, set, buildName: string) => {
  set(buildAtom, {
    ...get(buildAtom),
    buildName,
    lastUpdate: new Date().toISOString().split("T")[0],
  });
});

export const updateLastUpdatedPatchAtom = atom(
  null,
  (get, set, updatedPatch: string) => {
    set(buildAtom, {
      ...get(buildAtom),
      updatedPatch,
    });
  }
);

export const updateMainStatsAtom = atom(
  null,
  (get, set, mainStats: ICharacterBuildInput["mainStats"]) => {
    set(buildAtom, {
      ...get(buildAtom),
      mainStats,
    });
  }
);

export const updateSubStatsAtom = atom(
  null,
  (get, set, subStats: ICharacterBuildInput["subStats"]) => {
    set(buildAtom, {
      ...get(buildAtom),
      subStats,
    });
  }
);

export const updateTalentPriorityAtom = atom(
  null,
  (get, set, talentPriority: ICharacterBuildInput["talentPriority"]) => {
    set(buildAtom, {
      ...get(buildAtom),
      talentPriority,
    });
  }
);

export const updateNotesAtom = atom(null, (get, set, notes: string) => {
  set(buildAtom, {
    ...get(buildAtom),
    notes,
  });
});

export const updateWeaponsAtom = atom(
  null,
  (get, set, weapons: ICharacterBuildInput["weapons"]) => {
    set(buildAtom, {
      ...get(buildAtom),
      weapons,
    });
  }
);

export const updateArtifactsAtom = atom(
  null,
  (get, set, artifacts: ICharacterBuildInput["artifacts"]) => {
    set(buildAtom, {
      ...get(buildAtom),
      artifacts,
    });
  }
);

// Reset function
export const resetBuildAtom = atom(null, (get, set) => {
  set(buildAtom, {
    ...emptyBuild,
  });
});

// Full update function
export const updateFullBuildAtom = atom(
  null,
  (get, set, newBuild: Partial<ICharacterBuildInput>) => {
    set(buildAtom, {
      ...get(buildAtom),
      ...newBuild,
    });
  }
);
