import { notFound } from "next/navigation";
import StoreDetailContent from "../_components/StoreDetailContent";

interface StoreDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  const { id } = await params;
  const storeId = Number(id);

  if (Number.isNaN(storeId)) {
    notFound();
  }

  return <StoreDetailContent storeId={storeId} />;
}