"use client";

import MainListView from "./MainListView";
import MainMapView from "./MainMapView";
import MainViewToggle from "./MainViewToggle";

interface MainPageClientProps {
  view: "list" | "map";
}

export default function MainPageClient({
  view,
}: MainPageClientProps) {
  return (
    <main className="relative min-h-screen bg-white">
      {view === "list" ? <MainListView /> : <MainMapView />}
      <MainViewToggle view={view} />
    </main>
  );
}