// stages
// 1. basic
// 2. weapon
// 3. artifact
// 4. stats
// 5. talents

import { ICharacterBuildInput } from "@/types/build";

const basicFields = ["buildName", "characterId", "lastUpdatedPatch"] as const;

const isStageEnabled = (stage: string, build: ICharacterBuildInput) => {
  switch (stage) {
    case "basic":
      return true;
    case "weapons":
      return basicFields.every((field) => build[field] !== "");
    case "artifacts":
      return (
        basicFields.every((field) => build[field] !== "") &&
        build.weapons.length > 0 &&
        build.weapons[0].weaponId !== ""
      );
    case "stats":
      return (
        basicFields.every((field) => build[field] !== "") &&
        build.weapons.length > 0 &&
        build.weapons[0].weaponId !== "" &&
        build.artifacts.length > 0 &&
        build.artifacts[0].rank > 0
      );
    case "talents":
      return (
        basicFields.every((field) => build[field] !== "") &&
        build.weapons.length > 0 &&
        build.weapons[0].weaponId !== "" &&
        build.artifacts.length > 0 &&
        build.artifacts[0].rank > 0 &&
        build.mainStats.sands.length > 0 &&
        build.mainStats.goblet.length > 0 &&
        build.mainStats.circlet.length > 0 &&
        build.subStats.length > 0
      );

    default:
      return false;
  }
};

export default isStageEnabled;
