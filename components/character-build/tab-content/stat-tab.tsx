import { useAtom } from "jotai";

import { mainStatsAtom, statNotesAtom, subStatsAtom } from "@/atoms/build-atom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function StatTab() {
  const [mainStats, setMainStats] = useAtom(mainStatsAtom);
  const [subStats, setSubStats] = useAtom(subStatsAtom);
  const [statNotes, setStatNotes] = useAtom(statNotesAtom);

  const sandsOptions: Option[] = [
    { label: "ATK%", value: "ATK%" },
    { label: "ER%", value: "ER%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
    { label: "Elemental Mastery", value: "Elemental Mastery" }
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
    { label: "Elemental Mastery", value: "Elemental Mastery" }
  ];

  const circletOptions: Option[] = [
    { label: "CRIT Rate", value: "CRIT Rate" },
    { label: "CRIT DMG", value: "CRIT DMG" },
    { label: "Healing Bonus", value: "Healing Bonus" },
    { label: "ATK%", value: "ATK%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
    { label: "Elemental Mastery", value: "Elemental Mastery" }
  ];

  const subStatOptions: Option[] = [
    { label: "CRIT Rate", value: "CRIT Rate" },
    { label: "CRIT DMG", value: "CRIT DMG" },
    { label: "ATK%", value: "ATK%" },
    { label: "HP%", value: "HP%" },
    { label: "DEF%", value: "DEF%" },
    { label: "ER%", value: "ER%" },
    { label: "Elemental Mastery", value: "Elemental Mastery" }
  ];

  const handleMainStatChange = (field: string, value: string) => {
    setMainStats({
      ...mainStats,
      [field]: value.split(",").map((stat) => stat.trim())
    });
  };

  const handleSubStatsChange = (value: string) => {
    setSubStats(value.split(",").map((stat) => stat.trim()));
  };

  return (
    <TabsContent value="stats" className="mt-6 space-y-4">
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
                  value: stat
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("sands", selectedValues.join(", "));
              }}
            />
            <p className="text-muted-foreground text-xs">
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
                  value: stat
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("goblet", selectedValues.join(", "));
              }}
            />
            <p className="text-muted-foreground text-xs">
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
                  value: stat
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleMainStatChange("circlet", selectedValues.join(", "));
              }}
            />
            <p className="text-muted-foreground text-xs">
              Separate multiple options with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subStats">Substats Priority</Label>
            <MultipleSelector
              defaultOptions={subStatOptions}
              placeholder="eg: CRIT Rate, CRIT DMG"
              value={
                subStats.map((stat) => ({
                  label: stat,
                  value: stat
                })) ?? []
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                handleSubStatsChange(selectedValues.join(", "));
              }}
            />
            <p className="text-muted-foreground text-xs">
              List in order of priority, separated by commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statsNotes">Stats Notes</Label>
            <Textarea
              id="statsNotes"
              value={statNotes}
              onChange={(e) => setStatNotes(e.target.value)}
              placeholder="Any notes about stat priorities..."
              rows={3}
            />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
