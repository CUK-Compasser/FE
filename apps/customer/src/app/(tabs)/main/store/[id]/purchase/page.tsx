import { notFound } from "next/navigation";
import PurchaseContent from "./_components/PurchaseContent";
import { storeModule } from "@/shared/api/api";

interface PurchasePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    menuId?: string;
  }>;
}

export default async function PurchasePage({
  params,
  searchParams,
}: PurchasePageProps) {
  const { id } = await params;
  const { menuId } = await searchParams;

  const storeId = Number(id);
  const selectedMenuId = Number(menuId);

  if (!Number.isFinite(storeId) || !Number.isFinite(selectedMenuId)) {
    notFound();
  }

  const response = await storeModule.requests.getStoreDetail(storeId);
  const store = response.data;

  if (!store) {
    notFound();
  }

  const menu = store.randomBoxes.find(
    (item) => item.boxId === selectedMenuId,
  );

  if (!menu) {
    notFound();
  }

  return <PurchaseContent store={store} menu={menu} />;
}