"use client";
import { useMiniList } from "@/hooks";

export default function MiniList({ title, id }: { title: string; id: string }) {
  const miniListHook = useMiniList();
  return (
    <div
      onClick={() => miniListHook(id, `/lists/${id}`)}
      className="w-full bg-zinc-900 border border-zinc-700 hover:border-orange-500 rounded-xl
        px-4 py-4 flex justify-between items-center cursor-pointer active:scale-[0.98]
        transition-all group"
    >
      <span className="text-white font-semibold group-hover:text-orange-500 transition-colors">
        {title}
      </span>
      <span className="text-zinc-600 group-hover:text-orange-500 transition-colors text-lg">
        →
      </span>
    </div>
  );
}
