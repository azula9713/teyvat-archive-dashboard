import { useAtom } from "jotai";
import { Minus, Plus } from "lucide-react";

import { artifactNotesAtom, artifactsAtom } from "@/atoms/build-atom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useArtifactData } from "@/hooks/use-server-data";
import { ICharacterBuildInput } from "@/types/build";

import ArtifactSection from "./artifact-section";

type Props = {
  buildArtifacts: ICharacterBuildInput["artifacts"];
};

export default function ArtifactTab({ buildArtifacts }: Readonly<Props>) {
  const { artifactSets, error, isLoading } = useArtifactData();
  const [, setArtifacts] = useAtom(artifactsAtom);
  const [artifactNotes, setArtifactNotes] = useAtom(artifactNotesAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("buildArtifacts", buildArtifacts);

  return (
    <TabsContent value="artifacts" className="mt-6 space-y-4">
      <Card className="p-6">
        <div className="space-y-6">
          {buildArtifacts.map((artifact, index) => (
            <div
              key={`${artifact.artifactSets[0].setId}-${artifact.rank}`}
              className="space-y-4 border-b pb-4 last:border-0"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Artifact Set {index + 1}
                </h3>
                {buildArtifacts.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setArtifacts(
                        buildArtifacts.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <Minus className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>

              <ArtifactSection index={index} artifactSets={artifactSets} />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setArtifacts([
                ...buildArtifacts,
                {
                  rank: buildArtifacts.length + 1,
                  artifactSets: [
                    { setId: "", piecesCount: 2 },
                    { setId: "", piecesCount: 2 }
                  ]
                }
              ]);
            }}
            disabled={
              buildArtifacts.length > 0 &&
              ((buildArtifacts[buildArtifacts.length - 1].artifactSets[0]
                .setId === "" &&
                buildArtifacts[buildArtifacts.length - 1].artifactSets[0]
                  .piecesCount === 4) ||
                (buildArtifacts[buildArtifacts.length - 1].artifactSets[0]
                  .piecesCount === 2 &&
                  buildArtifacts[buildArtifacts.length - 1].artifactSets[1]
                    ?.setId === ""))
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add another artifact set
          </Button>
        </div>

        <div className="mt-4 space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any notes about the artifacts..."
            value={artifactNotes}
            onChange={(e) => setArtifactNotes(e.target.value)}
            rows={4}
          />
        </div>
      </Card>
    </TabsContent>
  );
}
