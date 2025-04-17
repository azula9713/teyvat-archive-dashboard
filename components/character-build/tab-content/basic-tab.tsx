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
import { ICharacterBuildInput } from "@/types/build";
import Image from "next/image";

type Props = {
  formData: ICharacterBuildInput;
  handleChange: (field: string, value: string) => void;
};

export default function BasicTab({ formData, handleChange }: Readonly<Props>) {
  const { characters, error, isLoading } = useCharacterData();

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
              value={formData.buildName}
              onChange={(e) => handleChange("buildName", e.target.value)}
              placeholder="eg: DPS Hu Tao"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="character">Character</Label>
            <Select
              value={formData.characterId}
              onValueChange={(value) => handleChange("characterId", value)}
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
              value={formData.updatedPatch}
              onChange={(e) => handleChange("updatedPatch", e.target.value)}
              placeholder="eg: 3.6"
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes ?? ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any general notes about this build..."
              rows={4}
            />
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}
