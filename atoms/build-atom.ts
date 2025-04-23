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
  subStats: [],
  talentPriority: {
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  },
  notes: "",
  statNotes: "",
  talentNotes: "",
  weaponNotes: "",
  artifactNotes: "",
  weapons: [
    {
      weaponId: 0,
      weaponRank: 1,
      weaponRefinement: 1,
    },
  ],
  artifacts: [
    {
      rank: 1,
      artifactSets: [
        {
          setId: "",
          piecesCount: 0,
        },
        {
          setId: "",
          piecesCount: 0,
        },
      ],
    },
  ],
};

// Read functions
export const authorIdAtom = atomWithStorage("authorId", emptyBuild.authorId);
export const characterIdAtom = atomWithStorage(
  "characterId",
  emptyBuild.characterId
);
export const buildNameAtom = atomWithStorage("buildName", emptyBuild.buildName);
export const lastUpdatedPatchAtom = atomWithStorage(
  "lastUpdatedPatch",
  emptyBuild.lastUpdatedPatch
);
export const mainStatsAtom = atomWithStorage("mainStats", emptyBuild.mainStats);
export const subStatsAtom = atomWithStorage("subStats", emptyBuild.subStats);
export const talentPriorityAtom = atomWithStorage(
  "talentPriority",
  emptyBuild.talentPriority
);
export const notesAtom = atomWithStorage("notes", emptyBuild.notes);
export const statNotesAtom = atomWithStorage("statNotes", emptyBuild.statNotes);
export const talentNotesAtom = atomWithStorage(
  "talentNotes",
  emptyBuild.talentNotes
);
export const weaponNotesAtom = atomWithStorage(
  "weaponNotes",
  emptyBuild.weaponNotes
);
export const artifactNotesAtom = atomWithStorage(
  "artifactNotes",
  emptyBuild.artifactNotes
);
export const weaponsAtom = atomWithStorage("weapons", emptyBuild.weapons);
export const artifactsAtom = atomWithStorage("artifacts", emptyBuild.artifacts);

export const characterWeaponTypeAtom = atomWithStorage(
  "characterWeaponType",
  ""
);

export const buildAtom = atom((get) => {
  return {
    authorId: get(authorIdAtom),
    characterId: get(characterIdAtom),
    buildName: get(buildNameAtom),
    lastUpdatedPatch: get(lastUpdatedPatchAtom),
    mainStats: get(mainStatsAtom),
    subStats: get(subStatsAtom),
    talentPriority: get(talentPriorityAtom),
    notes: get(notesAtom),
    weapons: get(weaponsAtom),
    artifacts: get(artifactsAtom),
    statNotes: get(statNotesAtom),
    talentNotes: get(talentNotesAtom),
    weaponNotes: get(weaponNotesAtom),
    artifactNotes: get(artifactNotesAtom),
  };
});
