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
import { ICharacterBuildInput } from "@/types/build";
import { Minus, Plus } from "lucide-react";
import React from "react";

type Props = {
  formData: ICharacterBuildInput;
  handleWeaponChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  removeWeapon: (index: number) => void;
  addWeapon: () => void;
  weapons: any[];
};

export default function WeaponTab({
  formData,
  handleWeaponChange,
  removeWeapon,
  addWeapon,
  weapons,
}: Readonly<Props>) {
  return (
    <TabsContent value="weapons" className="space-y-4 mt-6">
      <Card className="p-6">
        <div className="space-y-6">
          {formData.weapons.map((weapon, index) => (
            <div
              key={weapon.weaponId}
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
                          selectedWeapon.icon ?? ""
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
                    value={weapon.refinement?.toString() ?? ""}
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
  );
}
