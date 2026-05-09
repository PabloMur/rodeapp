"use client";
import { useCreateList } from "@/hooks";
import { useSession } from "next-auth/react";
import { useState, KeyboardEvent } from "react";
import { Input, Button } from "@/components/ui";

export default function ListForm() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [itemList, setItemList] = useState<string[]>([]);
  const listCreator = useCreateList();

  const handleAddItem = () => {
    if (itemInput.trim()) {
      setItemList([...itemList, itemInput.trim()]);
      setItemInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    setItemList(itemList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await listCreator({
      name,
      category,
      items: itemList,
      creatorEmail: session?.user?.email,
    });
    setName("");
    setCategory("");
    setItemInput("");
    setItemList([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Crear nueva lista</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nombre de la lista"
          placeholder="Ej: Equipo para Córdoba"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Categoría"
          placeholder="Ej: Equipamiento, Documentos..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-300">Items</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Agregar item y presionar Enter"
              className="flex-1 bg-zinc-800 border border-zinc-600 rounded-xl px-3 py-2 text-white
                placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <Button type="button" onClick={handleAddItem} size="md">
              +
            </Button>
          </div>

          {itemList.length > 0 && (
            <ul className="flex flex-col gap-1 mt-1">
              {itemList.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-zinc-800 border border-zinc-700
                    px-3 py-2 rounded-xl text-white text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-zinc-500 hover:text-red-400 transition-colors ml-3 text-lg leading-none"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button type="submit" fullWidth size="lg" disabled={!name || itemList.length === 0}>
          Crear lista
        </Button>
      </form>
    </div>
  );
}
