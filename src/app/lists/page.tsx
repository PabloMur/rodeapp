"use client";
import ListForm from "@/components/forms/CreateList";
import Loader from "@/components/ui/Loader";

export default function Lists() {
  return (
    <div className="min-h-[88vh] bg-black p-4 relative">
      <Loader />
      <ListForm />
    </div>
  );
}
