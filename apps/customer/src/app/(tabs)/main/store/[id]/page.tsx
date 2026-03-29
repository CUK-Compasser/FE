import { notFound } from "next/navigation";
import StoreDetailContent from "../_components/StoreDetailContent";
import { MOCK_MAIN_STORE_DETAIL_MAP } from "../_constants/mockStoreDetail";

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
  const store = MOCK_MAIN_STORE_DETAIL_MAP[storeId];

  if (!store) {
    notFound();
  }

  return <StoreDetailContent store={store} />;
}