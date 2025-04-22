import { characterWeaponTypeAtom, weaponsAtom } from "@/atoms/build-atom";
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
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useAtom, useAtomValue } from "jotai";

type Props = {
  buildWeapons: ICharacterBuildInput["weapons"];
};

export default function WeaponTab({ buildWeapons }: Readonly<Props>) {
  const characterWeaponType = useAtomValue(characterWeaponTypeAtom);
  const { weapons, error, isLoading } = useWeaponData(characterWeaponType);
  const [, updateWeapons] = useAtom(weaponsAtom);

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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateWeapons(buildWeapons.filter((_, i) => i !== index));
                    }}
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
                    onValueChange={async (value) => {
                      updateWeapons(
                        buildWeapons.map((w, i) =>
                          i === index
                            ? {
                                ...w,
                                weaponId: value,
                                weaponRefinement: 1,
                              }
                            : w
                        )
                      );
                    }}
                    required={index === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a weapon" />
                    </SelectTrigger>
                    <SelectContent>
                      {weapons.map((w) => (
                        <SelectItem key={w.enkaId} value={w.enkaId}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={w.icon}
                              alt={w.name}
                              width={20}
                              height={20}
                            />
                            {w.name}
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
            Add Alternative Weapon
          </Button>
        </div>
      </Card>
    </TabsContent>
  );
}
