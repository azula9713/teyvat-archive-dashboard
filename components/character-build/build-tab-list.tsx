import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  itemList: {
    label: string;
    value: string;
  }[];
};

export default function BuildTabList({ itemList }: Readonly<Props>) {
  return (
    <TabsList className="grid w-full grid-cols-5 overflow-x-auto">
      {itemList.map((item) => (
        <TabsTrigger key={item.value} value={item.value}>
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
