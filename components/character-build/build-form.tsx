"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ICharacterBuildInput } from "@/types/build";
import { characters, weapons, artifactSets } from "@/data/game-data";
import { Plus, Minus, Save, ArrowLeft, Trash2 } from "lucide-react";
import BuildTabList from "./tab-list";

const emptyBuild: ICharacterBuildInput = {
  buildName: "",
  characterId: "",
  lastUpdate: new Date().toISOString().split("T")[0],
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
      alternativeSets: [],
      rank: 1,
    },
  ],
  mainStats: {
    sands: [],
    goblet: [],
    circlet: [],
    notes: "",
  },
  subStats: {
    stats: [],
    notes: "",
  },
  talentPriority: {
    normalAttack: 3,
    elementalSkill: 2,
    elementalBurst: 1,
    notes: "",
  },
  notes: "",
};

interface BuildFormProps {
  initialData?: ICharacterBuildInput;
  isEditing?: boolean;
}

export function BuildForm({
  initialData,
  isEditing = false,
}: Readonly<BuildFormProps>) {
  const [formData, setFormData] = useState<ICharacterBuildInput>(
    initialData || emptyBuild
  );
  const [alternativeArtifacts, setAlternativeArtifacts] = useState<
    {
      mainArtifactSetId: string;
      isFullSet: boolean;
      secondaryArtifactSetId?: string;
      rank: number;
    }[]
  >(initialData?.artifacts[0]?.alternativeSets || []);
  const router = useRouter();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWeaponChange = (index: number, field: string, value: any) => {
    const updatedWeapons = [...formData.weapons];
    updatedWeapons[index] = {
      ...updatedWeapons[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      weapons: updatedWeapons,
    }));
  };

  const addWeapon = () => {
    setFormData((prev) => ({
      ...prev,
      weapons: [
        ...prev.weapons,
        {
          weaponId: "",
          weaponName: "",
          weaponIcon: "",
          refinement: null,
          rank: prev.weapons.length + 1,
        },
      ],
    }));
  };

  const removeWeapon = (index: number) => {
    if (formData.weapons.length <= 1) return;

    const updatedWeapons = formData.weapons.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      weapons: updatedWeapons,
    }));
  };

  const handleArtifactChange = (field: string, value: any) => {
    const updatedArtifacts = [...formData.artifacts];
    updatedArtifacts[0] = {
      ...updatedArtifacts[0],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      artifacts: updatedArtifacts,
    }));
  };

  const handleArtifactSetTypeChange = (isFullSet: boolean) => {
    const updatedArtifacts = [...formData.artifacts];
    updatedArtifacts[0] = {
      ...updatedArtifacts[0],
      isFullSet,
      // Clear secondary set if switching to full set
      secondaryArtifactSetId: isFullSet
        ? undefined
        : updatedArtifacts[0].secondaryArtifactSetId || "",
    };
    setFormData((prev) => ({
      ...prev,
      artifacts: updatedArtifacts,
    }));
  };

  const addAlternativeArtifactSet = () => {
    const newAlternativeSet = {
      mainArtifactSetId: "",
      isFullSet: true,
      rank: alternativeArtifacts.length + 1,
    };
    setAlternativeArtifacts([...alternativeArtifacts, newAlternativeSet]);
  };

  const removeAlternativeArtifactSet = (index: number) => {
    const updatedAlternativeSets = alternativeArtifacts.filter(
      (_, i) => i !== index
    );
    setAlternativeArtifacts(updatedAlternativeSets);
  };

  const handleAlternativeArtifactChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedAlternativeSets = [...alternativeArtifacts];
    updatedAlternativeSets[index] = {
      ...updatedAlternativeSets[index],
      [field]: value,
    };
    setAlternativeArtifacts(updatedAlternativeSets);
  };

  const handleAlternativeSetTypeChange = (
    index: number,
    isFullSet: boolean
  ) => {
    const updatedAlternativeSets = [...alternativeArtifacts];
    updatedAlternativeSets[index] = {
      ...updatedAlternativeSets[index],
      isFullSet,
      // Clear secondary set if switching to full set
      secondaryArtifactSetId: isFullSet
        ? undefined
        : updatedAlternativeSets[index].secondaryArtifactSetId || "",
    };
    setAlternativeArtifacts(updatedAlternativeSets);
  };

  const handleMainStatChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      mainStats: {
        ...prev.mainStats,
        [field]: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleSubStatsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subStats: {
        ...prev.subStats,
        stats: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleTalentChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      talentPriority: {
        ...prev.talentPriority,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the artifacts with alternative sets
    const updatedFormData = {
      ...formData,
      artifacts: [
        {
          ...formData.artifacts[0],
          alternativeSets:
            alternativeArtifacts.length > 0 ? alternativeArtifacts : undefined,
        },
      ],
      lastUpdate: new Date().toISOString().split("T")[0],
    };

    // In a real app, this would save to a database
    console.log("Saving build:", updatedFormData);

    // Show success message
    alert("Build saved successfully!");

    // Navigate back to the builds list
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
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
        {/* <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="talents">Talents</TabsTrigger>
        </TabsList> */}
        <BuildTabList
          itemList={["basic", "weapons", "artifacts", "stats", "talents"]}
        />

        <TabsContent value="basic" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="buildName">Build Name</Label>
                <Input
                  id="buildName"
                  value={formData.buildName}
                  onChange={(e) => handleChange("buildName", e.target.value)}
                  placeholder="e.g., DPS Hu Tao"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="character">Character</Label>
                <Select
                  value={formData.characterId}
                  onValueChange={(value) => handleChange("characterId", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a character" />
                  </SelectTrigger>
                  <SelectContent>
                    {characters.map((character) => (
                      <SelectItem key={character.id} value={character.id}>
                        {character.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Any general notes about this build..."
                  rows={4}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weapons" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              {formData.weapons.map((weapon, index) => (
                <div
                  key={index}
                  className="space-y-4 pb-4 border-b last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Weapon {index + 1}</h3>
                    {formData.weapons.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeWeapon(index)}
                      >
                        <Minus className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`weapon-${index}`}>Weapon</Label>
                      <Select
                        value={weapon.weaponId}
                        onValueChange={(value) => {
                          const selectedWeapon = weapons.find(
                            (w) => w.id === value
                          );
                          if (selectedWeapon) {
                            handleWeaponChange(index, "weaponId", value);
                            handleWeaponChange(
                              index,
                              "weaponName",
                              selectedWeapon.name
                            );
                            handleWeaponChange(
                              index,
                              "weaponIcon",
                              selectedWeapon.icon || ""
                            );
                          }
                        }}
                        required={index === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a weapon" />
                        </SelectTrigger>
                        <SelectContent>
                          {weapons.map((w) => (
                            <SelectItem key={w.id} value={w.id}>
                              {w.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`refinement-${index}`}>Refinement</Label>
                      <Select
                        value={weapon.refinement?.toString() || ""}
                        onValueChange={(value) =>
                          handleWeaponChange(
                            index,
                            "refinement",
                            Number.parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select refinement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">R1</SelectItem>
                          <SelectItem value="2">R2</SelectItem>
                          <SelectItem value="3">R3</SelectItem>
                          <SelectItem value="4">R4</SelectItem>
                          <SelectItem value="5">R5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addWeapon}>
                <Plus className="mr-2 h-4 w-4" />
                Add Alternative Weapon
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Main Artifact Set</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroup
                      value={formData.artifacts[0].isFullSet ? "full" : "mixed"}
                      onValueChange={(value) =>
                        handleArtifactSetTypeChange(value === "full")
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="full-set" />
                        <Label htmlFor="full-set">4pc Set</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="mixed-set" />
                        <Label htmlFor="mixed-set">2pc + 2pc Set</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.artifacts[0].isFullSet ? (
                    <div className="space-y-2">
                      <Label htmlFor="mainArtifactSet">4pc Artifact Set</Label>
                      <Select
                        value={formData.artifacts[0].mainArtifactSetId}
                        onValueChange={(value) =>
                          handleArtifactChange("mainArtifactSetId", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select main artifact set" />
                        </SelectTrigger>
                        <SelectContent>
                          {artifactSets.map((set) => (
                            <SelectItem key={set.id} value={set.id}>
                              {set.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="mainArtifactSet">First 2pc Set</Label>
                        <Select
                          value={formData.artifacts[0].mainArtifactSetId}
                          onValueChange={(value) =>
                            handleArtifactChange("mainArtifactSetId", value)
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select first 2pc set" />
                          </SelectTrigger>
                          <SelectContent>
                            {artifactSets.map((set) => (
                              <SelectItem key={set.id} value={set.id}>
                                {set.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryArtifactSet">
                          Second 2pc Set
                        </Label>
                        <Select
                          value={
                            formData.artifacts[0].secondaryArtifactSetId || ""
                          }
                          onValueChange={(value) =>
                            handleArtifactChange(
                              "secondaryArtifactSetId",
                              value
                            )
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select second 2pc set" />
                          </SelectTrigger>
                          <SelectContent>
                            {artifactSets.map((set) => (
                              <SelectItem key={set.id} value={set.id}>
                                {set.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Alternative Artifact Sets
                  </h3>
                </div>

                {alternativeArtifacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No alternative sets added yet.
                  </p>
                ) : (
                  alternativeArtifacts.map((altSet, index) => (
                    <div
                      key={index}
                      className="space-y-4 p-4 border rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          Alternative Set {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAlternativeArtifactSet(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroup
                          value={altSet.isFullSet ? "full" : "mixed"}
                          onValueChange={(value) =>
                            handleAlternativeSetTypeChange(
                              index,
                              value === "full"
                            )
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="full"
                              id={`alt-full-set-${index}`}
                            />
                            <Label htmlFor={`alt-full-set-${index}`}>
                              4pc Set
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="mixed"
                              id={`alt-mixed-set-${index}`}
                            />
                            <Label htmlFor={`alt-mixed-set-${index}`}>
                              2pc + 2pc Set
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {altSet.isFullSet ? (
                        <div className="space-y-2">
                          <Label htmlFor={`alt-main-set-${index}`}>
                            4pc Artifact Set
                          </Label>
                          <Select
                            value={altSet.mainArtifactSetId}
                            onValueChange={(value) =>
                              handleAlternativeArtifactChange(
                                index,
                                "mainArtifactSetId",
                                value
                              )
                            }
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select artifact set" />
                            </SelectTrigger>
                            <SelectContent>
                              {artifactSets.map((set) => (
                                <SelectItem key={set.id} value={set.id}>
                                  {set.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`alt-main-set-${index}`}>
                              First 2pc Set
                            </Label>
                            <Select
                              value={altSet.mainArtifactSetId}
                              onValueChange={(value) =>
                                handleAlternativeArtifactChange(
                                  index,
                                  "mainArtifactSetId",
                                  value
                                )
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select first 2pc set" />
                              </SelectTrigger>
                              <SelectContent>
                                {artifactSets.map((set) => (
                                  <SelectItem key={set.id} value={set.id}>
                                    {set.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`alt-secondary-set-${index}`}>
                              Second 2pc Set
                            </Label>
                            <Select
                              value={altSet.secondaryArtifactSetId || ""}
                              onValueChange={(value) =>
                                handleAlternativeArtifactChange(
                                  index,
                                  "secondaryArtifactSetId",
                                  value
                                )
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select second 2pc set" />
                              </SelectTrigger>
                              <SelectContent>
                                {artifactSets.map((set) => (
                                  <SelectItem key={set.id} value={set.id}>
                                    {set.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAlternativeArtifactSet}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Alternative Artifact Set
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sands">Sands Main Stats</Label>
                <Input
                  id="sands"
                  value={formData.mainStats.sands.join(", ")}
                  onChange={(e) =>
                    handleMainStatChange("sands", e.target.value)
                  }
                  placeholder="e.g., ATK%, ER%, HP%"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple options with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goblet">Goblet Main Stats</Label>
                <Input
                  id="goblet"
                  value={formData.mainStats.goblet.join(", ")}
                  onChange={(e) =>
                    handleMainStatChange("goblet", e.target.value)
                  }
                  placeholder="e.g., Pyro DMG%, ATK%"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple options with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="circlet">Circlet Main Stats</Label>
                <Input
                  id="circlet"
                  value={formData.mainStats.circlet.join(", ")}
                  onChange={(e) =>
                    handleMainStatChange("circlet", e.target.value)
                  }
                  placeholder="e.g., CRIT Rate, CRIT DMG"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple options with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subStats">Substats Priority</Label>
                <Input
                  id="subStats"
                  value={formData.subStats.stats.join(", ")}
                  onChange={(e) => handleSubStatsChange(e.target.value)}
                  placeholder="e.g., CRIT Rate, CRIT DMG, ATK%"
                />
                <p className="text-xs text-muted-foreground">
                  List in order of priority, separated by commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="statsNotes">Stats Notes</Label>
                <Textarea
                  id="statsNotes"
                  value={formData.mainStats.notes || ""}
                  onChange={(e) =>
                    handleMainStatChange("notes", e.target.value)
                  }
                  placeholder="Any notes about stat priorities..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="talents" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="normalAttack">Normal Attack Priority</Label>
                <Select
                  value={formData.talentPriority.normalAttack.toString()}
                  onValueChange={(value) =>
                    handleTalentChange("normalAttack", Number.parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Highest)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3 (Lowest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elementalSkill">Elemental Skill Priority</Label>
                <Select
                  value={formData.talentPriority.elementalSkill.toString()}
                  onValueChange={(value) =>
                    handleTalentChange("elementalSkill", Number.parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Highest)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3 (Lowest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elementalBurst">Elemental Burst Priority</Label>
                <Select
                  value={formData.talentPriority.elementalBurst.toString()}
                  onValueChange={(value) =>
                    handleTalentChange("elementalBurst", Number.parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Highest)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3 (Lowest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="talentNotes">Talent Notes</Label>
                <Textarea
                  id="talentNotes"
                  value={formData.talentPriority.notes || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      talentPriority: {
                        ...prev.talentPriority,
                        notes: e.target.value,
                      },
                    }));
                  }}
                  placeholder="Any notes about talent priorities..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
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
