"use client";
import { deleteListModal } from "@/atoms";
import { useDeleteList } from "@/hooks";
import { useRecoilState } from "recoil";
import { Modal, Button } from "@/components/ui";

export default function DeleteListModal() {
  const [isOpen, setIsOpen] = useRecoilState(deleteListModal);
  const deleteList = useDeleteList();

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Eliminar lista">
      <p className="text-zinc-400 text-sm mb-6">
        Esta acción es irreversible. ¿Confirmás que querés eliminar esta lista?
      </p>
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button variant="danger" fullWidth onClick={deleteList}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
