import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ICharacterBuildInput } from "@/types/build";

type Props = {
  // formData: ICharacterBuildInput;
  // handleMainStatChange: (field: string, value: string) => void;
  // handleSubStatsChange: (value: string) => void;
};

export default function StatTab({}: // formData,
// handleMainStatChange,
// handleSubStatsChange,
Readonly<Props>) {
  return (
    <TabsContent value="stats" className="space-y-4 mt-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sands">Sands Main Stats</Label>
            <Input
              id="sands"
              // value={formData.mainStats.sands.join(", ")}
              // onChange={(e) => handleMainStatChange("sands", e.target.value)}
              placeholder="eg: ATK%, ER%, HP%"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goblet">Goblet Main Stats</Label>
            <Input
              id="goblet"
              // value={formData.mainStats.goblet.join(", ")}
              // onChange={(e) => handleMainStatChange("goblet", e.target.value)}
              placeholder="eg: Pyro DMG%, ATK%"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="circlet">Circlet Main Stats</Label>
            <Input
              id="circlet"
              // value={formData.mainStats.circlet.join(", ")}
              // onChange={(e) => handleMainStatChange("circlet", e.target.value)}
              placeholder="eg: CRIT Rate, CRIT DMG"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subStats">Substats Priority</Label>
            <Input
              id="subStats"
              // value={formData.subStats.stats.join(", ")}
              // onChange={(e) => handleSubStatsChange(e.target.value)}
              placeholder="eg: CRIT Rate, CRIT DMG, ATK%"
            />
            <p className="text-xs text-muted-foreground">
              List in order of priority, separated by commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statsNotes">Stats Notes</Label>
            <Textarea
              id="statsNotes"
              // value={formData.mainStats.notes ?? ""}
              // onChange={(e) => handleMainStatChange("notes", e.target.value)}
              placeholder="Any notes about stat priorities..."
              rows={3}
            />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
