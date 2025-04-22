import { useAtom } from "jotai";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { mainStatsAtom, subStatsAtom } from "@/atoms/build-atom";

export default function StatTab() {
  const [mainStats, setMainStats] = useAtom(mainStatsAtom);
  const [subStats, setSubStats] = useAtom(subStatsAtom);

  const sandsOptions: Option[] = [
    { label: "ATK%", value: "ATK%" },
    { label: "ER%", value: "ER%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
  ];

  const gobletOptions: Option[] = [
    { label: "Pyro DMG%", value: "Pyro DMG%" },
    { label: "Cryo DMG%", value: "Cryo DMG%" },
    { label: "Electro DMG%", value: "Electro DMG%" },
    { label: "Hydro DMG%", value: "Hydro DMG%" },
    { label: "Geo DMG%", value: "Geo DMG%" },
    { label: "Anemo DMG%", value: "Anemo DMG%" },
    { label: "Physical DMG%", value: "Physical DMG%" },
    { label: "ATK%", value: "ATK%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
  ];

  const circletOptions: Option[] = [
    { label: "CRIT Rate", value: "CRIT Rate" },
    { label: "CRIT DMG", value: "CRIT DMG" },
    { label: "Healing Bonus", value: "Healing Bonus" },
    { label: "ATK%", value: "ATK%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
  ];

  const handleMainStatChange = (field: string, value: string) => {
    setMainStats({
      ...mainStats,
      [field]: value.split(",").map((stat) => stat.trim()),
    });
  };

  const handleSubStatsChange = (value: string) => {
    setSubStats(value.split(",").map((stat) => stat.trim()));
  };

  return (
    <TabsContent value="stats" className="space-y-4 mt-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sands">Sands Main Stats</Label>

            <MultipleSelector
              defaultOptions={sandsOptions}
              placeholder="eg: ATK%, ER%"
              value={
                mainStats.sands.map((stat) => ({
                  label: stat,
                  value: stat,
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("sands", selectedValues.join(", "));
              }}
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goblet">Goblet Main Stats</Label>
            <MultipleSelector
              defaultOptions={gobletOptions}
              placeholder="eg: Pyro DMG%, Hydro DMG%"
              value={
                mainStats.goblet.map((stat) => ({
                  label: stat,
                  value: stat,
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("goblet", selectedValues.join(", "));
              }}
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="circlet">Circlet Main Stats</Label>
            <MultipleSelector
              defaultOptions={circletOptions}
              placeholder="eg: CRIT Rate, CRIT DMG"
              value={
                mainStats.circlet.map((stat) => ({
                  label: stat,
                  value: stat,
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("circlet", selectedValues.join(", "));
              }}
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subStats">Substats Priority</Label>
            <MultipleSelector
              defaultOptions={sandsOptions}
              placeholder="eg: CRIT Rate, CRIT DMG"
              value={
                subStats.map((stat) => ({
                  label: stat,
                  value: stat,
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleSubStatsChange(selectedValues.join(", "));
              }}
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
