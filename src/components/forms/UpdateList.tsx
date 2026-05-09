"use client";
import React, { useEffect, useState } from "react";
import ListItem from "../ui/ListItem";
import { useGetListData, useGetUpdateListItems } from "@/hooks";
import { Button } from "@/components/ui";

export default function UpdateListForm() {
  const getListItems = useGetListData();
  const [items, setItems] = useState<{ name: string; status: string }[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const updateList = useGetUpdateListItems();

  useEffect(() => {
    const getItems = async () => {
      const itemList = await getListItems();
      setItems(itemList.data.listData.items);
    };
    getItems();
  }, []);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index.toString()]: event.target.checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedItems = Object.keys(checkedItems)
      .filter((key) => checkedItems[key])
      .map(Number);
    await updateList(selectedItems);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {items.map((item, index) => (
        <ListItem
          key={index}
          index={index.toString()}
          name={item.name}
          status={item.status}
          checked={checkedItems[index.toString()] ?? false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleCheckboxChange(e, index)
          }
        />
      ))}
      {items.length > 0 && (
        <Button type="submit" fullWidth size="lg" className="mt-2">
          Guardar cambios
        </Button>
      )}
    </form>
  );
}
