import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import {
  characterWeaponTypeAtom,
  weaponNotesAtom,
  weaponsAtom,
} from "@/atoms/build-atom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { useWeaponData } from "@/hooks/use-server-data";
import { ICharacterBuildInput } from "@/types/build";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  buildWeapons: ICharacterBuildInput["weapons"];
};

export default function WeaponTab({ buildWeapons }: Readonly<Props>) {
  const characterWeaponType = useAtomValue(characterWeaponTypeAtom);
  const { weapons, error, isLoading } = useWeaponData(characterWeaponType);
  const [, updateWeapons] = useAtom(weaponsAtom);
  const [weaponNotes, setWeaponNotes] = useAtom(weaponNotesAtom);

  const updateWeaponOrder = (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    // Boundary check
    if (swapIndex < 0 || swapIndex >= buildWeapons.length) return;

    // Swap weapons
    const newWeapons = [...buildWeapons];
    [newWeapons[index], newWeapons[swapIndex]] = [
      newWeapons[swapIndex],
      newWeapons[index],
    ];

    updateWeapons(newWeapons);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TabsContent value="weapons" className="space-y-4 mt-6">
      <Card className="p-6">
        <div className="space-y-6">
          {buildWeapons.map((weapon, index) => (
            <div
              key={`${weapon.weaponId ?? "empty"}-${weapon.weaponRank}`}
              className="space-y-4 pb-4 border-b last:border-0"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Weapon {index + 1}</h3>
                {buildWeapons.length > 1 && (
                  <div className="flex items-center space-x-0.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        updateWeapons(
                          buildWeapons.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={index === 0}
                      onClick={() => updateWeaponOrder(index, "up")}
                    >
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={index === buildWeapons.length - 1}
                      onClick={() => updateWeaponOrder(index, "down")}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`weapon-${index}`}>Weapon</Label>
                  <Select
                    value={weapon.weaponId}
                    onValueChange={(value) => {
                      updateWeapons(
                        buildWeapons.map((w, i) =>
                          i === index ? { ...w, weaponId: value } : w
                        )
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select weapon" />
                    </SelectTrigger>
                    <SelectContent>
                      {weapons.map((weapon) => (
                        <SelectItem
                          key={weapon.enkaId}
                          value={weapon.enkaId}
                          disabled={buildWeapons.some(
                            (w) => w.weaponId === weapon.enkaId
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={weapon.icon}
                              alt={weapon.name}
                              width={20}
                              height={20}
                            />
                            {weapon.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`refinement-${index}`}>Refinement</Label>
                  <Select
                    value={weapon.weaponRefinement?.toString() ?? ""}
                    onValueChange={(value) => {
                      updateWeapons(
                        buildWeapons.map((w, i) =>
                          i === index
                            ? { ...w, weaponRefinement: Number(value) }
                            : w
                        )
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select refinement" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          R{i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              updateWeapons([
                ...buildWeapons,
                {
                  weaponId: "",
                  weaponRefinement: 1,
                  weaponRank: buildWeapons.length + 1,
                },
              ]);
            }}
            disabled={
              //if the last weapon is empty, don't show the button
              buildWeapons.length > 0 &&
              buildWeapons[buildWeapons.length - 1].weaponId === ""
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add another weapon
          </Button>
        </div>

        <div className="space-y-2 sm:col-span-2 mt-4">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any notes about the weapons..."
            value={weaponNotes}
            onChange={(e) => setWeaponNotes(e.target.value)}
            rows={4}
          />
        </div>
      </Card>
    </TabsContent>
  );
}
