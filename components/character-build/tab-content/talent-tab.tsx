import { useAtom } from "jotai";

import { talentNotesAtom, talentPriorityAtom } from "@/atoms/build-atom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function TalentTab() {
  const [talents, setTalents] = useAtom(talentPriorityAtom);
  const [talentNotes, setTalentNotes] = useAtom(talentNotesAtom);

  const handleTalentChange = (field: string, value: number) => {
    setTalents((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <TabsContent value="talents" className="mt-6 space-y-4">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="normalAttack">Normal Attack Priority</Label>
            <Select
              value={talents.normalAttack.toString() ?? "1"}
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
              value={talents.elementalSkill.toString() ?? "1"}
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
              value={talents.elementalBurst.toString() ?? "1"}
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
              placeholder="Any notes about talent priorities..."
              rows={3}
              value={talentNotes}
              onChange={(e) => setTalentNotes(e.target.value)}
            />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
