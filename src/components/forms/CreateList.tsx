"use client";
import { useCreateList } from "@/hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";
//Hacer que el boton de submit sea un componente de ui

export default function ListForm() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);
  const listCreator = useCreateList();

  const handleAddItem = () => {
    console.log(itemList);
    if (items.trim() !== "") {
      setItemList([...itemList, items.trim()]);
      setItems("");
    }
  };

  const handleRemoveItem = (index: any) => {
    const newItems = [...itemList];
    newItems.splice(index, 1);
    setItemList(newItems);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await listCreator({
      name,
      category,
      items: itemList,
      creatorEmail: session?.user?.email,
    });
    setName("");
    setCategory("");
    setItems("");
    setItemList([]);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 shadow-md text-orange-500 border-2 border-orange-500 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Crear Nueva Lista</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-orange-500"
          >
            Nombre de la Lista
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border-2 rounded-md bg-black border-orange-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-orange-500"
          >
            Categoría
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border-2 bg-black border-orange-500 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="items"
            className="block text-sm font-medium text-orange-500"
          >
            Items
          </label>
          <div className="flex">
            <input
              type="text"
              id="items"
              name="items"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              className="mt-1 p-2 w-full rounded-l-md border-2 bg-black border-orange-500"
            />
            <button
              type="button"
              className="bg-orange-500 text-black px-4 py-2 rounded-r-md"
              onClick={handleAddItem}
            >
              Agregar
            </button>
          </div>
          <ul className="list-disc mt-2 ml-4">
            {itemList.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-black px-4 py-2 rounded-md"
        >
          Crear Lista
        </button>
      </form>
    </div>
  );
}
