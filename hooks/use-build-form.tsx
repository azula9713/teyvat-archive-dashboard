import { ICharacterBuildInput } from "@/types/build";

const emptyBuild: ICharacterBuildInput = {
  characterId: "",
  buildName: "",
  updatedPatch: "",
  weapons: [
    {
      weaponId: "",
      weaponName: "",
      weaponIcon: "",
      refinement: null,
      rank: 1,
    },
  ],
  artifacts: [
    {
      mainArtifactSetId: "",
      isFullSet: true,
      secondaryArtifactSetId: undefined,
      alternativeSets: [],
      rank: 1,
    },
  ],
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
  lastUpdate: new Date().toISOString().split("T")[0],
};

const useBuildForm = (initialData?: ICharacterBuildInput) => {
  // const [formData, setFormData] = useState<ICharacterBuildInput>(
  //   initialData || emptyBuild
  // );
  // const [alternativeArtifacts, setAlternativeArtifacts] = useState<
  //   {
  //     mainArtifactSetId: string;
  //     isFullSet: boolean;
  //     secondaryArtifactSetId?: string;
  //     rank: number;
  //   }[]
  // >(initialData?.artifacts[0]?.alternativeSets || []);

  // const handleChange = (field: string, value: any) => {
  //   console.log("field", field, "value", value);
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const handleWeaponChange = (index: number, field: string, value: any) => {
  //   console.log("field", field, "value", value, "index", index);
  //   const updatedWeapons = [...formData.weapons];
  //   updatedWeapons[index] = {
  //     ...updatedWeapons[index],
  //     [field]: value,
  //   };
  //   console.log("updatedWeapons", updatedWeapons);
  //   setFormData((prev) => ({
  //     ...prev,
  //     weapons: updatedWeapons,
  //   }));
  // };

  // const addWeapon = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     weapons: [
  //       ...prev.weapons,
  //       {
  //         weaponId: "",
  //         weaponName: "",
  //         weaponIcon: "",
  //         refinement: null,
  //         rank: prev.weapons.length + 1,
  //       },
  //     ],
  //   }));
  // };

  // const removeWeapon = (index: number) => {
  //   if (formData.weapons.length <= 1) return;

  //   const updatedWeapons = formData.weapons.filter((_, i) => i !== index);
  //   setFormData((prev) => ({
  //     ...prev,
  //     weapons: updatedWeapons,
  //   }));
  // };

  // const handleArtifactChange = (field: string, value: any) => {
  //   const updatedArtifacts = [...formData.artifacts];
  //   updatedArtifacts[0] = {
  //     ...updatedArtifacts[0],
  //     [field]: value,
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     artifacts: updatedArtifacts,
  //   }));
  // };

  // const handleArtifactSetTypeChange = (isFullSet: boolean) => {
  //   const updatedArtifacts = [...formData.artifacts];
  //   updatedArtifacts[0] = {
  //     ...updatedArtifacts[0],
  //     isFullSet,
  //     secondaryArtifactSetId: isFullSet
  //       ? undefined
  //       : updatedArtifacts[0].secondaryArtifactSetId ?? "",
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     artifacts: updatedArtifacts,
  //   }));
  // };

  // const addAlternativeArtifactSet = () => {
  //   const newAlternativeSet = {
  //     mainArtifactSetId: "",
  //     isFullSet: true,
  //     rank: alternativeArtifacts.length + 1,
  //   };
  //   setAlternativeArtifacts([...alternativeArtifacts, newAlternativeSet]);
  // };

  // const removeAlternativeArtifactSet = (index: number) => {
  //   const updatedAlternativeSets = alternativeArtifacts.filter(
  //     (_, i) => i !== index
  //   );
  //   setAlternativeArtifacts(updatedAlternativeSets);
  // };

  // const handleAlternativeArtifactChange = (
  //   index: number,
  //   field: string,
  //   value: any
  // ) => {
  //   const updatedAlternativeSets = [...alternativeArtifacts];
  //   updatedAlternativeSets[index] = {
  //     ...updatedAlternativeSets[index],
  //     [field]: value,
  //   };
  //   setAlternativeArtifacts(updatedAlternativeSets);
  // };

  // const handleAlternativeSetTypeChange = (
  //   index: number,
  //   isFullSet: boolean
  // ) => {
  //   const updatedAlternativeSets = [...alternativeArtifacts];
  //   updatedAlternativeSets[index] = {
  //     ...updatedAlternativeSets[index],
  //     isFullSet,
  //     secondaryArtifactSetId: isFullSet
  //       ? undefined
  //       : updatedAlternativeSets[index].secondaryArtifactSetId ?? "",
  //   };
  //   setAlternativeArtifacts(updatedAlternativeSets);
  // };

  // const handleMainStatChange = (field: string, value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     mainStats: {
  //       ...prev.mainStats,
  //       [field]: value.split(",").map((item) => item.trim()),
  //     },
  //   }));
  // };

  // const handleSubStatsChange = (value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     subStats: {
  //       ...prev.subStats,
  //       stats: value.split(",").map((item) => item.trim()),
  //     },
  //   }));
  // };

  // const handleTalentChange = (field: string, value: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     talentPriority: {
  //       ...prev.talentPriority,
  //       [field]: value,
  //     },
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);

  //   const updatedFormData = {
  //     ...formData,
  //     artifacts: [
  //       {
  //         ...formData.artifacts[0],
  //         alternativeSets:
  //           alternativeArtifacts.length > 0 ? alternativeArtifacts : undefined,
  //       },
  //     ],
  //     lastUpdate: new Date().toISOString().split("T")[0],
  //   };

  //   return updatedFormData;
  // };

  return {
    useBuildForm,
  };
};
