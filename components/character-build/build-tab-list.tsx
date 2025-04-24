import { useAtomValue } from "jotai";

import { buildAtom } from "@/atoms/build-atom";
import isStageEnabled from "@/lib/build-state-machine";

import { TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  itemList: {
    label: string;
    value: string;
  }[];
};

export default function BuildTabList({ itemList }: Readonly<Props>) {
  const build = useAtomValue(buildAtom);

  return (
    <TabsList className="grid w-full grid-cols-5 overflow-x-auto">
      {itemList.map((item) => (
        <TabsTrigger
          key={item.value}
          value={item.value}
          disabled={!isStageEnabled(item.value, build)}
        >
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
