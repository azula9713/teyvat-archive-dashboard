import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect } from "react";

import {
  buildNameAtom,
  characterIdAtom,
  characterWeaponTypeAtom,
  lastUpdatedPatchAtom,
  notesAtom,
} from "@/atoms/build-atom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCharacterData } from "@/hooks/use-server-data";

export default function BasicTab() {
  const { characters, error, isLoading } = useCharacterData();

  const [buildName, setBuildName] = useAtom(buildNameAtom);
  const [characterId, setCharacterId] = useAtom(characterIdAtom);
  const [lastUpdatedPatch, setLastUpdatedPatch] = useAtom(lastUpdatedPatchAtom);
  const [notes, setNotes] = useAtom(notesAtom);
  const [, setCharacterWeaponType] = useAtom(characterWeaponTypeAtom);

  useEffect(() => {
    const weaponType = characters?.find(
      (character) => character.uniqueId === characterId
    )?.weaponType;
    if (weaponType) {
      setCharacterWeaponType(weaponType);
    }
  }, [characterId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TabsContent value="basic" className="space-y-4 mt-6">
      <Card className="p-6">
        <div className="grid gap-6 sm:grid-cols-2 grid-cols-1 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="buildName">Build Name</Label>
            <Input
              id="buildName"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="eg: DPS Hu Tao"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="character">Character</Label>
            <Select
              value={characterId}
              onValueChange={(value) => setCharacterId(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a character" />
              </SelectTrigger>
              <SelectContent>
                {characters.map((character) => (
                  <SelectItem
                    key={character.uniqueId}
                    value={character.uniqueId}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={character.iconUrl}
                        alt={character.name}
                        width={32}
                        height={32}
                      />
                      {character.name}
                      {character.isTraveler && (
                        <span className="text-xs text-gray-500">
                          {character.element}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="updatedPatch">Updated Patch</Label>
            <Input
              id="updatedPatch"
              value={lastUpdatedPatch}
              onChange={(e) => setLastUpdatedPatch(e.target.value)}
              placeholder="eg: 3.6"
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any general notes about this build..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
