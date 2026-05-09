"use client";
import { deleteListModal } from "@/atoms";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui";

export default function DeleteListBtn() {
  const [, setModal] = useRecoilState(deleteListModal);
  return (
    <div className="flex justify-end">
      <Button variant="danger" size="sm" onClick={() => setModal(true)}>
        Eliminar lista
      </Button>
    </div>
  );
}
