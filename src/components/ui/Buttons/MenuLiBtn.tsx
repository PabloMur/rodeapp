"use client";
import { useMenuLi } from "@/hooks";

export default function MenuLiBtn({ route, content }: { route: string; content: string }) {
  const menuLiHook = useMenuLi();
  return (
    <button
      className="w-full text-left text-black font-semibold py-3 px-4 rounded-xl hover:bg-black/10 active:bg-black/20 transition-colors text-base"
      onClick={() => menuLiHook(route)}
    >
      {content}
    </button>
  );
}
