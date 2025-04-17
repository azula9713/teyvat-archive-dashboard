import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ICharacterBuildInput } from "@/types/build";
import React from "react";

type Props = {
  formData: ICharacterBuildInput;
  handleTalentChange: (field: string, value: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<ICharacterBuildInput>>;
};

export default function TalentTab({
  formData,
  handleTalentChange,
  setFormData,
}: Readonly<Props>) {
  return (
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
              value={formData.talentPriority.notes ?? ""}
              onChange={(e) => {
                setFormData((prev: ICharacterBuildInput) => ({
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
  );
}
