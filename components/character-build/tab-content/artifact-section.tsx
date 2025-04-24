import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

import { artifactsAtom } from "@/atoms/build-atom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IBaseArtifactSet } from "@/types/artifacts";
import { ICharacterBuild } from "@/types/build";
type Props = {
  index: number;
  artifactSets: IBaseArtifactSet[];
};
export default function ArtifactSection({
  index,
  artifactSets
}: Readonly<Props>) {
  const [buildArtifacts, setBuildArtifacts] = useAtom(artifactsAtom);
  const [isFullSet, setIsFullSet] = useState(
    buildArtifacts[index].artifactSets[0].piecesCount === 4
  );

  const updateArtifactSet = (
    piecesCount: number,
    setIndex: number,
    value: string
  ) => {
    const updatedSet = buildArtifacts.map((a, i) => {
      if (i !== index) return a;

      const updatedSets =
        piecesCount === 4
          ? [{ setId: String(value), piecesCount: 4 }]
          : buildArtifacts[index].artifactSets.map((set, idx) =>
              idx === setIndex ? { setId: String(value), piecesCount: 2 } : set
            );

      return { ...a, artifactSets: updatedSets };
    });

    setBuildArtifacts(updatedSet);
  };

  useEffect(() => {
    updateArtifactSet(
      isFullSet ? 4 : 2,
      0,
      buildArtifacts[index].artifactSets[0].setId
    );
  }, [isFullSet]);

  useEffect(() => {
    if (buildArtifacts[index].artifactSets[0].piecesCount === 4) {
      setIsFullSet(true);
    } else {
      setIsFullSet(false);
    }
  }, [buildArtifacts]);

  return (
    <>
      <div className="flex items-center space-x-2">
        <RadioGroup
          value={isFullSet ? "full" : "mixed"}
          onValueChange={(value) => setIsFullSet(value === "full")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full" id={`alt-full-set-${index}`} />
            <Label htmlFor={`alt-full-set-${index}`}>4pc Set</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id={`alt-mixed-set-${index}`} />
            <Label htmlFor={`alt-mixed-set-${index}`}>2pc + 2pc Set</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {isFullSet ? (
          <div className="space-y-2">
            <div>
              <Label htmlFor={`artifact-${index}`}>Set 1</Label>
              <Select
                value={buildArtifacts[index].artifactSets[0].setId}
                onValueChange={(value) => {
                  updateArtifactSet(4, 0, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an artifact set" />
                </SelectTrigger>
                <SelectContent>
                  {artifactSets.map((set) => (
                    <SelectItem key={set.id} value={set.id}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={set.icon}
                          alt={set.name}
                          width={25}
                          height={25}
                        />
                        {set.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor={`artifact-${index}`}>Set 1</Label>
              <Select
                value={buildArtifacts[index].artifactSets[0].setId}
                onValueChange={(value) => {
                  updateArtifactSet(2, 0, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an artifact set" />
                </SelectTrigger>
                <SelectContent>
                  {artifactSets.map((set) => (
                    <SelectItem key={set.id} value={set.id}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={set.icon}
                          alt={set.name}
                          width={25}
                          height={25}
                        />
                        {set.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`artifact-${index}`}>Set 2</Label>
              <Select
                value={buildArtifacts[index].artifactSets[1]?.setId}
                onValueChange={(value) => {
                  updateArtifactSet(2, 1, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an artifact set" />
                </SelectTrigger>
                <SelectContent>
                  {artifactSets
                    .filter(
                      (set) =>
                        set.id !== buildArtifacts[index].artifactSets[0].setId
                    )
                    .map((set) => (
                      <SelectItem key={set.id} value={set.id}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={set.icon}
                            alt={set.name}
                            width={25}
                            height={25}
                          />
                          {set.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </>
  );
}
