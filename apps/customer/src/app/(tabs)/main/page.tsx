import MainPageClient from "./_components/MainPageClient";

interface MainPageProps {
  searchParams?: Promise<{
    view?: string;
  }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const resolvedSearchParams = await searchParams;
  const view = resolvedSearchParams?.view === "map" ? "map" : "list";

  return <MainPageClient view={view} />;
}