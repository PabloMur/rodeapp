"use client";
import { menuAtom } from "@/atoms";
import { useRecoilValue } from "recoil";
import { ReactNode } from "react";

export default function MenuDesplegable({ children }: { children: ReactNode }) {
  const isOpen = useRecoilValue(menuAtom);
  if (!isOpen) return null;
  return (
    <menu className="absolute top-[12vh] left-0 w-full h-[88vh] bg-orange-500 z-30 overflow-y-auto">
      <ul className="flex flex-col items-start justify-start pt-4 gap-1 w-full px-4 pb-8">
        {children}
      </ul>
    </menu>
  );
}
