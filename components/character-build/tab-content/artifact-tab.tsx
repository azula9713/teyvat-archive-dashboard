import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { ICharacterBuildInput } from "@/types/build";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  formData: ICharacterBuildInput;
  handleArtifactSetTypeChange: (value: boolean) => void;
  handleArtifactChange: (field: string, value: string) => void;
  handleAlternativeSetTypeChange: (index: number, value: boolean) => void;
  handleAlternativeArtifactChange: (
    index: number,
    field: string,
    value: string
  ) => void;
  removeAlternativeArtifactSet: (index: number) => void;
  addAlternativeArtifactSet: () => void;
  artifactSets: any[];
  alternativeArtifacts: any[];
};

export default function ArtifactTab({
  formData,
  handleArtifactSetTypeChange,
  handleArtifactChange,
  handleAlternativeSetTypeChange,
  handleAlternativeArtifactChange,
  removeAlternativeArtifactSet,
  addAlternativeArtifactSet,
  artifactSets,
  alternativeArtifacts,
}: Readonly<Props>) {
  return (
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
                    <Label htmlFor="secondaryArtifactSet">Second 2pc Set</Label>
                    <Select
                      value={formData.artifacts[0].secondaryArtifactSetId ?? ""}
                      onValueChange={(value) =>
                        handleArtifactChange("secondaryArtifactSetId", value)
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
              <h3 className="text-lg font-medium">Alternative Artifact Sets</h3>
            </div>

            {alternativeArtifacts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No alternative sets added yet.
              </p>
            ) : (
              alternativeArtifacts.map((altSet, index) => (
                <div key={altSet} className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Alternative Set {index + 1}</h4>
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
                        handleAlternativeSetTypeChange(index, value === "full")
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="full"
                          id={`alt-full-set-${index}`}
                        />
                        <Label htmlFor={`alt-full-set-${index}`}>4pc Set</Label>
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
                          value={altSet.secondaryArtifactSetId ?? ""}
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
  );
}
