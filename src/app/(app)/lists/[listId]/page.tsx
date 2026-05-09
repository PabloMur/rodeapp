"use client";
import DeleteListBtn from "@/components/ui/Buttons/DeleteListBtn";
import DeleteListModal from "@/components/modals/DeleteListModal";
import Loader from "@/components/ui/Loader";
import UpdateListForm from "@/components/forms/UpdateList";
import { useGetListData } from "@/hooks";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui";

export default function ListDetailsPage() {
  const [listData, setListData] = useState<any>(null);
  const listDataGetter = useGetListData();

  useEffect(() => {
    listDataGetter()
      .then((result) => setListData(result))
      .catch(() => {});
  }, []);

  const name = listData?.data?.listData?.name;
  const category = listData?.data?.listData?.category;

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-4 relative">
      <DeleteListModal />
      <Loader />

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">{name ?? "Cargando..."}</h1>
          {category && <Badge status="orange" label={category} className="mt-1" />}
        </div>
        <DeleteListBtn />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <UpdateListForm />
      </div>
    </div>
  );
}
