"use client";

import { useSearchParams } from "next/navigation";
import MainListView from "./_components/MainListView";
import MainMapView from "./_components/MainMapView";
import MainViewToggle from "./_components/MainViewToggle";

export default function MainPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "map" ? "map" : "list";

  return (
    <main className="relative min-h-screen bg-white">
      {view === "list" ? <MainListView /> : <MainMapView />}
      <MainViewToggle view={view} />
    </main>
  );
}