"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import type { ICharacterBuildInput } from "@/types/build";
import { Save, ArrowLeft } from "lucide-react";
import BuildTabList from "./build-tab-list";
import BasicTab from "./tab-content/basic-tab";
import WeaponTab from "./tab-content/weapon-tab";
import ArtifactTab from "./tab-content/artifact-tab";
import StatTab from "./tab-content/stat-tab";
import TalentTab from "./tab-content/talent-tab";
import { useAtomValue } from "jotai";
import { buildAtom, weaponsAtom } from "@/atoms/build-atom";

interface BuildFormProps {
  initialData?: ICharacterBuildInput;
  isEditing?: boolean;
}

export function BuildForm({
  initialData,
  isEditing = false,
}: Readonly<BuildFormProps>) {
  const router = useRouter();

  const buildData = useAtomValue(buildAtom);
  const buildWeapons = useAtomValue(weaponsAtom);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted", e);
        // handleSubmit(e);
        // router.push("/");
      }}
      className="space-y-8 pb-10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Builds
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <BuildTabList
          itemList={[
            { label: "Basic Info", value: "basic" },
            { label: "Weapons", value: "weapons" },
            { label: "Artifacts", value: "artifacts" },
            { label: "Stats", value: "stats" },
            { label: "Talents", value: "talents" },
          ]}
        />

        <BasicTab />

        <WeaponTab
          buildWeapons={buildWeapons}
          // formData={formData}
          // handleWeaponChange={handleWeaponChange}
          // removeWeapon={removeWeapon}
          // addWeapon={addWeapon}
        />

        <ArtifactTab
        // formData={formData}
        // handleArtifactSetTypeChange={handleArtifactSetTypeChange}
        // handleArtifactChange={handleArtifactChange}
        // handleAlternativeSetTypeChange={handleAlternativeSetTypeChange}
        // handleAlternativeArtifactChange={handleAlternativeArtifactChange}
        // removeAlternativeArtifactSet={removeAlternativeArtifactSet}
        // addAlternativeArtifactSet={addAlternativeArtifactSet}
        // artifactSets={artifactSets}
        // alternativeArtifacts={alternativeArtifacts}
        />

        <StatTab
        // formData={formData}
        // handleMainStatChange={handleMainStatChange}
        // handleSubStatsChange={handleSubStatsChange}
        />

        <TalentTab
        // formData={formData}
        // handleTalentChange={handleTalentChange}
        // setFormData={setFormData}
        />
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Update Build" : "Save Build"}
        </Button>
      </div>
    </form>
  );
}
