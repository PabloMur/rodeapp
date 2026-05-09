import dynamic from "next/dynamic";

const MapboxNavigation = dynamic(() => import("@/components/MapComp"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 animate-pulse rounded-2xl" />
  ),
});

export default function Navigation() {
  return (
    <div className="min-h-[88vh] bg-black flex flex-col justify-center items-center p-4 gap-4">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Navegación</h1>
          <p className="text-zinc-400 text-sm">GPS en tiempo real</p>
        </div>
      </div>
      <div className="w-full rounded-2xl overflow-hidden border border-zinc-700" style={{ height: "75vh" }}>
        <MapboxNavigation />
      </div>
    </div>
  );
}
