"use client";
import { useActiveTrip } from "@/hooks";
import { useRecoilValue } from "recoil";
import { lastCompletedTripAtom } from "@/atoms";
import NoTripView from "@/components/home/NoTripView";
import ActiveTripView from "@/components/home/ActiveTripView";
import PostTripView from "@/components/home/PostTripView";

export default function MainPanel() {
  const { activeTrip, loading } = useActiveTrip();
  const lastCompletedTrip = useRecoilValue(lastCompletedTripAtom);

  if (loading) {
    return (
      <div className="flex flex-col min-h-[88vh] w-full p-4 gap-4 bg-black">
        <div className="h-16 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="h-20 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="h-48 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 bg-zinc-900 rounded-2xl animate-pulse" />
          <div className="h-24 bg-zinc-900 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (activeTrip) return <ActiveTripView trip={activeTrip} />;
  if (lastCompletedTrip) return <PostTripView />;
  return <NoTripView />;
}
