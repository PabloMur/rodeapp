"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FileText } from "lucide-react";
import axios from "axios";
import { PageHeader, EmptyState, Button, Modal, Input, Select, Badge, Card } from "@/components/ui";

interface NoteData {
  id: string;
  title: string;
  content: string;
  category: string;
  ownerEmail: string;
  createdAt: number;
}

const categoryOptions = [
  { value: "general", label: "General" },
  { value: "planificacion", label: "Planificación" },
  { value: "en-ruta", label: "En ruta" },
  { value: "recordatorio", label: "Recordatorio" },
];

const categoryBadge: Record<string, "neutral" | "info" | "warning" | "orange"> = {
  general: "neutral",
  planificacion: "info",
  "en-ruta": "warning",
  recordatorio: "orange",
};

const emptyForm = { title: "", content: "", category: "general" };

export default function Notes() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const email = session?.user?.email || "";

  async function fetchNotes() {
    if (!email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`/api/note?email=${email}`);
      setNotes(res.data.notes || []);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [email]);

  async function handleAdd() {
    if (!form.title || !form.content) return;
    setSaving(true);
    try {
      await axios.post("/api/note", { ...form, ownerEmail: email });
      setModalOpen(false);
      setForm(emptyForm);
      fetchNotes();
    } catch {
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/api/note/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {}
  }

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-4">
      <PageHeader
        title="Notas de viaje"
        subtitle="Planificá y registrá tus aventuras"
        action={<Button onClick={() => setModalOpen(true)}>+ Nueva nota</Button>}
      />

      {!loading && notes.length === 0 ? (
        <EmptyState
          icon={<FileText size={56} />}
          title="Sin notas"
          description="Creá notas para planificar tus viajes, recordatorios de equipamiento o comentarios de ruta."
          action={<Button onClick={() => setModalOpen(true)}>Crear primera nota</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <Card key={note.id} variant="bordered">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{note.title}</h3>
                <Badge
                  status={categoryBadge[note.category] ?? "neutral"}
                  label={
                    categoryOptions.find((c) => c.value === note.category)?.label ??
                    note.category
                  }
                />
              </div>
              <p className="text-zinc-400 text-sm whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-zinc-600">
                  {new Date(note.createdAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Button variant="danger" size="sm" onClick={() => handleDelete(note.id)}>
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nueva nota">
        <div className="flex flex-col gap-3">
          <Input
            label="Título"
            placeholder="Ej: Lista de equipo para Córdoba"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Select
            label="Categoría"
            options={categoryOptions}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-300">Contenido</label>
            <textarea
              className="bg-zinc-800 border border-zinc-600 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors min-h-[100px] resize-none"
              placeholder="Escribí tu nota aquí..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setModalOpen(false);
                setForm(emptyForm);
              }}
            >
              Cancelar
            </Button>
            <Button
              fullWidth
              onClick={handleAdd}
              disabled={saving || !form.title || !form.content}
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
