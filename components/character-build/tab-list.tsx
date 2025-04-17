import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  itemList: string[];
};

export default function BuildTabList({ itemList }: Readonly<Props>) {
  return (
    <TabsList className="grid w-full grid-cols-5">
      {itemList.map((item) => (
        <TabsTrigger key={item} value={item}>
          {item}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
