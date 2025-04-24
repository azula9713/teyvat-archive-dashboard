import type { ICharacterBuild } from "@/types/build";

export const sampleBuilds: ICharacterBuild[] = [
  {
    buildName: "Melt Ganyu",
    characterId: "ganyu",
    lastUpdate: "2023-12-15",
    weapons: [
      {
        weaponId: "amos-bow",
        weaponName: "Amos' Bow",
        weaponIcon: "/weapons/amos-bow.png",
        refinement: 1,
        rank: 1
      },
      {
        weaponId: "prototype-crescent",
        weaponName: "Prototype Crescent",
        weaponIcon: "/weapons/prototype-crescent.png",
        refinement: 5,
        rank: 2
      }
    ],
    artifacts: [
      {
        mainArtifactSetId: "wanderers-troupe",
        isFullSet: true,
        alternativeSets: [
          {
            mainArtifactSetId: "shimenawas-reminiscence",
            isFullSet: true,
            rank: 2
          }
        ],
        rank: 1
      }
    ],
    mainStats: {
      sands: ["ATK%"],
      goblet: ["Cryo DMG%"],
      circlet: ["CRIT DMG", "CRIT Rate"],
      notes: "Prioritize CRIT DMG if using Blizzard Strayer"
    },
    subStats: {
      stats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"],
      notes: "Balance CRIT Rate and CRIT DMG for optimal damage"
    },
    talentPriority: {
      normalAttack: 1,
      elementalSkill: 3,
      elementalBurst: 2,
      notes: "Normal Attack is the highest priority for Charged Shot playstyle"
    },
    notes:
      "This build focuses on maximizing Charged Shot damage for Melt reactions."
  },
  {
    buildName: "Hyperbloom Nahida",
    characterId: "nahida",
    lastUpdate: "2023-11-28",
    weapons: [
      {
        weaponId: "a-thousand-floating-dreams",
        weaponName: "A Thousand Floating Dreams",
        weaponIcon: "/weapons/a-thousand-floating-dreams.png",
        refinement: 1,
        rank: 1
      }
    ],
    artifacts: [
      {
        mainArtifactSetId: "deepwood-memories",
        isFullSet: true,
        rank: 1
      }
    ],
    mainStats: {
      sands: ["Elemental Mastery"],
      goblet: ["Elemental Mastery"],
      circlet: ["Elemental Mastery", "CRIT Rate"]
    },
    subStats: {
      stats: ["Elemental Mastery", "CRIT Rate", "CRIT DMG", "Energy Recharge"]
    },
    talentPriority: {
      normalAttack: 3,
      elementalSkill: 1,
      elementalBurst: 2
    },
    notes: "Focus on Elemental Mastery for Hyperbloom reactions."
  },
  {
    buildName: "Main DPS Raiden",
    characterId: "raiden-shogun",
    lastUpdate: "2023-10-05",
    weapons: [
      {
        weaponId: "engulfing-lightning",
        weaponName: "Engulfing Lightning",
        weaponIcon: "/weapons/engulfing-lightning.png",
        refinement: 1,
        rank: 1
      },
      {
        weaponId: "the-catch",
        weaponName: "The Catch",
        weaponIcon: "/weapons/the-catch.png",
        refinement: 5,
        rank: 2
      }
    ],
    artifacts: [
      {
        mainArtifactSetId: "emblem-of-severed-fate",
        isFullSet: true,
        alternativeSets: [
          {
            mainArtifactSetId: "noblesse-oblige",
            isFullSet: false,
            secondaryArtifactSetId: "shimenawas-reminiscence",
            rank: 2
          }
        ],
        rank: 1
      }
    ],
    mainStats: {
      sands: ["Energy Recharge", "ATK%"],
      goblet: ["Electro DMG%"],
      circlet: ["CRIT Rate", "CRIT DMG"]
    },
    subStats: {
      stats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
    },
    talentPriority: {
      normalAttack: 3,
      elementalSkill: 2,
      elementalBurst: 1
    },
    notes: "Aim for around 250-270% Energy Recharge for optimal damage."
  }
];
